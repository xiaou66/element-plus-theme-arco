# Figma

The theme comes with a Figma component library, "Arco for Element Plus · UI Kit". Its components, variants and design variables match this theme one to one, and its variables cover four modes: light, dark and the two glass modes. Designs built with this library can be turned into Element Plus code with `element-plus-theme-arco-figma`, which works best when an AI assistant runs it for you.

```vue
<!-- A Button in the design (Type=Primary, Style=Plain, State=Disabled, icon Search) becomes: -->
<el-button type="primary" plain disabled :icon="Search">Submit</el-button>
```

Only component instances dragged from the library are recognized. Shapes and plain text you draw yourself still have to be implemented by looking at the design.

## The component library

The library is free on Figma Community: [Arco for Element Plus · UI Kit](https://www.figma.com/community/file/1702742375809666570). Click Open in Figma to copy it into your drafts or team. To share it across design files, publish your copy as a library (Assets → Publish), then enable it in each design file under Assets → Libraries.

| Page | Contents |
| --- | --- |
| Getting Started | How to use the library, a live preview of the same components in all four theme modes, and a comparison of the three sizes |
| Colors, Typography & Effects | The value of every theme variable in all four modes; text styles, shadow and glass effect styles, radii and spacing |
| Icons | Element Plus icons, swapped into components through an icon property |
| Basic, Form, Data Display, Navigation, Feedback, Others | Components grouped as in the Element Plus docs, each with a note on its Element Plus usage |

### Themes and sizes

Component colors and sizes are bound to variables. Switch the variable mode of any frame in Figma's right panel:

| Collection | Modes | In code |
| --- | --- | --- |
| Theme | Light, Dark, Glass Light, Glass Dark | default, `html.dark`, `html.glass`, `html.dark.glass` |
| Control Size | Default, Small, Large | the component's `size`, or the global `size` on `el-config-provider` |

- Glass colors are translucent and only show up on a wallpaper, gradient or image background. Add the `Glass/Overlay` effect style (background blur plus shadow) to overlays such as Dialog, Popover and Dropdown, because Figma effects cannot change with a variable mode.
- Like in Arco, Dialog, Drawer and MessageBox have no shadow; the mask sets them apart from the page.

### Handoff

In Dev Mode, colors and radii show up as the theme's CSS variable names (such as `var(--el-color-primary)`), and every component's description names the matching Element Plus component and props. To get code, generate it with the tool below.

## From design to code: setup

There are two ways to read a design. Pick either one:

| Method | Requires | Notes |
| --- | --- | --- |
| Figma token | A Figma personal access token | One command prints the code, and only the final code enters the AI's context. Recommended |
| Figma MCP | The AI tool is connected to the Figma MCP server | No token needed. The exported data passes through the AI's context, which costs more for large designs |

Neither method needs a Figma Organization plan.

### Create a Figma token

1. Figma → Settings → Security → Personal access tokens → Generate new token, with **File content: Read only**. Every plan can create one.
2. Save it to a file only you can read (or set the `FIGMA_ACCESS_TOKEN` environment variable):

```bash
(umask 077; printf '%s' 'figd_xxx' > ~/.figma-token)
```

Each conversion sends a single request. The limit depends on your seat in the team that owns the design: Full and Dev seats get 10 to 20 requests per minute; View and Collab seats get about 20 per month, so use Figma MCP if that runs out.

## Claude Code

Install the plugin once and it works in every project:

```
/plugin marketplace add xiaou66/element-plus-theme-arco
/plugin install element-plus-theme-arco@element-plus-theme-arco
```

Then just give the AI a design link:

```
Implement the sign-in page from this design: https://www.figma.com/design/xxx/yyy?node-id=12-345
```

The plugin's skill only loads when a Figma link comes up. The AI tries the token first and falls back to Figma MCP when there is none. After generating the component code, it fills in the layout and data bindings by looking at a screenshot of the design.

The link must include `node-id`: select the frame in Figma, then right-click → Copy link to selection.

## Other AI tools

Cursor, Codex and similar tools have no plugin system. Add the following to the project's `AGENTS.md`, `.cursor/rules` or an equivalent file:

````md
## Figma to code

When the user gives a Figma link and asks for it to be built with Element Plus:

1. Run `npx -y element-plus-theme-arco-figma "<link with node-id>"`. The output is the imports plus the component code.
   - On exit code 2 (no Figma token): run `npx -y element-plus-theme-arco-figma extract "<link>"`, execute the printed script with the Figma MCP `use_figma` tool, and pipe the returned JSON into `npx -y element-plus-theme-arco-figma run -`.
2. Use the component code as is. `<!-- name -->` marks a group frame in the design; build the layout and spacing from a screenshot of the design.
3. Bindings such as `v-model="value"` are placeholders, so replace them with real state. Use CSS variables for colors and radii instead of hard-coded values.
````

## Manual use

```bash
npx element-plus-theme-arco-figma "<Figma link>"          # read with the token and print the code
npx element-plus-theme-arco-figma extract "<Figma link>"  # print the Figma MCP export script
npx element-plus-theme-arco-figma run tree.json          # turn the exported JSON into code
npx element-plus-theme-arco-figma list                   # supported components
```

## Output

- The merged imports come first, followed by one snippet per component. `<!-- name -->` is a group frame in the design.
- Composite components come with their children: Dialog includes its footer buttons, Tabs includes each pane and marks the initial one, Table builds columns from its header, and Menu and Steps work out the active item.
- `v-model="value"`, `:data="data"` and `@click="confirm"` are placeholder bindings. `<!-- xxx initial value: ... -->` comments show what is selected in the design.

The following are not generated and need to be handled by looking at the design:

- Interaction states. Hover, Focus and Active in the design are only for display and map to no property.
- Size. The design switches Small and Large through the "Control Size" variable mode; add `size` where needed, or set it once on `el-config-provider`.
- Layout, spacing and anything that is not a component.
- Theme. Dark and glass are controlled by `html.dark` and `html.glass`; see [Dark Mode](./dark) and [Glass Mode](./glass).
