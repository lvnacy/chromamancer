# VOICE.md - Chromamancer Brand Guide

> **Purpose:** This document defines the voice, personality, and terminology for Chromamancer. It should be used consistently across CLI commands, documentation, UI text, and community communications.

**Brand:** Chromamancer  
**Theme:** Fantasy/Magic  
**Last Updated:** December 30, 2024

---

## Brand Identity

### Concept
Chromamancer is a master of color magic who weaves themes across the boundaries between VS Code and Obsidian. As a Chromamancer, you bend colors to your will, transforming themes from one form to another through arcane knowledge and mystical craft.

### Personality
- **Mystical yet approachable** - Magic-themed but not overly pompous
- **Skilled craftsmanship** - Emphasis on precision and artistry
- **Empowering** - Makes users feel like powerful mages
- **Whimsical but functional** - Fun flavor text, but clear UX

### Tone Guidelines
- Use magic/fantasy terminology consistently
- Keep technical explanations clear despite magical framing
- Avoid being overly verbose or "ye olde" speech patterns
- Make users feel like they're wielding powerful magic, not fumbling with spells

---

## Core Terminology

### Primary Metaphor: Weaving
Themes are **woven** from one form to another, like fabric on a loom or spells from raw magic.

### Key Terms

| Concept | Chromamancer Term | Usage |
|---------|-------------------|--------|
| Convert | Weave | "Weave a theme from VS Code to Obsidian" |
| Reverse convert | Unweave | "Unweave an Obsidian theme back to VS Code" |
| Theme file | Grimoire | "Your theme grimoire contains all color knowledge" |
| Color palette | Essence | "The essence of your theme has been extracted" |
| Source theme | Source Grimoire | "Reading from the source grimoire..." |
| Output theme | Woven Grimoire | "Your woven grimoire is ready" |
| Configuration | Incantation | "Configure your incantation for custom weaving" |
| Theme preview | Scry | "Scry into your theme before weaving" |
| Validation | Attune | "Attuning your theme for harmony..." |
| Batch process | Ritual | "Perform a ritual to weave multiple themes" |
| Extension | Spellbook | "The Chromamancer Spellbook for VS Code" |

### Secondary Vocabulary
- **Channel** - Process or convert colors
- **Manifest** - Generate or create output
- **Enchant** - Apply special effects or modifications
- **Bind** - Associate themes with workspaces
- **Invoke** - Run a command
- **Cast** - Execute a conversion
- **Conjure** - Create something new
- **Transmute** - Transform from one state to another

---

## Command Structure

### Primary Commands

#### `weave`
Convert a theme from one format to another.

**Syntax:**
```bash
chromamancer weave <source> [options]
```

**Flavor text:** "Weave the threads of color into a new form..."

**Examples:**
```bash
chromamancer weave dracula.json --output obsidian
chromamancer weave nord-theme.css --output vscode --name "Nord Woven"
```

#### `unweave`
Reverse conversion (Obsidian → VS Code).

**Syntax:**
```bash
chromamancer unweave <source> [options]
```

**Flavor text:** "Unravel the threads to reveal the original pattern..."

**Examples:**
```bash
chromamancer unweave minimal.css --output vscode
```

#### `scry`
Preview a theme before converting.

**Syntax:**
```bash
chromamancer scry <source>
```

**Flavor text:** "Peer into the color realm to see what awaits..."

**Examples:**
```bash
chromamancer scry dracula.json
chromamancer scry dracula.json --format json
```

#### `extract`
Extract just the color palette/essence.

**Syntax:**
```bash
chromamancer extract <source> [options]
```

**Flavor text:** "Draw forth the pure essence of color..."

**Examples:**
```bash
chromamancer extract dracula.json --format palette
chromamancer extract theme.css --output colors.json
```

#### `ritual`
Batch process multiple themes.

**Syntax:**
```bash
chromamancer ritual <directory> [options]
```

**Flavor text:** "Prepare the ritual circle for mass transformation..."

**Examples:**
```bash
chromamancer ritual ./themes --output ./woven
chromamancer ritual ./vscode-themes --format obsidian
```

#### `attune`
Validate and check theme harmony.

**Syntax:**
```bash
chromamancer attune <theme>
```

**Flavor text:** "Testing the harmony of colors and balance of light..."

**Examples:**
```bash
chromamancer attune dracula-woven.css
chromamancer attune theme.json --strict
```

#### `bind`
Associate a theme with a VS Code workspace.

**Syntax:**
```bash
chromamancer bind <theme> <workspace>
```

**Flavor text:** "Binding the woven theme to your workspace..."

**Examples:**
```bash
chromamancer bind vampire-dark.css ./vampire-story.code-workspace
```

### Utility Commands

#### `grimoire`
List available themes or show theme info.

**Syntax:**
```bash
chromamancer grimoire [theme]
```

**Examples:**
```bash
chromamancer grimoire
chromamancer grimoire dracula
```

#### `incantation`
Show or edit configuration.

**Syntax:**
```bash
chromamancer incantation [--set key=value]
```

**Examples:**
```bash
chromamancer incantation
chromamancer incantation --set default-format=obsidian
```

#### `help`
Show help (styled as consulting the ancient texts).

**Flavor text:** "Consulting the ancient texts of color magic..."

---

## Command Options

### Common Flags (use across commands)

| Flag | Description | Chromamancer Flavor |
|------|-------------|---------------------|
| `--output, -o` | Output format or path | "Manifest the woven theme as..." |
| `--name, -n` | Name for output theme | "Christen your creation..." |
| `--force, -f` | Overwrite existing files | "Channel greater power to overwrite..." |
| `--verbose, -v` | Detailed output | "Reveal the intricate workings..." |
| `--quiet, -q` | Minimal output | "Work in silence..." |
| `--dry-run` | Preview without writing | "Practice the weaving without manifesting..." |
| `--config, -c` | Custom config file | "Use an alternate incantation..." |
| `--help, -h` | Show help | "Seek guidance from the ancient texts..." |

---

## Output Messages

### Success Messages
```
✨ Theme successfully woven!
🔮 Essence extracted: 12 colors channeled
⚡ Ritual complete: 5 themes woven
🌟 Theme attuned: No dissonance detected
🎨 Colors manifested into [filename]
```

### Progress Messages
```
🔄 Weaving threads of color...
📖 Reading from source grimoire...
🎭 Channeling color essence...
⚗️ Transmuting syntax tokens...
🔗 Binding theme to workspace...
```

### Warning Messages
```
⚠️  Dissonance detected in color harmony
⚠️  Source grimoire incomplete, improvising...
⚠️  Some colors could not be channeled precisely
⚠️  Theme may require manual attunement
```

### Error Messages
```
❌ Unable to parse source grimoire
❌ Weaving failed: insufficient color data
❌ Ritual interrupted: invalid configuration
❌ Cannot bind theme: workspace not found
```

### Info Messages
```
ℹ️  Consulting color mappings...
ℹ️  12 colors discovered in the essence
ℹ️  Theme contains light and dark variants
ℹ️  Custom incantation detected
```

---

## UI Text & Labels

### VS Code Extension

**Command Palette Commands:**
- "Chromamancer: Weave Theme to Obsidian"
- "Chromamancer: Scry Current Theme"
- "Chromamancer: Bind Theme to Workspace"
- "Chromamancer: Extract Color Essence"
- "Chromamancer: Open Spellbook (Settings)"

**Settings Labels:**
- "Default Weaving Format"
- "Auto-Attune After Weaving"
- "Preserve Original Grimoire"
- "Custom Incantation Path"
- "Ritual Output Directory"

**Status Bar:**
- "✨ Chromamancer Ready"
- "🔄 Weaving..."
- "✅ Theme Woven"

### Web Interface

**Page Titles:**
- "Chromamancer - Master of Theme Magic"
- "Weave Your Themes"
- "The Color Grimoire"

**Button Labels:**
- "Begin Weaving"
- "Scry Preview"
- "Download Woven Theme"
- "Extract Essence"
- "View Grimoire"

**Section Headers:**
- "Source Grimoire"
- "Woven Creation"
- "Color Essence"
- "Incantation Settings"

---

## Documentation Voice

### README Example

```markdown
# Chromamancer ✨

> Master the arcane art of theme transformation

Chromamancer is a powerful tool for weaving themes between VS Code and Obsidian. 
As a Chromamancer, you command the magic of color, transforming themes from one 
realm to another with precision and craft.

## Installation

Summon Chromamancer to your system:

\`\`\`bash
npm install -g chromamancer
\`\`\`

## Quick Start

Weave your first theme:

\`\`\`bash
chromamancer weave dracula.json --output obsidian
\`\`\`

The woven theme will manifest in your current directory.
```

### Tutorial Voice

**Good:**
> "Let's begin by weaving a simple theme. First, we'll extract the color essence 
> from your VS Code theme, then channel that essence into an Obsidian grimoire."

**Avoid:**
> "Hark! Ye must first conjure forth the chromatic essences from thy Visual Studio 
> Code scrolls, whereupon thou shalt transmute them into the sacred texts of 
> Obsidian!" ❌ (too overwrought)

---

## Visual Identity

### Colors
- **Primary:** Deep purple/violet (#8B5CF6) - represents arcane magic
- **Secondary:** Cyan/turquoise (#06B6D4) - represents the weaving process
- **Accent:** Gold (#F59E0B) - represents mastery and success

### Emoji Usage
Use sparingly but consistently:
- ✨ Success, completion
- 🔮 Preview, scrying
- ⚡ Power, force operations
- 🎨 Colors, palettes
- 📖 Grimoires, documentation
- 🔄 Processing, in progress
- ⚠️  Warnings
- ❌ Errors

### Logo Concept
A wizard's hat made of overlapping color swatches, or a mystical color wheel with arcane symbols.

---

## Example Interactions

### CLI Session
```bash
$ chromamancer weave dracula.json

🔄 Weaving threads of color...
📖 Reading from source grimoire...
🎭 Channeling color essence...
   • Background: #282a36
   • Foreground: #f8f8f2
   • Accent: #bd93f9
   [... 9 more colors]
⚗️ Transmuting 47 syntax tokens...
✨ Theme successfully woven!

📄 Woven grimoire: dracula-woven.css
💡 Use 'chromamancer scry dracula-woven.css' to preview
```

### VS Code Extension
```
User: Opens command palette
Searches: "chromamancer"

Options shown:
  ✨ Chromamancer: Weave Theme to Obsidian
  🔮 Chromamancer: Scry Current Theme  
  🎨 Chromamancer: Extract Color Essence
  
User: Selects "Weave Theme to Obsidian"

Notification appears:
  "🔄 Weaving your theme..."
  
Success notification:
  "✨ Theme woven! vampire-dark.css created in your workspace."
  [Open File] [Bind to Workspace]
```

---

## Brand Do's and Don'ts

### Do:
✅ Use magical terminology consistently  
✅ Make technical processes clear despite magical framing  
✅ Empower users to feel like skilled mages  
✅ Keep the tone light and fun  
✅ Use visual indicators (emoji, colors) to enhance meaning  

### Don't:
❌ Use archaic language ("thee," "thou," "hark")  
❌ Make the magic metaphor interfere with usability  
❌ Overuse emoji or magical terminology  
❌ Be condescending or overly whimsical  
❌ Sacrifice clarity for flavor  

---

## Localization Notes

When translating Chromamancer:
- Preserve the magical theme in target language
- "Weave" should translate to equivalent magical transformation term
- "Grimoire" can be "spellbook," "tome," or local equivalent
- Emoji usage is universal
- Technical terms (VS Code, Obsidian) remain unchanged

---

## Community Voice

### GitHub Issues/Discussions
- Maintain professional but playful tone
- Use magical terminology in titles when appropriate
- Example: "Bug: Weaving fails with dark themes" is fine
- Example: "The incantation seems broken for syntax highlighting" is fun but clear

### Social Media
- Hashtags: #Chromamancer #ThemeMagic #VSCode #Obsidian
- Sample post: "✨ Just released Chromamancer v1.0! Weave your VS Code themes into Obsidian with a single command. The magic of theme transformation is now in your hands! 🔮"

---

## Changelog

- **2024-12-30:** Initial brand guide created for Chromamancer