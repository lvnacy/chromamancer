# MAPPINGS.md - Theme Color & Token Mappings

> **Purpose:** This document defines how colors and tokens map between VS Code and Obsidian themes. It serves as the reference for the conversion logic.

**Last Updated:** December 30, 2024

---

## Overview

VS Code themes use JSON with specific color keys, while Obsidian themes use CSS with custom properties (variables). This document maps equivalent concepts between the two systems.

### Key Differences

| Aspect | VS Code | Obsidian |
|--------|---------|----------|
| Format | JSON | CSS |
| Color Definition | Direct hex values | CSS custom properties |
| Syntax Highlighting | Token scopes | CSS classes |
| Theming Approach | Declarative key-value | CSS cascade & inheritance |
| Variants | Separate files or fields | CSS media queries or separate files |

---

## Core Color Mappings

### Editor Background & Foreground

| VS Code Key | Obsidian Variable | Notes |
|-------------|-------------------|-------|
| `editor.background` | `--background-primary` | Main editor background |
| `editor.foreground` | `--text-normal` | Main text color |
| `sideBar.background` | `--background-secondary` | Sidebar/file explorer |
| `sideBar.foreground` | `--text-muted` | Sidebar text |
| `activityBar.background` | `--background-modifier-border` | Left-most bar in VS Code |
| `activityBar.foreground` | `--text-normal` | Activity bar icons |
| `statusBar.background` | `--background-secondary` | Bottom bar |
| `statusBar.foreground` | `--text-normal` | Status bar text |
| `titleBar.activeBackground` | `--titlebar-background` | Window title bar |
| `titleBar.activeForeground` | `--titlebar-text-color-focused` | Title bar text |

### Selection & Highlighting

| VS Code Key | Obsidian Variable | Notes |
|-------------|-------------------|-------|
| `editor.selectionBackground` | `--text-selection` | Selected text background |
| `editor.lineHighlightBackground` | `--background-primary-alt` | Current line highlight |
| `editor.findMatchBackground` | `--text-highlight-bg` | Search match background |
| `editor.findMatchHighlightBackground` | `--text-highlight-bg-active` | Other matches |
| `editorCursor.foreground` | `--text-accent` | Cursor color |

### UI Elements

| VS Code Key | Obsidian Variable | Notes |
|-------------|-------------------|-------|
| `input.background` | `--background-modifier-form-field` | Input fields |
| `input.foreground` | `--text-normal` | Input text |
| `input.border` | `--background-modifier-border` | Input borders |
| `button.background` | `--interactive-accent` | Primary buttons |
| `button.foreground` | `--text-on-accent` | Button text |
| `button.hoverBackground` | `--interactive-accent-hover` | Button hover state |
| `dropdown.background` | `--background-secondary` | Dropdowns |
| `dropdown.foreground` | `--text-normal` | Dropdown text |
| `list.activeSelectionBackground` | `--background-modifier-hover` | Active list item |
| `list.hoverBackground` | `--background-secondary-alt` | Hovered list item |

### Links & Accents

| VS Code Key | Obsidian Variable | Notes |
|-------------|-------------------|-------|
| `textLink.foreground` | `--text-accent` | Clickable links |
| `textLink.activeForeground` | `--text-accent-hover` | Active/hover links |
| `focusBorder` | `--background-modifier-border-focus` | Focus indicator |
| N/A | `--interactive-accent` | Obsidian's primary accent color |

### Borders & Dividers

| VS Code Key | Obsidian Variable | Notes |
|-------------|-------------------|-------|
| `contrastBorder` | `--background-modifier-border` | General borders |
| `panel.border` | `--background-modifier-border` | Panel separators |
| `sideBar.border` | `--background-modifier-border` | Sidebar borders |

---

## Syntax Highlighting Mappings

### Token Scopes → CSS Classes

VS Code uses TextMate scopes for syntax highlighting. Obsidian uses CSS classes that target CodeMirror elements.

#### Comments

| VS Code Scope | Obsidian Class | Color Reference |
|---------------|----------------|-----------------|
| `comment` | `.cm-comment` | Usually muted/gray |
| `comment.line` | `.cm-comment` | Same as above |
| `comment.block` | `.cm-comment` | Same as above |

#### Keywords & Control Flow

| VS Code Scope | Obsidian Class | Color Reference |
|---------------|----------------|-----------------|
| `keyword` | `.cm-keyword` | Usually purple/magenta |
| `keyword.control` | `.cm-keyword` | Same |
| `keyword.operator` | `.cm-operator` | Can be distinct |
| `storage.type` | `.cm-type` | Type keywords |
| `storage.modifier` | `.cm-keyword` | public, private, etc. |

#### Strings & Values

| VS Code Scope | Obsidian Class | Color Reference |
|---------------|----------------|-----------------|
| `string` | `.cm-string` | Usually green or yellow |
| `string.quoted` | `.cm-string` | Same |
| `string.regexp` | `.cm-string-2` | Regex patterns |
| `constant.numeric` | `.cm-number` | Numbers |
| `constant.language` | `.cm-atom` | true, false, null |
| `constant.character` | `.cm-string` | Character literals |

#### Functions & Methods

| VS Code Scope | Obsidian Class | Color Reference |
|---------------|----------------|-----------------|
| `entity.name.function` | `.cm-def` | Function names |
| `support.function` | `.cm-builtin` | Built-in functions |
| `entity.name.method` | `.cm-property` | Method names |

#### Variables & Properties

| VS Code Scope | Obsidian Class | Color Reference |
|---------------|----------------|-----------------|
| `variable` | `.cm-variable` | General variables |
| `variable.parameter` | `.cm-variable-2` | Function parameters |
| `variable.language` | `.cm-variable-3` | this, self, etc. |
| `entity.name.tag` | `.cm-tag` | HTML/XML tags |
| `entity.other.attribute-name` | `.cm-attribute` | HTML attributes |
| `support.type.property-name` | `.cm-property` | Object properties |

#### Classes & Types

| VS Code Scope | Obsidian Class | Color Reference |
|---------------|----------------|-----------------|
| `entity.name.class` | `.cm-type` | Class names |
| `entity.name.type` | `.cm-type` | Type names |
| `support.class` | `.cm-builtin` | Built-in classes |

#### Punctuation & Operators

| VS Code Scope | Obsidian Class | Color Reference |
|---------------|----------------|-----------------|
| `punctuation` | `.cm-punctuation` | General punctuation |
| `keyword.operator` | `.cm-operator` | +, -, *, /, etc. |
| `punctuation.definition.comment` | `.cm-comment` | Comment markers |

#### Markdown-Specific

| VS Code Scope | Obsidian Class | Color Reference |
|---------------|----------------|-----------------|
| `markup.heading` | `.cm-header` | # Headers |
| `markup.bold` | `.cm-strong` | **bold** |
| `markup.italic` | `.cm-em` | *italic* |
| `markup.list` | `.cm-list` | List markers |
| `markup.quote` | `.cm-quote` | > Blockquotes |
| `markup.inline.raw` | `.cm-inline-code` | `code` |
| `markup.fenced_code` | `.cm-code` | ```code blocks``` |
| `markup.underline.link` | `.cm-link` | [links]() |

---

## Obsidian-Specific Elements

These elements exist in Obsidian but have no direct VS Code equivalent. We'll generate sensible defaults based on the color palette.

### UI Components

| Obsidian Variable | Generation Strategy |
|-------------------|---------------------|
| `--background-modifier-cover` | Darken/lighten background by 5% |
| `--background-modifier-success` | Green from palette or generate |
| `--background-modifier-error` | Red from palette or generate |
| `--background-modifier-error-hover` | Lighten error color by 10% |
| `--interactive-normal` | Use border color |
| `--interactive-hover` | Lighten interactive-normal by 10% |

### Content Elements

| Obsidian Variable | Generation Strategy |
|-------------------|---------------------|
| `--text-error` | Red from syntax highlighting |
| `--text-faint` | Darken text-muted by 20% |
| `--code-normal` | Use string color from syntax |
| `--code-background` | Slightly different from editor background |
| `--blockquote-border` | Use accent or muted text color |

### Graph View

| Obsidian Variable | Generation Strategy |
|-------------------|---------------------|
| `--graph-node` | Use accent color |
| `--graph-node-unresolved` | Use muted text color |
| `--graph-node-tag` | Use keyword color from syntax |
| `--graph-line` | Use border color, semi-transparent |

### Tables

| Obsidian Variable | Generation Strategy |
|-------------------|---------------------|
| `--table-header-background` | Lighten/darken background by 5% |
| `--table-row-alt-background` | Alternate row color (zebra striping) |
| `--table-border-color` | Use border color |

---

## VS Code-Specific Elements

These elements exist in VS Code but have no direct Obsidian equivalent. They'll be omitted or commented out in generated Obsidian themes.

### Development Tools

- `debugToolBar.*` - Debug toolbar colors
- `terminal.*` - Integrated terminal colors
- `gitDecoration.*` - Git status colors
- `merge.*` - Merge conflict colors
- `diff.*` - Diff editor colors
- `editorGutter.*` - Line number gutter
- `minimap.*` - Code minimap colors

### Extensions

Many extension-specific color keys (e.g., `errorLens.*`, `gitlens.*`) won't map to Obsidian.

**Strategy:** Skip these during conversion, optionally log them for user awareness.

---

## Color Palette Extraction Strategy

When parsing a VS Code theme, we'll extract a core color palette:

### Primary Colors
1. **Background Primary** - `editor.background`
2. **Background Secondary** - `sideBar.background`
3. **Text Primary** - `editor.foreground`
4. **Text Secondary** - `sideBar.foreground`
5. **Accent Color** - `textLink.foreground` or `focusBorder`

### Syntax Palette (from `tokenColors`)
6. **Comment Color** - `comment` scope
7. **Keyword Color** - `keyword` scope
8. **String Color** - `string` scope
9. **Function Color** - `entity.name.function` scope
10. **Variable Color** - `variable` scope
11. **Number Color** - `constant.numeric` scope
12. **Type Color** - `entity.name.type` scope

### UI Palette
13. **Border Color** - `contrastBorder` or `panel.border`
14. **Selection Color** - `editor.selectionBackground`
15. **Error Color** - `editorError.foreground` or generate from palette
16. **Warning Color** - `editorWarning.foreground` or generate from palette
17. **Success Color** - Generate from palette (usually green)

---

## Conversion Rules

### Color Format Conversion

**VS Code → Obsidian:**
- Hex colors: Use as-is (`#ff0000`)
- RGBA: Convert to hex if alpha is 100%, otherwise use `rgba()`
- Named colors: Convert to hex

**Obsidian → VS Code:**
- CSS variables: Resolve to hex values
- Hex colors: Use as-is
- RGB/RGBA: Convert to hex when possible

### Alpha/Transparency Handling

- VS Code supports alpha in hex format: `#ff000080`
- Obsidian uses `rgba()` or hex with alpha
- **Strategy:** Use hex with alpha when both support it, `rgba()` otherwise

### Missing Color Handling

**If a VS Code theme is missing a key:**
1. Try to infer from related colors
2. Use palette-based generation
3. Fall back to sensible defaults
4. Document what was generated

**If an Obsidian variable has no source:**
1. Generate from color palette
2. Use algorithm (lighten/darken)
3. Mark as auto-generated in output

---

## Generation Algorithms

### Color Manipulation Functions

```typescript
// Pseudo-code for common operations

function lighten(color: string, percent: number): string
function darken(color: string, percent: number): string
function saturate(color: string, percent: number): string
function desaturate(color: string, percent: number): string
function setAlpha(color: string, alpha: number): string
function mix(color1: string, color2: string, weight: number): string
```

### Palette-Based Generation

For missing colors, use these strategies:

**Error Color:**
```typescript
if (theme has red in syntax) use that
else generate red (hue: 0, sat: 70%, light: 50%)
```

**Success Color:**
```typescript
if (theme has green in syntax) use that
else generate green (hue: 120, sat: 70%, light: 50%)
```

**Warning Color:**
```typescript
if (theme has yellow/orange in syntax) use that
else generate orange (hue: 30, sat: 70%, light: 50%)
```

---

## Theme Metadata

### VS Code Theme Structure

```json
{
  "name": "Theme Name",
  "type": "dark" | "light",
  "colors": { /* UI colors */ },
  "tokenColors": [ /* Syntax highlighting */ ]
}
```

### Obsidian Theme Structure

```css
/* Theme metadata in comment block */
/*
Theme: Theme Name
Author: Generated by Theme Converter
Version: 1.0.0
*/

.theme-dark {
  /* Dark theme variables */
}

.theme-light {
  /* Light theme variables */
}
```

---

## Testing Strategy

### Reference Themes

We'll test conversions against these well-known themes:

1. **Dracula** - Dark, high contrast
2. **Nord** - Cool, muted colors
3. **Gruvbox** - Warm, retro colors
4. **One Dark Pro** - Popular VS Code theme
5. **Solarized** - Light and dark variants

### Validation Checks

For each converted theme:
- [ ] All required Obsidian variables are present
- [ ] No invalid color values
- [ ] Syntax highlighting has minimum required classes
- [ ] Contrast ratios meet WCAG guidelines (optional)
- [ ] Theme works in both light and dark modes

---

## Future Enhancements

### Advanced Mappings
- Support for Obsidian community plugins (Dataview, Tasks, etc.)
- VS Code extension-specific colors
- Custom user-defined mappings

### Smart Color Generation
- Machine learning to better predict missing colors
- Perceptual color harmony analysis
- Accessibility scoring

### Bidirectional Improvements
- Better Obsidian → VS Code conversion
- Handle complex CSS (gradients, filters, etc.)
- Preserve custom CSS snippets

---

## References

### VS Code
- [Theme Color Reference](https://code.visualstudio.com/api/references/theme-color)
- [Syntax Highlighting Guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)

### Obsidian
- [CSS Variables](https://docs.obsidian.md/Reference/CSS+variables/CSS+variables)
- [Appearance Settings](https://docs.obsidian.md/Reference/CSS+variables/Foundations/Colors)

### Color Theory
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [HSL Color Model](https://en.wikipedia.org/wiki/HSL_and_HSV)

---

## Changelog

- **2024-12-30:** Initial mapping document created