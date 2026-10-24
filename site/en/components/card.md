# Card

<p class="page-desc">Shadow="never" matches the default Arco Card; shadow="hover" matches hoverable. See the <a href="https://element-plus.org/en-US/component/card.html" target="_blank" rel="noreferrer">Element Plus docs</a> for props.</p>

## Header & Content

Use shadow="never" for Arco's default outlined card.

::: demo card/basic
:::

## Shadows

Arco has no three-way shadow setting; each value stays distinct. Hover the card to see its shadow.

::: demo card/shadow
:::

## Differences from Arco

- Element Plus defaults to always-visible shadows. Set card.shadow to never in ConfigProvider for Arco's default.
- The footer has no Arco equivalent and extends the header spacing.
