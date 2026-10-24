# Table

<p class="page-desc">The default matches Arco's borderless table; border matches cell-bordered tables. See the <a href="https://element-plus.org/en-US/component/table.html" target="_blank" rel="noreferrer">Element Plus docs</a> for props.</p>

## Basics & Borders

Toggle borders, headers and fit; clicking a row shows the Element Plus current-row highlight with no Arco equivalent.

::: demo table/basic
:::

## Stripes, Sizes & Summary

Change size to compare density; stripes and summaries match their Arco use cases.

::: demo table/variants
:::

## Sort, Filter & Select

Sort using headers, filter cities with the filter control and select rows with checkboxes.

::: demo table/sort-filter
:::

## Fixed Columns & Grouped Headers

Scroll horizontally to see fixed columns; grouped headers retain Element Plus borders.

::: demo table/fixed
:::

## Differences from Arco

- Filter and expand icons use Element Plus icons; empty data shows text by default, and the empty slot can render ElEmpty.
- Selection and expand columns default to 48px; set width to 40 to match Arco.
- Grouped headers keep Element Plus borders; sorted-column tint supports flat headers without merged cells.
- Highlight-current-row, cell-style, row-class-name, show-header, fit and show-overflow-tooltip retain Element Plus behavior without exact Arco equivalents.
- The large size extends the theme using Element Plus size increments.
