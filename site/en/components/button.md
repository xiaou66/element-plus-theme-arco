# Button

<p class="page-desc">Maps to Arco Button: the default button is Arco's secondary (gray fill, no border), <code>plain</code> maps to outline, <code>dashed</code> to dashed and <code>text</code> to text. See the <a href="https://element-plus.org/en-US/component/button.html" target="_blank" rel="noreferrer">Element Plus docs</a> for props.</p>

## Types

The default button is the gray secondary; `plain` is outlined, `dashed` uses a dashed border, `text` and `link` are text buttons.

::: demo button/basic
:::

## Status Colors

`success` / `warning` / `danger` map to Arco statuses. Arco has no info status, so `info` uses neutral gray.

::: demo button/status
:::

## Sizes & States

`small` / default / `large` map to Arco small / medium / large (28 / 32 / 36px); icons, round, loading and disabled.

::: demo button/size
:::

## Button Group

Solid buttons sit side by side with a divider on the right border; outlined buttons overlap by 1px; only the two ends are rounded.

::: demo button/group
:::

## Differences from Arco

- Different icon set: the loading icon and others come from Element Plus.
- A loading button has the `disabled` attribute and cannot receive focus (Element Plus behavior).
- Arco has no vertical button group, so `direction="vertical"` keeps the Element Plus look.
