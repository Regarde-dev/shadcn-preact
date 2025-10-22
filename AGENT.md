# shadcn-preact Development Guidelines

shadcn-preact is a `Preact` port of `shadcn/ui`.

It’s a collection of re-usable components that you can copy and paste into your apps.

## Overview

This document defines the rules all agents must follow when working on code projects. Rules are categorized by type and include specific examples.

## Project Context

### v4 Component Architecture

The v4 components use Portal-based architecture for components like dialog, tooltip, dropdown-menu, and select. The goal is to achieve feature parity with shadcn/ui using only Preact and preact/compat.

### Key Principles

1. **Consistency**: All similar components should follow identical patterns
2. **Accessibility**: Proper ARIA attributes and semantic HTML
3. **Type Safety**: Avoid type casting, use proper Preact types
4. **Composability**: Use shared utilities like `useComposedRefs` and `Portal`

## Content Guidelines

### Temporal References

Exclude all references to time, including dates, estimates, deadlines, and timelines.

### Language Usage

- Avoid verbose language and superlatives
- Use camelCase as file naming convention
- No promotional terms ("NEW", "Enhanced")
- Keep communication simple and clear
- No emojis except for ✓ (good examples) and ✗ (bad examples)

## Code Standards

### TypeScript Requirements

- Follow correct TypeScript patterns
- Minimize comments - write self-documenting code

### Package Management

- Use PNPM for all Node.js packages
- Prefix native Node.js packages with `node:`
- For unconfigured TypeScript projects: PNPM (package management), Vite (building), Vitest (testing), TSDown (bundling)

## v4 Component Patterns

### Ref Composition

Always use `useComposedRefs` utility instead of manual ref handling.

✓ Good:

```typescript
import { useComposedRefs } from "./share/compose_ref";

const composedRefs = useComposedRefs(
  localRef as any,
  forwardedRef as any,
  (node: HTMLElement | null) => refs.setReference(node)
);

<button ref={composedRefs} />
```

✗ Bad:

```typescript
useEffect(() => {
  if (forwardedRef) {
    if (typeof forwardedRef === "function") {
      forwardedRef(localRef.current);
    } else {
      forwardedRef.current = localRef.current;
    }
  }
}, [forwardedRef]);

<button ref={localRef} />
```

### Portal Usage

Use `Portal` component for content that renders outside parent DOM, not `Modal`.

✓ Good:

```typescript
import { Portal } from "./portal";

<Portal>
  <div id="dropdown-content" role="menu">
    {children}
  </div>
</Portal>
```

✗ Bad:

```typescript
import { Modal } from "./modal";

<Modal>
  <div>{children}</div>
</Modal>
```

### ARIA Attributes

Add proper ARIA attributes for accessibility and component relationships.

✓ Good:

```typescript
// Trigger component
<button
  type="button"
  role="button"
  aria-expanded={open}
  aria-controls="select-content"
  aria-haspopup="listbox"
>

// Content component
<div
  id="select-content"
  role="listbox"
>
```

✗ Bad:

```typescript
// Missing aria-controls and id relationship
<button aria-expanded={open}>

<div role="listbox">
```

### v4 Data Attributes

Use data attributes for CSS targeting and state management.

✓ Good:

```typescript
<button
  type={asChild ? undefined : "button"}
  data-slot="select-trigger"
  data-state={open ? "open" : "closed"}
  data-disabled={disabled ? "true" : undefined}
  data-placeholder={!value ? "" : undefined}
>
```

✗ Bad:

```typescript
<button
  className={open ? "open" : "closed"}
  disabled={disabled}
>
```

### Event Handler Types

Use `typeof` to infer correct Preact event types, avoid casting.

✓ Good:

```typescript
const handleClick: typeof onClick = (e) => {
  if (disabled) return;
  setOpen(!open);
  if (onClick) onClick(e);
};
```

✗ Bad:

```typescript
const handleClick = (e: MouseEvent) => {
  if (disabled) return;
  setOpen(!open);
  onClick?.(e as any);
};
```

### Component Consistency

When implementing similar components, ensure identical patterns.

✓ Good:

```typescript
// Both SelectTrigger and DropdownMenuTrigger use same pattern
<button
  ref={composedRefs}
  type={asChild ? undefined : "button"}
  aria-expanded={open}
  aria-controls="content-id"
  data-slot="component-trigger"
  data-state={open ? "open" : "closed"}
>
```

✗ Bad:

```typescript
// SelectTrigger has type="button", DropdownMenuTrigger doesn't
// SelectTrigger has data-slot, DropdownMenuTrigger doesn't
```

## Comparing with shadcn/ui

When implementing or refactoring components:

1. Fetch the shadcn/ui React implementation from GitHub
2. Compare component structure and props
3. Identify missing features or patterns
4. Adapt React patterns to Preact (using preact/compat)
5. Maintain v4 architectural patterns (Portal, useComposedRefs, data attributes)

Example workflow:

```bash
# Fetch shadcn/ui component
https://github.com/shadcn-ui/ui/raw/refs/heads/main/apps/www/registry/default/ui/select.tsx

# Compare:
# - Component exports (SelectTrigger, SelectContent, SelectItem, etc.)
# - Props and attributes
# - ARIA patterns
# - Child component structure (SelectScrollUpButton, SelectScrollDownButton)
# - Event handlers
```

## Anti-Patterns to Avoid

### Manual Ref Composition

✗ Avoid manual ref handling - use `useComposedRefs`

### Event Type Casting

✗ Avoid `(e as any)` - use `typeof onClick` pattern

### Modal for Portal Content

✗ Avoid `Modal` component - use `Portal` for v4 components

### Inconsistent ARIA

✗ Avoid missing `aria-controls` and `id` relationships

### Missing data-slot

✗ Avoid missing `data-slot` attributes for CSS targeting

### Inconsistent type Attributes

✗ Avoid missing `type="button"` on button elements that aren't in forms

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
