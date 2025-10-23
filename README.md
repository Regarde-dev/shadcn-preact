# @regarde-dev/shadcn-preact

An unofficial Preact port of [shadcn/ui](https://ui.shadcn.com/).

This is **NOT** a component library. It’s a collection of re-usable components that you can copy and paste into your apps.

## Quick Start

```bash
npx shadcn@latest add https://shadcn-preact.regarde.dev/button.json
```

## What is this?

This project provides beautifully designed, accessible components built with Preact and Tailwind CSS v4. Unlike traditional component libraries, you don't install this as a dependency. Instead, you copy the source code directly into your project using the shadcn CLI.

**What do you mean by not a component library?**

You do not install it as a dependency. It is not distributed via npm as a component package.

Pick the components you need. Copy the code into your project. Customize to your needs. The code is yours.

_Use this as a reference to build your own component libraries._

## Why Preact?

Shadcn/ui is built upon Radix UI and Tailwind CSS. While Radix UI offers robust components, it introduces dependencies that may not align with Preact projects. This port provides:

- Better integration with Preact
- Reduced external dependencies
- Portal-based architecture (no Radix UI)
- Full ARIA compliance
- Tailwind CSS v4 support

## Versions

- **v3**: Legacy version (see `apps/v3/`)
- **v4**: Current version with Portal-based architecture (see `apps/v4/`)

## Installation

```bash
# Add a single component
npx shadcn@latest add https://shadcn-preact.regarde.dev/button.json

# Add multiple components
npx shadcn@latest add https://shadcn-preact.regarde.dev/button.json
npx shadcn@latest add https://shadcn-preact.regarde.dev/dialog.json
npx shadcn@latest add https://shadcn-preact.regarde.dev/select.json
```

Or create a simple script to add multiple components:

```bash
#!/bin/bash
BASE_URL="https://shadcn-preact.regarde.dev"
for component in button dialog select; do
  npx shadcn@latest add "$BASE_URL/$component.json"
done
```

## Available Components

- Alert, Avatar, Badge, Button, Card
- Dialog, Dropdown Menu, Input, Label
- Modal, Portal, Select, Skeleton, Spinner
- Table, Textarea, Theme, Toggle, Tooltip

See [apps/v4/README.md](apps/v4/README.md) for full documentation.

## Documentation

For detailed setup and usage instructions, see:

- [v4 Documentation](apps/v4/README.md)
- [Component Registry](https://shadcn-preact.regarde.dev)

## License

Licensed under the [MIT license](LICENSE.md).

## Credits

- Original shadcn/ui by [shadcn](https://twitter.com/shadcn)
- Preact port originally by [LiasCode](https://lias-code.pages.dev)
- Extended and maintained by [cleminso](https://cleminso.xyz)
