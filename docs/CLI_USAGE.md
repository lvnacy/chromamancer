# CLI Usage Guide
Master the commands of the **Chromamancer** to transform your themes between VS Code and Obsidian.

**Basic Syntax**

The CLI is accessed via the chromamancer (or weave) command.Bashchromamancer <command> [options]

**The Weave Command**

The weave command is the core ritual of the tool, used to convert themes from one format to another.

**Usage**
```Bash
chromamancer weave <input-file> [options]
```

**Options and Flags**

Based on the src/commands/weave.ts logic, the following modifiers are available:
  * `-o, --output <path>`: Specify the destination path for the converted theme.
  * `-f, --format <type>`: Explicitly set the target format (e.g., `obsidian` or `vscode`).
  * `--help`: Display the arcane knowledge (help text) for this specific command.

**Utility Commands**

Beyond weaving, the CLI provides several utility rituals to inspect and prepare your themes:

| Command | Purpose | Logic File |
|---------|---------|------------|
|`cry`|Preview a theme's appearance before conversion | `.src/commands/scry.ts`|
|`extract` |Isolate the color palette from a source theme |`.src/commands/extract.ts`|
|`index` |List available conversion mappings |`.src/commands/index.ts`|

**Output Formats**

When you perform a `weave`, the CLI utilizes the core generators located in `packages/core/src/generators/` to produce the final file:
  * **Obsidian**: Produces a `.css` file compatible with Obsidian's theme system.
  * **VS Code**: Produces a `.json` theme file.
  
**Common Flags (Global)**

These flags apply to all commands within the Chromamancer toolkit:
  * `--version`: Check the current version of the tool (currently **0.1.0**).
  * `--verbose`: Output detailed logs of the transformation process.