# Dark Mode

Dark mode follows the Element Plus `html.dark` convention. Load the appropriate styles before toggling the class on the root element.

## Full Import

Import both the main theme and dark styles in your application entry.

```ts
import 'element-plus-theme-arco'
import 'element-plus-theme-arco/dark'
```

## On-demand Import

With `arcoTheme()` configured as shown in [Quick Start](./quick-start#on-demand-import), import the Element Plus dark entry. The plugin redirects it to the theme mirror.

```ts
import 'element-plus/theme-chalk/dark/css-vars.css'
```

Keep component styles managed by the resolver; an additional full-theme import is unnecessary.

## Switching Appearance

Toggle the dark class in a switch event handler. The isDark value represents your application's current appearance.

```ts
function updateAppearance(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark)
}
```

For server-rendered applications, access document after mounting or in browser events. Both Element Plus variables and the theme's Arco variables follow html.dark.

## Composited Colors & Limits

Arco dark colors use translucent fills and text. The theme follows Element Plus by compositing most of them over the container background `#232324`, producing opaque colors. Some component internals retain translucent colors to match their layered appearance.

Components placed directly on the darker page background `#17171a` can therefore look slightly brighter than Arco. Use `var(--color-bg-2)` for a business container matching the default composition background; see [Theming](./theming).
