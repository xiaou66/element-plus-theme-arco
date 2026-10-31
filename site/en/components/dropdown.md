# Dropdown

<p class="page-desc">Matches Arco Dropdown with subtle option hover backgrounds and the default Element Plus arrow. See the <a href="https://element-plus.org/en-US/component/dropdown.html" target="_blank" rel="noreferrer">Element Plus docs</a> for props.</p>

## Click Menu

Click to open the menu; disabling its arrow brings the panel closer to Arco.

::: demo dropdown/basic client-only
:::

## Hover & Extended Sizes

Hover-triggered sizes extend the theme using Element Plus increments; divided keeps a separator.

::: demo dropdown/sizes client-only
:::

## Differences from Arco

- Items are inset 4px from the panel and have rounded rows; Arco uses full-width rows. Set `--arco-option-inset: 0` on the root element to match Arco (same as the Select dropdown).
- The default arrow, divided options and sizes have no Arco equivalent and retain their configuration with themed styling.
- Options retain Element Plus keyboard focus behavior.
