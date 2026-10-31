# Glass Mode

An optional translucent "frosted glass" look layered on top of light and dark. It is switched by the `glass` class on the root element and can be combined with `dark`. Arco has no such style, so there is no Arco counterpart; it follows the design spec only.

## Import

The glass styles are a separate file and must come after the theme and the dark styles.

```ts
import 'element-plus-theme-arco'
import 'element-plus-theme-arco/dark' // when you need dark
import 'element-plus-theme-arco/glass'
```

With on-demand import, import this one file directly as well. Like the dark styles it is a single global file whose rules all live under `html.glass`; it does not go through the component resolver or the `arcoTheme()` plugin.

## Switching

```ts
// light glass: glass; dark glass: dark + glass
document.documentElement.classList.toggle('glass', enabled)
document.documentElement.classList.toggle('dark', isDark)
```

Without the `glass` class nothing changes for any component.

## The Background Is Yours

The theme only paints surfaces, not backgrounds. Glass only shows up on top of a wallpaper, gradient, background image or transparent window; on a plain white page it is just a faint white layer.

## Opacity

`--glass-opacity` (0 to 1, default `0.55`) scales the alpha of every surface; set it on the root element. Tint overlays such as hover, selected and dividers do not follow it.

```css
html {
  --glass-opacity: 0.7;
}
```

## What Changes

| Kind | Components | Look |
| --- | --- | --- |
| Plain surfaces | Card, Menu, Table, Collapse, Descriptions, Alert, Segmented, Tag | Translucent fill with a 1px border, no blur |
| Inputs | Input, Textarea, Select, InputTag, date inputs, unchecked Checkbox and Radio, secondary Button | No border, a more translucent fill, a 1px top highlight, radius 8; focus and error keep a full outline |
| Overlays | Dialog, Drawer, MessageBox, Popover, Dropdown, Select dropdown, DatePicker, Message, Notification, Tour, Tooltip | Overlay surface with `backdrop-filter` blur, border and shadow |

## Limits

- Primary and status colors are still `--el-color-*`; changing the primary color updates the selected state and the focus glow.
- Element Plus props still work: Tooltip `effect="dark"` is dark glass and `effect="light"` is light glass; `round` and `circle` buttons are not affected by the unified radius.
- `backdrop-filter` support is required; without it overlays lose the blur and keep only the translucent fill.
- The arrows of Popover and Tooltip cannot be blurred on their own, so they look slightly darker where they overlap the overlay edge.
- Menu itself is transparent because a sidebar usually already sits in a glass window; put it in a Card or your own glass container when you need a panel.
