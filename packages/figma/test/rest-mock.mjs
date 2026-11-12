// REST 解析逻辑的离线测试：用模拟的 GET /v1/files/:key/nodes 响应，检查 fetchTree 的输出
import assert from 'node:assert/strict'
import { fetchTree, parseFigmaUrl } from '../lib/rest.mjs'
import { generate } from '../lib/runner.mjs'

assert.deepEqual(parseFigmaUrl('https://www.figma.com/design/AbC/Kit?node-id=12-345&t=x'), { fileKey: 'AbC', nodeId: '12:345' })
assert.deepEqual(parseFigmaUrl('https://www.figma.com/design/AbC/branch/BrK/Kit?node-id=1-2'), { fileKey: 'BrK', nodeId: '1:2' })
assert.equal(parseFigmaUrl('https://www.figma.com/design/AbC/Kit').nodeId, null)

const doc = {
  id: '1:1', type: 'FRAME', name: 'Login', children: [
    { id: '1:2', type: 'TEXT', name: 'Title' },
    { id: '1:3', type: 'FRAME', name: 'Form', children: [
      { id: '1:4', type: 'INSTANCE', componentId: 'C_INPUT', componentProperties: {
        'Placeholder#12:0': { type: 'TEXT', value: 'Username' }, 'Text#9:0': { type: 'TEXT', value: '' },
        'Prefix icon#9:13': { type: 'BOOLEAN', value: true }, 'Prefix#9:26': { type: 'INSTANCE_SWAP', value: 'C_ICON_USER' },
        'Suffix icon#9:39': { type: 'BOOLEAN', value: false }, 'Suffix#9:52': { type: 'INSTANCE_SWAP', value: 'C_ICON_CLOSE' },
        'Word limit#9:65': { type: 'BOOLEAN', value: false }, State: { type: 'VARIANT', value: 'Default' }, Value: { type: 'VARIANT', value: 'Placeholder' } },
        children: [{ id: '1:5', type: 'INSTANCE', componentId: 'C_ICON_USER', componentProperties: {} }] },
      { id: '1:6', type: 'INSTANCE', componentId: 'C_BTN', visible: false, componentProperties: {} },
      { id: '1:7', type: 'INSTANCE', componentId: 'C_BTN', componentProperties: {
        'Label#6:0': { type: 'TEXT', value: 'Sign in' }, 'Show icon#6:121': { type: 'BOOLEAN', value: false }, 'Icon#6:242': { type: 'INSTANCE_SWAP', value: 'C_ICON_USER' },
        Type: { type: 'VARIANT', value: 'Primary' }, Style: { type: 'VARIANT', value: 'Solid' }, State: { type: 'VARIANT', value: 'Default' } } },
    ] },
    { id: '1:8', type: 'INSTANCE', componentId: 'C_ICON_CLOSE', componentProperties: {} },
  ],
}
const response = { nodes: { '1:1': { document: doc,
  components: { C_INPUT: { name: 'State=Default, Value=Placeholder', componentSetId: 'S_INPUT' }, C_BTN: { name: 'Type=Primary, Style=Solid, State=Default', componentSetId: 'S_BTN' },
    C_ICON_USER: { name: 'Icon/User' }, C_ICON_CLOSE: { name: 'Icon/Close' } },
  componentSets: { S_INPUT: { name: 'Input' }, S_BTN: { name: 'Button' } } } } }

let called
globalThis.fetch = async (url, opts) => { called = { url, opts }; return { ok: true, json: async () => response } }
const tree = await fetchTree({ fileKey: 'AbC', nodeId: '1:1', token: 'T' })
assert.equal(called.url, 'https://api.figma.com/v1/files/AbC/nodes?ids=1%3A1')
assert.equal(called.opts.headers['X-Figma-Token'], 'T')
assert.deepEqual(tree, { n: 'Login', k: [
  { n: 'Form', k: [
    { c: 'Input', p: { Placeholder: 'Username', Text: '', 'Prefix icon': true, Prefix: '@Icon/User', 'Suffix icon': false, Suffix: '@Icon/Close', 'Word limit': false, State: 'Default', Value: 'Placeholder' } },
    { c: 'Button', p: { Label: 'Sign in', 'Show icon': false, Icon: '@Icon/User', Type: 'Primary', Style: 'Solid', State: 'Default' } },
  ] },
  { c: 'Icon/Close', p: {} },
] })
const { text } = generate(tree)
assert.match(text, /<el-input v-model="input" placeholder="Username" :prefix-icon="User" \/>/)
assert.match(text, /<el-button type="primary">Sign in<\/el-button>/)
assert.match(text, /<el-icon><Close \/><\/el-icon>/)
assert.match(text, /import \{ User, Close \} from '@element-plus\/icons-vue'/)

globalThis.fetch = async () => ({ ok: false, status: 403, text: async () => 'Invalid token' })
await assert.rejects(fetchTree({ fileKey: 'AbC', nodeId: '1:1', token: 'bad' }), /403.*令牌无效/)
console.log('REST 解析测试通过')
console.log(text)
