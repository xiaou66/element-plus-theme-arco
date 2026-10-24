# DatePicker

<p class="page-desc">Matches Arco DatePicker and RangePicker with filled inputs and right-hand calendar icons. See the <a href="https://element-plus.org/en-US/component/date-picker.html" target="_blank" rel="noreferrer">Element Plus docs</a> for props.</p>

## Basics & Sizes

The size prop provides three sizes; click an input to open the default English date panel.

<ClientOnly>

::: demo date-picker/basic
:::

</ClientOnly>

## Date Range

Daterange matches Arco RangePicker and lets users choose start and end dates.

<ClientOnly>

::: demo date-picker/range
:::

</ClientOnly>

## Months, Years & Datetime

Month, year and datetime select different time units while keeping Element Plus panel structures.

<ClientOnly>

::: demo date-picker/types
:::

</ClientOnly>

## Inline Panel

ElDatePickerPanel allows selecting a date directly within the page.

<ClientOnly>

::: demo date-picker/panel
:::

</ClientOnly>

## Differences from Arco

- Plain date panels omit Arco's Today footer; header formatting follows Element Plus locale text.
- Month and year panels use four columns and show 10 years, unlike Arco's three columns and 12 years.
- Datetime panels retain Element Plus's stacked layout rather than Arco's side-by-side layout.
