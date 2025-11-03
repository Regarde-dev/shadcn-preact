# @regarde/shadcn-preact

A Preact port of [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components that you can copy and paste into your apps.

## Philosophy

This is **not a component library**. It's a collection of re-usable components that you can copy and paste into your apps.

**What do you mean by not a component library?**

It means you do not install it as a dependency. It is not available or distributed via npm.

Pick the components you need. Copy and paste the code into your project and customize to your needs. The code is yours.

_Use this as a reference to build your own component libraries._

## Features

- ✓ Portal-based architecture for overlays (Dialog, Tooltip, Dropdown Menu, Select)
- ✓ Full ARIA compliance and keyboard navigation
- ✓ Built with Preact and preact/compat
- ✓ Tailwind CSS v4 support
- ✓ TypeScript support
- ✓ Registry-based distribution (copy source code, not npm packages)

## Requirements

Make sure you have the following installed:

```bash
pnpm add preact @preact/preset-vite tailwindcss @tailwindcss/postcss
```

Additional optional dependencies:

```bash
pnpm add clsx tailwind-merge class-variance-authority
```

This assumes you are using Preact and Vite for your application. Open an issue if you need additional support.

### Basic Setup

1. **Configure Tailwind CSS v4**

Create a `postcss.config.js`:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

2. **Add CSS imports**

In your main CSS file (e.g., `src/index.css`):

```css
@import "tailwindcss";
@import "tw-animate-css";
```

3. **Configure path aliases**

In your `vite.config.ts`:

```ts
import { resolve } from "node:path";
import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      "@ui": resolve(__dirname, "./src/components/ui/"),
      "@": resolve(__dirname, "./src/"),
    },
  },
  define: {
    "process.env.IS_PREACT": JSON.stringify("true"),
  },
});
```

In your `tsconfig.json`:

```jsonc
  // make sure these values are set
  {
  "compilerOptions": {
    // your config ...
    "paths": {
      // your paths ...
      "react": ["./node_modules/preact/compat/"],
      "react-dom": ["./node_modules/preact/compat/"],
      "@ui/*": ["./src/components/ui/*"],
      "@/*": ["./src/*"]
    },
    "jsx": "react-jsx",
    "jsxImportSource": "preact"
  }
```

4. **Create components.json**

Create a `components.json` file in your project root:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui",
    "lib": "@/components/ui/share",
    "utils": "@/components/ui/share/cn"
  }
}
```

**Important:** This configuration tells the shadcn CLI where to place components and utilities. The `lib` alias points to `@/components/ui/share` because shadcn-preact stores shared utilities (like `cn`, `slot`, hooks) in the `share/` subdirectory within the UI components folder.

Feel free to update the paths to match your preferences.

## Manual Installation

In your project, you can install the vite CLI using:

```bash
pnpm add -D vite
```

Use the shadcn CLI to add components to your project:

```bash
pnpx shadcn@latest add https://shadcn-preact.regarde.dev/button.json
```

Add multiple components:

```bash
pnpx shadcn@latest add https://shadcn-preact.regarde.dev/button.json
pnpx shadcn@latest add https://shadcn-preact.regarde.dev/dialog.json
pnpx shadcn@latest add https://shadcn-preact.regarde.dev/select.json
```

Or create a helper script:

```bash
#!/bin/bash
BASE_URL="https://shadcn-preact.regarde.dev"
for component in button dialog select; do
  pnpx shadcn@latest add "$BASE_URL/$component.json"
done
```

**Note:** If you don't have a `components.json` file when running the CLI, it will prompt you to create one. Make sure to configure it as shown above for proper file placement.

### Using Components

After adding components, import and use them in your app:

```tsx
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

function App() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        <p>Dialog content goes here</p>
      </DialogContent>
    </Dialog>
  );
}
```

## Available Components

- Alert
- Avatar
- Badge
- Button
- Card
- Checkbox
- Dialog
- Dropdown Menu
- Input
- Label
- Modal
- Portal
- Select
- Separator
- Skeleton
- Spinner
- Table
- Tabs
- Textarea
- Theme
- Toggle
- Tooltip

## v4 Architecture

The v4 components use a Portal-based architecture for components like Dialog, Tooltip, Dropdown Menu, and Select. Key patterns:

- **Portal** for rendering content outside parent DOM
- **useComposedRefs** for multiple ref composition
- **Data attributes**: `data-slot`, `data-state`, `data-disabled`
- **Complete ARIA**: `aria-controls` + matching `id`
- **Type="button"** for non-form buttons

## Dependencies

Core dependencies included:

- `@floating-ui/react-dom` - Positioning engine
- `class-variance-authority` - Component variants
- `clsx` & `tailwind-merge` - Class name utilities
- `lucide-preact` - Icon library
- `preact` - UI framework

## License

MIT

## Credits

- Original shadcn/ui by [shadcn](https://twitter.com/shadcn)
- Preact port originally by [LiasCode](https://lias-code.pages.dev)
- Simply extend existing base by [cleminso](https://cleminso.xyz)

## Contributing

This is a copy-paste component library. Feel free to copy, modify, and adapt the components to your needs.

For issues and feature requests, please visit the [GitHub repository](https://github.com/regarde-dev/shadcn-preact).
