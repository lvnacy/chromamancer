# Core Package Structure

Create this directory structure in `packages/core/`:

```
packages/core/
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── README.md
└── src/
    ├── index.ts                    # Main export file
    ├── parsers/
    │   ├── index.ts
    │   ├── vscode-parser.ts        # Parse VS Code theme JSON
    │   ├── vscode-parser.test.ts
    │   ├── obsidian-parser.ts      # Parse Obsidian CSS (future)
    │   └── obsidian-parser.test.ts
    ├── generators/
    │   ├── index.ts
    │   ├── vscode-generator.ts     # Generate VS Code JSON (future)
    │   ├── vscode-generator.test.ts
    │   ├── obsidian-generator.ts   # Generate Obsidian CSS
    │   └── obsidian-generator.test.ts
    ├── mappings/
    │   ├── index.ts
    │   ├── color-mappings.ts       # VS Code ↔ Obsidian color mappings
    │   ├── token-mappings.ts       # Syntax token mappings
    │   └── mappings.test.ts
    ├── types/
    │   ├── index.ts
    │   ├── vscode-theme.ts         # VS Code theme types
    │   ├── obsidian-theme.ts       # Obsidian theme types
    │   ├── color-palette.ts        # Color palette types
    │   └── brand.ts                # Brand configuration types
    └── utils/
        ├── index.ts
        ├── color-utils.ts          # Color manipulation functions
        ├── color-utils.test.ts
        ├── validators.ts           # Zod validators
        └── validators.test.ts
```

## Key Files to Create

### Minimal files to get started:
1. `src/index.ts` - Export public API
2. `src/types/vscode-theme.ts` - Define VS Code theme structure
3. `src/types/color-palette.ts` - Define color palette structure
4. `src/parsers/vscode-parser.ts` - First real functionality!
5. `README.md` - Package documentation

You can create placeholder files for the rest and fill them in as we go.