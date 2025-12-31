# ✨ Chromamancer

> **Master the arcane art of theme transformation between VS Code and Obsidian**

<div align="center">

🚧 **UNDER ACTIVE CONSTRUCTION** 🚧

This project is in early development and **not ready for use yet!**  
Star ⭐ and watch 👀 this repo to be notified when it's ready.

[![License: GPL-3.0](https://img.shields.io/badge/License-GPL-purple.svg)](https://opensource.org/licenses/gpl-3-0)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/tests-28%20passing-brightgreen.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()

</div>

---

## 🔮 What is Chromamancer?

Chromamancer is a powerful tool for **weaving themes** between VS Code and Obsidian. As a Chromamancer, you command the magic of color, transforming themes from one realm to another with precision and craft.

Have a VS Code theme you love? **Weave it into Obsidian.**  
Want consistent theming across both apps? **Chromamancer makes it effortless.**

### ✨ The Vision

- 🎨 **One theme, two apps** - Maintain visual consistency across VS Code and Obsidian
- 🔮 **Intelligent conversion** - Smart color extraction and mapping
- 🎭 **Mood-based theming** - Different themes for different projects (dark vampire theme for your horror story, bright minimal theme for productivity notes)
- 🌈 **Community-driven** - Extensible brand system for customization
- 🚀 **Multiple interfaces** - CLI, VS Code extension, and web app (coming soon)

---

## 🚧 Current Status

### What's Working ✅

The **core conversion engine** is complete and fully tested:

- ✨ **VS Code Theme Parser** - Reads and validates VS Code theme JSON
- 🎨 **Color Palette Extractor** - Intelligently extracts the essence of colors with confidence tracking
- ⚗️ **Obsidian CSS Generator** - Generates complete Obsidian themes with 40+ variables
- 🧪 **Comprehensive Tests** - 28 tests, all passing
- 🎯 **Type-Safe** - Full TypeScript support with strict mode
- 🛠️ **Color Utilities** - Lighten, darken, saturate, mix, and more

### What's Coming Next 🔄

- 🖥️ **CLI Tool** - Command-line interface with Chromamancer branding
- 📦 **npm Package** - Install globally with `npm install -g chromamancer`
- 📖 **Documentation** - Complete usage guides and examples
- 🎨 **Example Themes** - Pre-converted popular themes
- 🔌 **VS Code Extension** - Convert themes directly from VS Code
- 🌐 **Web Interface** - Browser-based theme converter
- 🎭 **Palette Jack** - Cyberpunk-themed alternate brand

---

## 🎯 Planned Features // Roadmap

### Core Conversion
- [x] Parse VS Code themes
- [x] Extract color palettes with confidence tracking
- [x] Generate Obsidian CSS themes
- [x] Smart color fallbacks and generation
- [ ] Bidirectional conversion (Obsidian → VS Code)
- [ ] Theme validation and quality checks
- [ ] Batch conversion support

### CLI Tool (In Progress)
- [ ] `chromamancer weave` - Convert themes
- [ ] `chromamancer scry` - Preview themes
- [ ] `chromamancer extract` - Extract color palettes
- [ ] Progress indicators and beautiful output
- [ ] File I/O with error handling

### VS Code Extension (Planned)
- [ ] Convert themes from within VS Code
- [ ] Bind themes to workspaces
- [ ] Preview before converting
- [ ] One-click theme application

### Community Features (Future)
- [ ] Brand system for custom tool personalities
- [ ] Community-created brands
- [ ] Theme gallery and sharing
- [ ] Plugin system for custom transformations

---

## 🧙‍♂️ How It Works

```typescript
// 1. Parse a VS Code theme
const theme = await parseVSCodeThemeFromFile('./dracula.json');

// 2. Extract the color essence
const { palette, confidence } = extractPalette(theme);

// 3. Weave into Obsidian CSS
const { css } = generateObsidianCSS(palette, theme.type, {
  themeName: 'Dracula',
  author: 'Chromamancer',
});

// 4. Save it!
await writeFile('./dracula-obsidian.css', css);
```

✨ **Theme successfully woven!**

---

## 🛠️ For Developers

### Project Structure

```
chromamancer/
├── packages/
│   ├── core/           # Conversion engine ✅ COMPLETE
│   ├── cli/            # CLI tool 🔄 IN PROGRESS
│   ├── vscode-ext/     # VS Code extension (planned)
│   └── web/            # Web interface (planned)
├── brand/
│   ├── chromamancer/   # Fantasy/magic theme ✅
│   └── palette-jack/   # Cyberpunk theme (planned)
├── docs/
│   ├── AGENTS.md       # AI assistant context
│   ├── MAPPINGS.md     # Color mapping reference
│   └── VOICE.md        # Brand guidelines
└── examples/           # Example themes
```

### Setting Up Development

```bash
# Clone the repo
git clone https://github.com/yourusername/chromamancer.git
cd chromamancer

# Install dependencies (requires pnpm)
pnpm install

# Run tests
pnpm test

# Build all packages
pnpm build

# Start development
pnpm dev
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run type checking
pnpm type-check

# Lint code
pnpm lint
```

### Contributing

We welcome contributions! Once the project reaches v1.0, we'll have:
- Contribution guidelines
- Code of conduct
- Issue templates
- Brand creation guide

For now, feel free to:
- ⭐ Star the repo
- 👀 Watch for updates
- 💡 Open issues with ideas
- 🐛 Report bugs (when you find them)

---

## 🎨 The Brand System

Chromamancer uses a **brand-driven architecture** that allows for multiple personalities:

### Chromamancer 🔮
*Fantasy/Magical Theme*
- Commands: `weave`, `unweave`, `scry`
- Terms: grimoire, essence, incantation
- For: Writers, creatives, RPG enthusiasts

### Palette Jack 🔌
*Cyberpunk Theme (Coming Soon)*
- Commands: `jack`, `unjack`, `decrypt`
- Terms: manifest, matrix, protocol
- For: Developers, tech enthusiasts, cyberpunk fans

The brand system is **fully extensible** - anyone can create custom brands! Check out `/brand/chromamancer/VOICE.md` for inspiration.

---

## 📚 Documentation

- [**AGENTS.md**](./docs/AGENTS.md) - Complete project roadmap and context for AI assistants
- [**MAPPINGS.md**](./docs/MAPPINGS.md) - Detailed VS Code ↔ Obsidian color mappings
- [**VOICE.md**](./brand/chromamancer/VOICE.md) - Chromamancer brand guidelines

More documentation coming as the project develops!

---

## 💬 Community

- **Issues**: [Report bugs or request features](https://github.com/lvnacy/chromamancer/issues)
- **Discussions**: [Ask questions and share ideas](https://github.com/lvnacy/chromamancer/discussions)
- **Bluesky**: [@code.lvnacy.xyz](https://bsky.app/profile/code.lvnacy.xyz)

---

## 📜 License

MIT License - see [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

Chromamancer is built with:
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vitest](https://vitest.dev/) - Testing
- [Zod](https://zod.dev/) - Validation
- [Commander.js](https://github.com/tj/commander.js/) - CLI framework
- [Chalk](https://github.com/chalk/chalk) - Terminal colors

Inspired by the need for consistent theming across development tools and note-taking apps.

---

<div align="center">

**⚠️ Remember: This project is under active development!**

Check back soon for the initial release, or star ⭐ the repo to follow progress.

Made with ✨ magic ✨ and a lot of ☕ coffee

</div>