# Tooltip / Popover / Popconfirm（弹出层）

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_popper.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_popover.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_popconfirm.scss`
> - 暗色修正 `../../../packages/theme-arco/src/dark/_popper.scss`
> - 对照用例 `../../../playground/src/demos/PopoverDemo.vue`（`#popover`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| Tooltip（`effect="dark"`，默认） | Tooltip：tooltip-bg 底（亮色 gray-10、暗色 bg-5）、白字、无边框、8px 12px |
| `effect="light"` 的弹出层 | Popover 外壳：bg-popup、border-2 描边 |
| Popover | Popover：12px 16px、text-2；标题 16px / 500，与内容 4px |
| Popconfirm | Popconfirm：16px 内边距；图标 18px、距文字 8px；按钮 mini（24px）、间距 8px |
| Popconfirm 默认图标（#f90 问号） | 默认 `type="info"`：主色图标 |
| Popconfirm 取消按钮（`cancel-button-type` 默认 `"text"`） | 保留 EP 的文字按钮（与用户确认：CSS 区分不了默认值和显式传 `"text"`） |

## 2. 关键实现

- 箭头：8px 方块旋转 45°，中心落在边缘上（EP 是 10px、外移 5px）。
- 距离：Arco 带箭头的弹出层距触发元素 10px，EP 是 12px（JS 写在行内定位里），按 `data-popper-placement` 用外边距往回挪 2px。
- Popover 去掉 EP 的 150px 最小宽度；EP 的默认宽度 150px 写在行内样式上，需要一致时传 `width="auto"`。
- Popconfirm 图标的默认色 `#f90` 是行内样式，用 `[style*='rgb(255, 153, 0)']` 只匹配默认值，传了 `icon-color` 时不受影响。
- 对照用例里弹出层常开、渲染在 wrapper 内（EP `:teleported="false"`，Arco `popup-container`），对比脚本才测得到。

## 3. 已知差异

- Popconfirm 默认图标是问号（EP）/ 信息（Arco）。
- Popconfirm 的取消按钮保留 EP 的文字按钮，Arco 是灰底按钮（需要时传 `cancel-button-type="default"`）。
