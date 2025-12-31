# CLI Package Structure

Create this directory structure in `packages/cli/`:

```
packages/cli/
├── package.json
├── tsconfig.json
├── README.md
└── src/
    ├── index.ts                    # CLI entry point (shebang)
    ├── cli.ts                      # Commander setup
    ├── commands/
    │   ├── index.ts
    │   ├── weave.ts                # Convert theme command
    │   ├── unweave.ts              # Reverse convert (future)
    │   ├── scry.ts                 # Preview theme
    │   ├── extract.ts              # Extract color palette
    │   ├── ritual.ts               # Batch conversion (future)
    │   └── attune.ts               # Validate theme (future)
    ├── brand/
    │   ├── index.ts
    │   └── config.ts               # Brand configuration (Chromamancer)
    └── utils/
        ├── index.ts
        ├── messages.ts             # Brand-specific messages
        └── formatting.ts           # Output formatting helpers
```

## Key Files to Create

### Minimal files to get started:
1. `src/index.ts` - Entry point with shebang
2. `src/cli.ts` - Commander setup
3. `src/commands/weave.ts` - Main conversion command
4. `src/brand/config.ts` - Chromamancer brand config
5. `README.md` - CLI documentation

## Important: Shebang

The `src/index.ts` file needs a shebang at the top:
```typescript
#!/usr/bin/env node
```

This makes it executable as a CLI tool.