# Theming

The theme provides two independent sets of CSS custom properties: Element Plus components read `--el-*`, while application styles can use Arco's original variable names. Updating one set does not synchronize the other.

## Using Arco Color Variables

Both full and on-demand imports include Arco variables through base.css. No extra import is needed. Semantic text, background, border and status variables follow light and dark appearances.

```css
.project-card {
  color: var(--color-text-2);
  background: var(--color-bg-2);
  border: 1px solid var(--color-border-2);
}

.project-status {
  color: rgb(var(--primary-6));
  background: var(--color-primary-light-1);
}

.project-label {
  color: rgb(var(--purple-6));
  background: rgb(var(--purple-1));
}
```

Palette values such as `--primary-6` and `--purple-1` contain RGB channel triplets and must be wrapped in `rgb()`. Semantic variables such as `--color-text-2` are complete colors and can be used directly.

## Choosing Variables

- Prefer `--color-text-*`, `--color-bg-*` and `--color-border-*` for semantic text, background and border colors that adapt to dark mode.
- Use status variables such as `--color-primary-light-1` for status surfaces.
- Use extended palettes such as `--purple-1` through `--purple-10` when a specific hue is needed.

See [Design Tokens](./token) and [Global Variables](./variables) for names, current values and sources.

## Element Plus Variable Boundaries

Element Plus components read only `--el-*`. Changing `--el-color-primary` at runtime does not update `--primary-6`, and changing Arco variables does not rebuild the Element Plus color ladder.

Changing only the base primary value does not recalculate hover, tint or disabled shades. Define the relevant shades together when overriding these states.

Use component props for specific requirements. For Arco's default shadowless cards and links without underlines, use the native global configuration:

```vue
<template>
  <el-config-provider :card="{ shadow: 'never' }" :link="{ underline: 'never' }">
    <App />
  </el-config-provider>
</template>
```
