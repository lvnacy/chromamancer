# AGENTS.md - Theme Converter Project Context

> **Purpose:** This document provides context for AI assistants working on the Theme Converter project. It captures project goals, decisions, architecture, and current status so conversations can be resumed seamlessly.

**Last Updated:** December 31, 2025  
**Project Status:** Planning & Initial Architecture

---

## Project Overview

**Name:** Theme Converter (working title)

**Goal:** Build a tool that converts themes between VS Code and Obsidian, enabling users to maintain visual consistency across both applications.

**Primary Use Case:** Users with multiple Obsidian vaults opened as VS Code workspaces who want mood-based or context-specific theming (e.g., a dark vampire theme for a horror writing vault, a bright minimal theme for a productivity vault).

**Target Audience:** 
- VS Code power users
- People using VS Code to work with Obsidian vaults
- Theme creators in both ecosystems
- Users with 10+ vaults who want unique themes for each

---

## Key Project Decisions

### Distribution Strategy
**Phased approach with shared core:**

1. **Phase 1:** Core Library + CLI Tool (weeks 1-2)
   - Fastest to build and test
   - Power users can start using immediately
   - Proves the conversion logic works

2. **Phase 2:** VS Code Extension (weeks 3-6)
   - Primary target audience
   - Better UX for VS Code users
   - Can integrate with workspace settings

3. **Phase 3:** Web Interface (weeks 7-8+)
   - Broadest accessibility
   - Marketing/showcase tool
   - Helps with community adoption

### Technical Stack

**Core Library:**
- TypeScript (strict mode)
- Zod for validation/parsing
- Vitest for testing

**CLI Tool:**
- Commander.js for CLI framework
- Chalk for colored output
- Ora for spinners/progress

**VS Code Extension:**
- VS Code Extension API
- Webview for UI (if needed)
- Can leverage core library directly

**Web Interface (future):**
- Vite + Svelte
- Tailwind CSS
- Deployed to GitHub Pages or Vercel

**Build System:**
- Monorepo with pnpm workspaces
- Shared dependencies
- Single repository for all packages

---

## Project Architecture

```
chromamancer/  (base project name, can be palette-jack for fork)
├── packages/
│   ├── core/                    # Core conversion library (brand-agnostic)
│   │   ├── src/
│   │   │   ├── parsers/
│   │   │   │   ├── vscode-parser.ts
│   │   │   │   └── obsidian-parser.ts
│   │   │   ├── generators/
│   │   │   │   ├── vscode-generator.ts
│   │   │   │   └── obsidian-generator.ts
│   │   │   ├── mappings/
│   │   │   │   ├── color-mappings.ts
│   │   │   │   └── token-mappings.ts
│   │   │   ├── types/
│   │   │   │   ├── vscode-theme.ts
│   │   │   │   ├── obsidian-theme.ts
│   │   │   │   └── color-palette.ts
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   ├── tests/
│   │   └── package.json
│   │
│   ├── cli/                     # CLI tool (brand-specific text)
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   └── brand/          # Brand configuration
│   │   │       └── config.ts
│   │   ├── bin/
│   │   └── package.json
│   │
│   ├── vscode-extension/        # VS Code extension (brand-specific UI)
│   │   ├── src/
│   │   │   ├── extension.ts
│   │   │   ├── commands/
│   │   │   └── brand/          # Brand configuration
│   │   │       └── config.ts
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── web/                     # Web app (future, brand-specific design)
│       ├── src/
│       │   └── brand/          # Brand configuration
│       │       └── config.ts
│       └── package.json
│
├── docs/
│   ├── AGENTS.md               # This file (shared)
│   ├── MAPPINGS.md             # Color/token mappings (shared)
│   └── CONTRIBUTING.md
│
├── brand/                       # Brand identity files
│   ├── chromamancer/
│   │   ├── VOICE.md            # Chromamancer brand guide
│   │   ├── logo.svg
│   │   ├── colors.json
│   │   └── assets/
│   └── palette-jack/           # Future: Palette Jack brand
│       ├── VOICE.md            # Palette Jack brand guide
│       ├── logo.svg
│       ├── colors.json
│       └── assets/
│
├── examples/                    # Example themes for testing (shared)
│   ├── vscode/
│   │   ├── dracula.json
│   │   └── nord.json
│   └── obsidian/
│       ├── dracula.css
│       └── nord.css
│
├── package.json                 # Monorepo root
├── pnpm-workspace.yaml
└── tsconfig.json
```

---

## Core Technical Challenges

### 1. Color Extraction
- **VS Code:** Straightforward JSON parsing with well-defined keys
- **Obsidian:** CSS parsing with CSS variables, potential computed values, inheritance

### 2. Semantic Mapping
The core intelligence of the tool - mapping equivalent concepts:
- VS Code `editor.background` → Obsidian `--background-primary`
- VS Code token scopes → Obsidian syntax highlighting CSS classes
- UI chrome elements between both systems

### 3. Handling Non-Equivalent Elements
- **Obsidian-only:** Graph view, canvas, callouts, embedded notes
- **VS Code-only:** Terminal, debug console, git diff, minimap
- **Strategy:** Generate sensible defaults or leave commented placeholders

### 4. Bidirectional Conversion
- Initial focus: VS Code → Obsidian (primary use case)
- Future: Obsidian → VS Code (lower priority but valuable)

---

## Development Phases

### Phase 1: Core + CLI (In Progress)
**Goals:**
- [x] Create mapping document (VS Code ↔ Obsidian)
- [x] Build VS Code theme parser
- [x] Build color palette extractor
- [x] Build basic Obsidian CSS generator
- [x] Define all core types (VS Code, Obsidian, ColorPalette, Brand)
- [x] Implement color manipulation utilities
- [x] Write comprehensive tests
- [x] Set up monorepo structure with pnpm workspaces
- [x] Configure TypeScript, ESLint, Vitest
- [ ] Create CLI interface
- [ ] Implement Chromamancer brand configuration
- [ ] Add `weave` command with progress indicators
- [ ] Test with real themes
- [ ] Write CLI documentation

**Success Criteria:**
- Can convert a VS Code theme to basic Obsidian CSS ✅
- CLI is functional and user-friendly (in progress)
- Core conversion logic is solid and tested ✅
- All tests passing ✅

**Completed Work:**
- ✅ Full VS Code theme parser with Zod validation
- ✅ Intelligent theme type inference (light/dark detection)
- ✅ Color palette extraction with confidence tracking
- ✅ Smart fallback generation for missing colors
- ✅ Complete Obsidian CSS generator (40+ variables, 25+ syntax rules)
- ✅ Color manipulation utilities (lighten, darken, saturate, mix, etc.)
- ✅ Comprehensive type definitions for all entities
- ✅ Test coverage for parsers, extractors, and generators
- ✅ Development container with all tooling
- ✅ Modern ESLint flat config
- ✅ Monorepo architecture established

### Phase 2: VS Code Extension
**Goals:**
- [ ] Set up extension scaffolding
- [ ] Create commands (convert theme, apply to workspace)
- [ ] Build UI for configuration
- [ ] Integrate with workspace settings
- [ ] Add theme preview capability
- [ ] Publish to VS Code Marketplace

**Success Criteria:**
- Extension installs and runs without errors
- Can convert themes from within VS Code
- Users can apply converted themes to their vaults
- Documentation is clear

### Phase 3: Web Interface
**Goals:**
- [ ] Build web UI with file upload/download
- [ ] Add live preview
- [ ] Deploy to hosting platform
- [ ] Create landing page with examples
- [ ] Add sharing capabilities

**Success Criteria:**
- Anyone can use tool without installation
- Good showcase for community
- Drives adoption of CLI/extension

### Phase 4: Palette Jack Fork (Alternate Brand)
**Goals:**
- [ ] Create Palette Jack VOICE.md (cyberpunk theme)
- [ ] Set up brand separation in codebase
- [ ] Implement brand switcher/configuration
- [ ] Create Palette Jack visual identity (logo, colors)
- [ ] Update all UI text and commands to use brand config
- [ ] Fork repository or create brand variants
- [ ] Publish Palette Jack versions (CLI, extension, web)
- [ ] Create separate documentation/landing pages
- [ ] Cross-promote between brands

**Success Criteria:**
- Both brands use identical core conversion logic
- Brand switching is seamless (single config change)
- Each brand has distinct personality and visual identity
- Communities for both brands are engaged
- Demonstrates clean separation of concerns

**Brand Strategy:**
- **Chromamancer**: Fantasy/magical theme, appeals to creative writers, world-builders, RPG enthusiasts
- **Palette Jack**: Cyberpunk/hacker theme, appeals to developers, tech enthusiasts, cyberpunk fans
- **Shared Core**: All conversion logic, algorithms, and mappings remain brand-agnostic
- **Separate**: Commands, UI text, visual design, emoji, tone, marketing

**Implementation Approach:**
```typescript
// Brand configuration approach
const BRAND = {
  chromamancer: {
    name: 'Chromamancer',
    commands: { convert: 'weave', reverse: 'unweave', preview: 'scry' },
    terms: { theme: 'grimoire', palette: 'essence', config: 'incantation' },
    emoji: { success: '✨', progress: '🔄', preview: '🔮' },
    colors: { primary: '#8B5CF6', secondary: '#06B6D4', accent: '#F59E0B' }
  },
  paletteJack: {
    name: 'Palette Jack',
    commands: { convert: 'jack', reverse: 'unjack', preview: 'decrypt' },
    terms: { theme: 'manifest', palette: 'matrix', config: 'protocol' },
    emoji: { success: '✓', progress: '>', preview: '🔌' },
    colors: { primary: '#00FF41', secondary: '#FF006E', accent: '#00D9FF' }
  }
};
```

---

## Key Features Roadmap

### MVP Features (Phase 1)
- VS Code theme JSON parsing
- Basic color palette extraction
- Obsidian CSS generation with core colors
- Syntax highlighting conversion
- CLI with clear output

### V1.0 Features (Phase 2)
- VS Code extension with full UI
- Workspace integration
- Bidirectional conversion
- Custom mapping rules
- Theme variants (light/dark)

### V2.0 Features (Phase 3)
- Web interface
- Batch conversion
- Theme preview/comparison
- Community theme gallery
- Advanced customization options

### V3.0 Features (Phase 4)
- Palette Jack brand launch
- Dual-brand architecture
- Brand-specific marketing sites
- Cross-brand compatibility
- Community building for both brands

---

## User Stories

### Primary User: Multi-Vault Creator
> "I have 10+ Obsidian vaults for different projects (vampire story, productivity system, knowledge base, etc.). I want each vault to have a unique theme that matches its mood, and I want that theme to carry over to VS Code when I'm editing that vault's workspace."

**Needs:**
- Quick theme conversion
- Workspace-specific theme application
- Mood/context-based theming
- Consistent experience across apps

### Secondary User: Theme Creator
> "I create themes for VS Code and want to expand to the Obsidian community, but learning a new theming system is daunting."

**Needs:**
- Accurate color mapping
- Understanding of equivalencies
- Quick iteration
- Good starting point for customization

---

## Open Questions

1. **How should we handle Obsidian community themes?**
   - Many use CSS snippets, not full themes
   - Some rely on specific plugins
   - Should we support these?

2. **Theme validation:**
   - How do we ensure generated themes are valid?
   - Should we validate contrast ratios for accessibility?

3. **Naming conventions:**
   - How should converted themes be named?
   - Auto-suffix with "-converted"?
   - User customizable?

4. **Version compatibility:**
   - How do we handle VS Code theme API changes?
   - Obsidian CSS variable changes?
   - Need maintenance strategy

---

## Resources & References

### VS Code Theme Documentation
- [Theme Color Reference](https://code.visualstudio.com/api/references/theme-color)
- [Syntax Highlighting Guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
- [Extension API](https://code.visualstudio.com/api)

### Obsidian Theme Documentation
- [CSS Variables](https://docs.obsidian.md/Reference/CSS+variables/CSS+variables)
- [Build a Theme](https://docs.obsidian.md/Themes/App+themes/Build+a+theme)
- [Community Themes](https://github.com/obsidianmd/obsidian-releases/tree/master/community-css-themes)

### Example Themes to Study
- Dracula (exists for both)
- Nord (exists for both)
- Gruvbox (exists for both)
- One Dark Pro (VS Code)
- Minimal Theme (Obsidian)

---

## Current Status

**What's Done:**
- ✅ Project architecture defined
- ✅ Technical stack chosen
- ✅ Development phases planned
- ✅ AGENTS.md document created
- ✅ MAPPINGS.md document created
- ✅ VOICE.md (Chromamancer) created
- ✅ Monorepo structure established
- ✅ Core package fully implemented
- ✅ All core tests passing (28/28)
- ✅ Type definitions complete and organized
- ✅ DevContainer configured and tested

**Currently Working On:**
- 🔄 CLI package setup and implementation
- 🔄 Chromamancer brand integration
- 🔄 `weave` command implementation

**Next Steps:**
1. Complete CLI with Chromamancer branding
2. Test with real-world themes (Dracula, Nord, Gruvbox)
3. Add file I/O and error handling to CLI
4. Create usage examples and documentation
5. Prepare for initial release

---

## Future Vision: Community Brand System

### The Meta-Strategy

Chromamancer/Palette Jack isn't just a tool with two skins - it's a **platform for themed tool experiences**. The brand-centric architecture enables anyone to create custom "personas" for the tool, each with its own voice, commands, and visual identity.

### Why This Matters

**Beyond Novelty:**
- Demonstrates clean separation of concerns and extensible architecture
- Creates multiple entry points for different user communities
- Enables viral growth through creative community contributions
- Transforms project from "a converter" to "a platform"
- Excellent portfolio/conference talk material

**Use Cases:**
- **Educational**: Simplified brands for teaching design concepts
- **Enterprise**: Professional brands for corporate environments  
- **Accessibility**: Brands focused on a11y messaging and features
- **Localization**: Culture-specific brands for different regions
- **Framework-specific**: Brands targeting specific dev communities

### Community Brand Examples

Potential brand themes from the community:

- **Chroma Noir**: Film noir detective ("investigate", "case files")
- **Color Forge**: Dwarven blacksmith ("smelt", "temper", "anvil")
- **Prism Protocol**: Clean scientific/corporate theme
- **Neon Dreams**: Vaporwave aesthetic with retro vibes
- **Color Cult**: Occult ritual theme ("invoke", "sacrifice")
- **Theme.exe**: Retro MS-DOS command line aesthetic
- **Spectrum Sage**: Zen/mindfulness theme ("meditate", "harmonize")
- **Byte Painter**: Pixel art/retro game theme

### Brand System Architecture

**Brand Configuration Interface:**

```typescript
interface BrandConfig {
  // Metadata
  name: string;
  author: string;
  version: string;
  description: string;
  theme: 'fantasy' | 'scifi' | 'retro' | 'corporate' | 'minimal' | 'custom';
  
  // Commands (what users type)
  commands: {
    convert: string;        // e.g., "weave" or "jack"
    reverse: string;        // e.g., "unweave" or "unjack"
    preview: string;        // e.g., "scry" or "decrypt"
    extract: string;        // e.g., "extract" or "distill"
    batch: string;          // e.g., "ritual" or "raid"
    validate: string;       // e.g., "attune" or "verify"
    bind: string;           // e.g., "bind" or "link"
  };
  
  // Terminology (how things are named)
  terminology: {
    sourceFile: string;     // e.g., "grimoire" or "manifest"
    outputFile: string;     // e.g., "woven grimoire" or "ported manifest"
    colorPalette: string;   // e.g., "essence" or "matrix"
    configuration: string;  // e.g., "incantation" or "protocol"
    workspace: string;      // e.g., "realm" or "sector"
    process: string;        // e.g., "weaving" or "jacking"
  };
  
  // UI Messages
  messages: {
    success: string[];      // Random selection for variety
    progress: string[];
    error: string[];
    warning: string[];
    info: string[];
  };
  
  // Visual Elements
  emoji: {
    success: string;
    progress: string;
    preview: string;
    error: string;
    warning: string;
    info: string;
  };
  
  colors: {
    primary: string;        // Brand primary color
    secondary: string;      // Brand secondary color
    accent: string;         // Accent/highlight color
  };
  
  // Tone Guidelines
  tone: 'playful' | 'professional' | 'technical' | 'minimal' | 'dramatic';
  voiceNotes?: string;    // Brief description of brand personality
}
```

### Brand Distribution

**Publishing Brands:**
```bash
# Brands as npm packages
npm install @chromamancer-brands/neon-dreams
npm install @chromamancer-brands/corporate-minimal
npm install @chromamancer-brands/retro-dos

# Or as local configs
chromamancer brand install ./my-brand-config.json
```

**Brand Registry:**
- Official brand gallery/marketplace
- Community ratings and downloads
- Featured brands each month
- Brand creation contests/hackathons
- Searchable by theme, tone, community

### Brand CLI Features (Future)

```bash
# List available brands
chromamancer brands list

# Install a brand
chromamancer brands install neon-dreams

# Switch active brand
chromamancer brands use neon-dreams

# Create new brand from template
chromamancer brands create my-awesome-brand

# Test brand locally
chromamancer brands test ./my-brand-config.json

# Publish brand (requires auth)
chromamancer brands publish

# Show current brand info
chromamancer brands info
```

### Implementation Phases

**Phase 4A: Foundation (with Palette Jack)**
- Prove dual-brand architecture works
- Refine brand configuration system
- Document internal brand structure

**Phase 4B: Externalization**
- Extract brand config to separate files
- Create brand loading system
- Support external brand packages
- Build brand validation

**Phase 4C: Community Launch**
- Create brand template repository
- Write "Creating Your Own Brand" guide
- Launch brand gallery/directory
- Enable community submissions
- Marketing push around extensibility

**Phase 4D: Ecosystem Growth**
- Brand CLI commands
- Official brand contests
- Featured brand spotlights
- Integration with package managers
- Analytics on brand usage

### Documentation Structure

**For Brand Creators:**
- `/docs/BRAND_GUIDE.md` - How to create a brand
- `/docs/BRAND_TEMPLATE.md` - Starter template with explanations
- `/docs/BRAND_BEST_PRACTICES.md` - Guidelines for good brands
- `/examples/brands/` - Example brand configurations

**Brand Submission Guidelines:**
- Unique voice and personality
- Complete command set
- Appropriate emoji usage
- Accessible color choices
- Clear documentation
- Test coverage

### Marketing Opportunities

**Story Arc:**
1. **Launch**: "Chromamancer - Magical theme conversion"
2. **Evolution**: "Introducing Palette Jack - Same power, different vibe"
3. **Revolution**: "Now anyone can create their own theme converter brand"
4. **Celebration**: "50+ community brands available - find your style"

**Content Ideas:**
- Blog: "Building an extensible CLI tool with personality"
- Talk: "How brand-driven architecture improved our open source project"
- Video: "Creating your first Chromamancer brand in 10 minutes"
- Twitter: Monthly brand spotlight threads
- Livestream: Community brand creation sessions

### Success Metrics

**Indicators of healthy brand ecosystem:**
- 10+ community-created brands within 6 months
- Brands cited as reason for tool adoption
- Brand creation becomes gateway for contributions
- Brands featured in other projects as examples
- Conference talks about the brand system

### Design Principles

**For brand system:**
- **Zero-config default**: Works without any brand installed
- **Drop-in replacement**: Swapping brands requires one command
- **Fail gracefully**: Invalid brand falls back to default
- **Discoverable**: Easy to find and try new brands
- **Reversible**: Can always go back to default/previous brand

**For brand creators:**
- **Low barrier**: Should be easy to create a basic brand
- **High ceiling**: Advanced features for power users
- **Good defaults**: Template provides sensible starting point
- **Clear validation**: Helpful error messages for invalid configs
- **Living examples**: Reference implementations to learn from

### Technical Considerations

**Brand Loading:**
```typescript
// Brand resolution order
1. Command-line flag: --brand=neon-dreams
2. Environment variable: CHROMAMANCER_BRAND=neon-dreams
3. Config file: ~/.chromamancerrc brand: "neon-dreams"
4. Package.json: "chromamancer": { "brand": "neon-dreams" }
5. Default: chromamancer (or palette-jack for that fork)
```

**Validation:**
- Required fields must be present
- Commands must not conflict with core commands
- Colors must be valid hex/rgb/hsl
- Emoji must be single character or valid unicode
- Version must follow semver

**Security:**
- Brands are config only, no code execution
- Validated before loading
- Sandboxed if external packages allowed
- Clear warning for unverified brands

### Community Engagement

**Brand Showcase:**
- Monthly "Brand of the Month" feature
- Community voting/ranking
- Creator interviews and stories
- Use case spotlights

**Contribution Paths:**
- Create a brand (easiest entry point)
- Improve existing brand
- Add brand features to core
- Write brand tutorials
- Curate brand directory

### Long-term Vision

This brand system could become:
- **Reference implementation** for other CLI tools
- **Case study** in extensible architecture
- **Community builder** through creative expression
- **Educational tool** for design systems and branding
- **Platform play** that outlives the original tool

The goal isn't just to convert themes - it's to build a community around creative expression in developer tooling.

---

## Notes for AI Assistants

### Context Preservation
When starting a new conversation about this project:
1. Read this entire document first
2. Note the current status and next steps
3. Understand the user's motivation (mood-based theming, 10+ vaults)
4. Remember: Priority is VS Code power users, not casual users

### Code Generation Guidelines
- Use TypeScript with strict mode
- Write comprehensive JSDoc comments
- Include error handling
- Write tests for core logic
- Keep code modular and reusable
- Prioritize clarity over cleverness

### User Preferences
- Prefers building tools over manual work
- Excited about the learning process
- Wants to share with community
- Values polish and quality
- Has 10+ vaults, uses mood-based theming
- Already uses Foam, Markdown extensions

### Communication Style
- Be direct and technical
- Provide concrete examples
- Explain tradeoffs clearly
- Ask clarifying questions when needed
- Suggest best practices but defer to user's judgment

---

## Version History

- **v0.1.0** (2024-12-30): Initial document created during planning phase