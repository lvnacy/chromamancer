# Chromamancer Core - Full Conversion Example

Here's how the complete theme conversion pipeline works:

## 1. Parse a VS Code Theme

```typescript
import { parseVSCodeThemeFromFile } from '@chromamancer/core';

const theme = await parseVSCodeThemeFromFile('./dracula.json');

console.log(theme.name);    // "Dracula"
console.log(theme.type);    // "dark"
console.log(theme.parsedAt); // Date object
```

## 2. Extract Color Palette

```typescript
import { extractPalette } from '@chromamancer/core';

const result = extractPalette(theme);

console.log(result.palette.backgroundPrimary); // "#282a36"
console.log(result.palette.syntax.keyword);    // "#ff79c6"
console.log(result.confidence.overall);        // "high"

if (result.warnings) {
  console.log('Warnings:', result.warnings);
}
```

## 3. Generate Obsidian CSS

```typescript
import { generateObsidianCSS } from '@chromamancer/core';

const css = generateObsidianCSS(result.palette, theme.type, {
  themeName: theme.name,
  author: 'Chromamancer',
  version: '1.0.0',
  includeComments: true,
});

console.log(css.css); // Full Obsidian CSS
console.log(css.metadata.variablesCount); // Number of CSS variables
```

## 4. Save to File

```typescript
import { writeFile } from 'node:fs/promises';

await writeFile(
  './dracula-obsidian.css',
  css.css,
  'utf-8'
);

console.log('✨ Theme woven successfully!');
```

## Complete Pipeline

```typescript
import {
  parseVSCodeThemeFromFile,
  extractPalette,
  generateObsidianCSS,
} from '@chromamancer/core';
import { writeFile } from 'node:fs/promises';

async function convertTheme(inputPath: string, outputPath: string) {
  // Parse
  const theme = await parseVSCodeThemeFromFile(inputPath);
  console.log(`📖 Parsed theme: ${theme.name}`);
  
  // Extract
  const { palette, confidence, warnings } = extractPalette(theme);
  console.log(`🎨 Extracted palette (${confidence.overall} confidence)`);
  
  if (warnings) {
    warnings.forEach(w => console.log(`⚠️  ${w}`));
  }
  
  // Generate
  const css = generateObsidianCSS(palette, theme.type, {
    themeName: theme.name,
  });
  console.log(`⚗️  Generated ${css.metadata.variablesCount} CSS variables`);
  
  // Save
  await writeFile(outputPath, css.css, 'utf-8');
  console.log(`✨ Theme woven: ${outputPath}`);
}

// Use it
await convertTheme('./dracula.json', './dracula-obsidian.css');
```

## What Gets Generated

The generated CSS includes:

- **CSS Variables** (~40+ variables)
  - Background colors (primary, secondary, modifiers)
  - Text colors (normal, muted, faint, accent)
  - Interactive colors (normal, hover, accent)
  - UI colors (borders, selections, highlights)
  - Code colors (background, syntax highlighting)
  - Table colors
  - Graph view colors

- **Syntax Highlighting** (~25+ rules)
  - Comments, keywords, strings, numbers
  - Functions, variables, types, operators
  - Markdown-specific (headers, bold, italic, lists, quotes, links)

- **Metadata** (in comments)
  - Theme name, author, version
  - Generation timestamp
  - Generator info

## Test It

Run the tests to see it all working:

```bash
cd packages/core
pnpm test
```

All tests should pass! ✅

---

**Next Steps:**

Now that the core is complete, we can:
1. Build the CLI to make this accessible from the command line
2. Add the `weave` command with Chromamancer branding
3. Make it executable as `chromamancer weave theme.json`