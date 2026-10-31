# Select

<p class="page-desc">Matches Arco Select with a filled control and light bordered tags for multiple selection. See the <a href="https://element-plus.org/en-US/component/select.html" target="_blank" rel="noreferrer">Element Plus docs</a> for props.</p>

## Basics & Sizes

Use size for three control sizes and click a control to open its list.

::: demo select/basic client-only
:::

## Multiple

Multiple selection displays Arco-style tags; clearable allows clearing the selection.

::: demo select/multiple client-only
:::

## Groups & Disabled Options

Option groups organize choices; disabling the arrow brings the panel closer to Arco.

::: demo select/groups client-only
:::

## Tag Variants

Arco has no tag-type or tag-effect equivalent; these follow the theme's Tag variants.

::: demo select/tag-props client-only
:::

## Differences from Arco

- Options are inset 4px from the panel and have rounded rows; Arco uses full-width rows. Set `--arco-option-inset: 0` on the root element to match Arco, or any other pixel value.
- Selected-value color and current-option highlighting follow Element Plus when open.
- Multiple options use right-hand checkmarks rather than Arco's left-hand checkboxes.
- The default arrow, tag-type and tag-effect retain Element Plus behavior.
