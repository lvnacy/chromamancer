# Examples: Mastery of Theme Transformation

This guide provides practical rituals for using the Chromamancer CLI. Follow these patterns to ensure a successful weave.

## 1. Converting a VS Code Theme to Obsidian
The most common ritual involves taking a standard VS Code JSON theme and generating an Obsidian-ready CSS file.

### The Ritual
```Bash
chromamancer weave ./themes/dracula.json --format obsidian --output ./obsidian-vault/.obsidian/themes/dracula-arcane.css
```
#### What Happens Behind the Veil
  * **The Parser**: The CLI reads the VS Code JSON and identifies key UI components like `editor.background` and `syntax` highlighting.
  * **The Generator**: It maps those values to Obsidian’s CSS variables (e.g., `--background-primary`, `--text-normal`).

## 2. Extracting a Color Palette
If you only wish to harvest the essence (colors) of a theme without a full conversion, use the `extract` command.

### The Ritual
```Bash
chromamancer extract ./themes/nord.json
```

### Expected Output
The CLI will return a hex-coded palette derived from the theme's core colors:

```JSON
{
  "background": "#2e3440",
  "foreground": "#d8dee9",
  "accents": ["#88c0d0", "#81a1c1", "#5e81ac"]
}
```

> **Note**: This utilizes the palette-extractor.ts logic to identify dominant theme colors.

## 3. Customizing the Weave

You can influence the transformation by providing specific options to the generator.

### The Ritual: High Contrast Obsidian Theme

```Bash
chromamancer weave ./themes/solarized-dark.json -o ./solarized-high-test.css --format obsidian
```

#### Troubleshooting Common Issues
  * **"Invalid Theme Format"**: Ensure your VS Code theme is a valid JSON file. The `vscode-parser` requires standard key-value pairs.
  * **"Missing Mappings"**: If a specific color doesn't transfer, check `docs/MAPPINGS.md` to see how the core engine translates variables.