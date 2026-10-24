# 构建产物与 theme-chalk 镜像

> `pnpm build` 产出两类东西：全量 CSS，以及与 `element-plus/theme-chalk` 同名同结构的镜像目录。
> 关键文件：
>
> - 构建脚本 `../../../packages/theme-arco/scripts/build.mjs`
> - Arco 变量生成 `../../../packages/theme-arco/scripts/gen-arco-vars.mjs`
> - 包导出 `../../../packages/theme-arco/package.json`

---

## 1. 产物

| 产物 | 内容 | 用途 |
| --- | --- | --- |
| `dist/index.css` | EP 全部样式（Arco token）+ 全部组件覆盖 + Arco 兼容变量 | 全量引入：`import 'element-plus-theme-arco'` |
| `dist/dark.css` | EP 暗色变量（Arco 暗色 token）+ 暗色修正 + Arco 暗色变量 | 全量引入暗色：`import 'element-plus-theme-arco/dark'` |
| `dist/theme-chalk/*.css` | 121 个文件，与 EP 的 `theme-chalk/` 一一对应，外加 `dark/css-vars.css` | 按需引入时由 Vite 插件重定向到这里 |
| `dist/meta.json` | 镜像基于的 element-plus 版本 | Vite 插件做版本检查 |

## 2. 构建步骤

1. `gen-arco-vars.mjs`：从 Arco 的 `arco.css` 提取全局变量，生成 `src/generated/_arco-vars*.scss`（见 [Arco 兼容变量](./05-arco-vars.md)）。
2. `build.mjs`：遍历 EP 的 `theme-chalk/src/*.scss`，为每个文件拼一段入口：

   ```scss
   @use '<theme>/src/common/var.scss' as *;            // Arco token
   @use 'element-plus/theme-chalk/src/button.scss' as ep; // EP 原样式
   @use '<theme>/src/components/_button.scss' as arco;    // 同名覆盖（如果存在）
   ```

   编译结果写成 EP 的文件名：`button.scss` → `el-button.css`；`base`、`index`、`display` 保持原名。`index` 直接编译 `src/index.scss`。
3. 编译 `src/dark/css-vars.scss` 写入 `theme-chalk/dark/css-vars.css`，再复制出 `dist/index.css` 和 `dist/dark.css`。
4. 写 `meta.json`，然后对照 EP 的 `theme-chalk/*.css` 清单检查镜像是否缺文件，缺了就失败。

### 为什么覆盖要拼进同名文件

覆盖和 EP 原样式在同一个文件里，覆盖一定排在后面，同优先级的规则稳定胜出。如果覆盖是单独的文件，在按需引入时它和 EP 样式的先后顺序取决于模块导入顺序，不可靠，见 [按需引入](./03-on-demand.md)。

这也是覆盖文件必须和 EP 源文件同名的原因（`_button.scss` ↔ `button.scss`）：构建脚本只按名字查找。

### 为什么串行编译

最初用 `Promise.all` 并发调用 `sass.compileStringAsync`，原型阶段 121 个文件要 18 秒，正式版直接卡死（运行 8 分钟、CPU 20%、内存 1.1GB，没有任何输出）。改成串行的同步 `compileString` 后，全部文件约 7 秒。纯 JS 版的 Sass 在大量异步编译并发时表现很差，同步串行反而最快。

## 3. 与 EP 版本的耦合

镜像是按构建时安装的 EP 版本编译的。`peerDependencies` 把 EP 锁在 `~2.14.0`。EP 升级后：

- 新增了样式文件：构建脚本的清单检查会直接失败，提醒重新构建；已经发布的旧镜像在使用方那里会回落到 EP 原版并警告（见 [按需引入](./03-on-demand.md)）。
- 组件 SCSS 结构变化：需要重新跑四种组合的对比回归。
