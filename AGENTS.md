# shadcn-preact Development Guidelines

shadcn-preact is a `Preact` port of `shadcn/ui`.

It’s a collection of re-usable components that you can copy and paste into your apps.

## Overview

This document defines the rules all agents must follow when working on code projects. Rules are categorized by type and include specific examples.

## Project Context

### v4 Component Architecture

The v4 components use Portal-based architecture for components like dialog, tooltip, dropdown-menu, and select. The goal is to achieve feature parity with shadcn/ui using only Preact and preact/compat.

### v4 Architecture Patterns

- `Portal` for content outside parent DOM (not Modal)
- `useComposedRefs` for multiple ref composition
- Data attributes: `data-slot`, `data-state`, `data-disabled`
- Complete ARIA: `aria-controls` + matching `id`
- Type="button" for non-form buttons

## Task Structure

### Planning Format

Structure outputs as top-down task lists with critical tasks first.

### Documentation Maintenance

- Update Table of Contents when modifying documentation
- Create Table of Contents if absent

## Verification Steps

After refactoring components:

1. Check TypeScript diagnostics: `diagnostics` tool
2. Verify dev server runs: `npm run dev` in apps/v4
3. Compare patterns with similar components
4. Verify ARIA attributes with accessibility tools
5. Test keyboard navigation and focus management
6. Ensure consistency across all portal-based components

## Build/Lint/Test Commands

### Root Commands

```bash
pnpm dev          # Start both apps
pnpm build        # Build both apps
pnpm lint         # Lint all apps
pnpm format       # Format all apps
```

### App Commands (in apps/v3 or apps/v4)

```bash
pnpm dev          # Start dev server
pnpm build        # Type check + build
pnpm lint         # Biome lint with auto-fix
pnpm format       # Prettier format
```

### Single Test (No test framework configured)

```bash
# Use TypeScript check as basic validation
cd apps/v3 && pnpm tsc --noEmit
cd apps/v4 && pnpm tsc --noEmit
```

## Code Style Guidelines

### Imports

- Use path aliases: `@/` for src, `@ui/` for components
- Import type separately: `import type { Props } from "module"`
- Use `node:` prefix for Node.js modules
- Preact/compat for React compatibility

### Formatting

- Biome + Prettier: 120 char width, 2 spaces, double quotes
- Semicolons always, trailing commas ES5
- Single attribute per line for JSX
- camelCase file names

### TypeScript

- Strict mode, no `any` casting
- Use `typeof onClick` for event handlers
- ForwardRef with proper typing
- Avoid type assertions

### Error Handling

- Early returns for disabled states
- Null checks before DOM operations
- Prevent default on handled events
- Graceful degradation for missing refs

### Component Consistency

- Match patterns across similar components
- Use same utility functions (cn, cva, Slot)
- Identical prop interfaces for compound components
- Consistent CSS class structure

## Content Guidelines

### Temporal References

Exclude all references to time, including dates, estimates, deadlines, and timelines.

### Language Usage

- Avoid verbose language and superlatives
- Use camelCase as file naming convention
- No promotional terms ("NEW", "Enhanced")
- Keep communication simple and clear
- No emojis except for ✓ (good examples) and ✗ (bad examples)
