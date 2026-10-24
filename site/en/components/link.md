# Link

<p class="page-desc">Maps to Arco Link. The default keeps Element Plus neutral text; <code>type="primary"</code> matches Arco's default link. See the <a href="https://element-plus.org/en-US/component/link.html" target="_blank" rel="noreferrer">Element Plus docs</a> for props.</p>

## Types

Neutral, primary and status links use an Arco-style background on hover.

::: demo link/basic
:::

## Disabled & Icons

Use disabled links for unavailable actions and icon for an Element Plus icon.

::: demo link/disabled
:::

## Underline

Arco has no underline setting; hover, always and never retain their Element Plus behavior.

::: demo link/underline
:::

## Differences from Arco

- The default link is neutral. Use `type="primary"` for Arco's default color.
- `underline` follows Element Plus behavior. Set `link.underline = 'never'` in ConfigProvider to disable it globally.
