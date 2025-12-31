/**
 * Obsidian CSS Generator
 * Generates Obsidian theme CSS from color palettes
 */

import type {
  ColorPalette,
  ExtractedColorPalette,
  GeneratedObsidianCSS,
  GenerateOptions,
  ThemeType,
} from '../types/index';
import { lighten, darken, setAlpha } from '../utils/color-utils.js';

/**
 * Generate Obsidian CSS from a color palette
 */
export function generateObsidianCSS(
  palette: ColorPalette | ExtractedColorPalette,
  themeType: ThemeType,
  options: GenerateOptions = {}
): GeneratedObsidianCSS {
  const {
    themeName = 'Generated Theme',
    author = 'Chromamancer',
    version = '1.0.0',
    includeComments = true,
  } = options;
  
  const warnings: string[] = [];
  const generated: string[] = [];
  
  // Build CSS parts
  const parts: string[] = [];
  
  // Add header comment
  if (includeComments) {
    parts.push(generateHeader(themeName, author, version));
  }
  
  // Generate theme-specific variables
  const themeClass = themeType === 'light' ? '.theme-light' : '.theme-dark';
  const variables = generateVariables(
    palette,
    themeType,
    generated,
    includeComments
  );
  
  parts.push(`${themeClass} {`);
  parts.push(variables);
  parts.push('}');
  
  // Generate syntax highlighting
  if (includeComments) {
    parts.push('\n/* === Syntax Highlighting === */');
  }
  
  const syntax = generateSyntaxHighlighting(palette);
  parts.push(syntax);
  
  const css = parts.join('\n');
  
  return {
    css,
    metadata: {
      generatedAt: new Date(),
      sourceTheme: themeName,
      themeType: themeType === 'hc' ? 'dark' : themeType,
      variablesCount: countVariables(variables),
    },
    warnings: warnings.length > 0 ? warnings : undefined,
    generated: generated.length > 0 ? generated : undefined,
  };
}

/**
 * Generate header comment block
 */
function generateHeader(
  name: string,
  author: string,
  version: string
): string {
  return `/*
    Theme: ${name}
    Author: ${author}
    Version: ${version}
    Generated: ${new Date().toISOString()}
    Generator: Chromamancer
    */
  `;
}

/**
 * Generate CSS variables for the theme
 */
function generateVariables(
  palette: ColorPalette,
  themeType: ThemeType,
  generated: string[],
  includeComments: boolean
): string {
  const isDark = themeType === 'dark' || themeType === 'hc';
  const lines: string[] = [];
  
  // === BACKGROUNDS ===
  if (includeComments) {
    lines.push('  /* === Backgrounds === */');
  }
  lines.push(`  --background-primary: ${palette.backgroundPrimary};`);
  lines.push(`  --background-primary-alt: ${lighten(palette.backgroundPrimary, isDark ? 0.05 : -0.05)};`);
  lines.push(`  --background-secondary: ${palette.backgroundSecondary};`);
  lines.push(`  --background-secondary-alt: ${lighten(palette.backgroundSecondary, isDark ? 0.05 : -0.05)};`);
  
  generated.push('--background-primary-alt', '--background-secondary-alt');
  
  // Background modifiers
  lines.push(`  --background-modifier-border: ${palette.ui.border};`);
  lines.push(`  --background-modifier-form-field: ${isDark ? lighten(palette.backgroundPrimary, 0.1) : darken(palette.backgroundPrimary, 0.05)};`);
  lines.push(`  --background-modifier-form-field-highlighted: ${isDark ? lighten(palette.backgroundPrimary, 0.15) : darken(palette.backgroundPrimary, 0.1)};`);
  lines.push(`  --background-modifier-box-shadow: ${setAlpha(isDark ? '#000000' : '#000000', 0.3)};`);
  lines.push(`  --background-modifier-success: ${setAlpha(palette.semantic?.success || '#388a34', 0.2)};`);
  lines.push(`  --background-modifier-error: ${setAlpha(palette.semantic?.error || '#e51400', 0.2)};`);
  lines.push(`  --background-modifier-error-hover: ${setAlpha(palette.semantic?.error || '#e51400', 0.3)};`);
  lines.push(`  --background-modifier-cover: ${setAlpha(palette.backgroundPrimary, 0.8)};`);
  lines.push(`  --background-modifier-hover: ${palette.ui.lineHighlight || lighten(palette.backgroundPrimary, isDark ? 0.1 : -0.1)};`);
  
  generated.push(
    '--background-modifier-form-field',
    '--background-modifier-form-field-highlighted',
    '--background-modifier-box-shadow',
    '--background-modifier-success',
    '--background-modifier-error',
    '--background-modifier-error-hover',
    '--background-modifier-cover',
  );
  
  // === TEXT ===
  if (includeComments) {
    lines.push('');
    lines.push('  /* === Text === */');
  }
  lines.push(`  --text-normal: ${palette.textPrimary};`);
  lines.push(`  --text-muted: ${palette.textMuted};`);
  lines.push(`  --text-faint: ${isDark ? darken(palette.textMuted, 0.2) : lighten(palette.textMuted, 0.2)};`);
  lines.push(`  --text-error: ${palette.semantic?.error || '#e51400'};`);
  lines.push(`  --text-accent: ${palette.accent};`);
  lines.push(`  --text-accent-hover: ${isDark ? lighten(palette.accent, 0.1) : darken(palette.accent, 0.1)};`);
  lines.push(`  --text-on-accent: ${isDark ? '#ffffff' : '#ffffff'};`);
  lines.push(`  --text-selection: ${palette.ui.selection};`);
  lines.push(`  --text-highlight-bg: ${palette.ui.findMatch || setAlpha(palette.accent, 0.3)};`);
  lines.push(`  --text-highlight-bg-active: ${setAlpha(palette.accent, 0.5)};`);
  
  generated.push(
    '--text-faint',
    '--text-accent-hover',
    '--text-on-accent',
    '--text-highlight-bg-active',
  );
  
  // === INTERACTIVE ===
  if (includeComments) {
    lines.push('');
    lines.push('  /* === Interactive === */');
  }
  lines.push(`  --interactive-normal: ${palette.ui.border};`);
  lines.push(`  --interactive-hover: ${isDark ? lighten(palette.ui.border, 0.1) : darken(palette.ui.border, 0.1)};`);
  lines.push(`  --interactive-accent: ${palette.accent};`);
  lines.push(`  --interactive-accent-hover: ${isDark ? lighten(palette.accent, 0.1) : darken(palette.accent, 0.1)};`);
  lines.push(`  --interactive-success: ${palette.semantic?.success || '#388a34'};`);
  
  generated.push('--interactive-hover', '--interactive-accent-hover');
  
  // === TITLE BAR ===
  if (includeComments) {
    lines.push('');
    lines.push('  /* === Title Bar === */');
  }
  lines.push(`  --titlebar-background: ${palette.backgroundPrimary};`);
  lines.push(`  --titlebar-background-focused: ${palette.backgroundPrimary};`);
  lines.push(`  --titlebar-text-color-focused: ${palette.textPrimary};`);
  lines.push(`  --titlebar-text-color-unfocused: ${palette.textMuted};`);
  
  // === CODE ===
  if (includeComments) {
    lines.push('');
    lines.push('  /* === Code === */');
  }
  lines.push(`  --code-normal: ${palette.textPrimary};`);
  lines.push(`  --code-background: ${isDark ? lighten(palette.backgroundPrimary, 0.05) : darken(palette.backgroundPrimary, 0.05)};`);
  lines.push(`  --code-comment: ${palette.syntax.comment};`);
  lines.push(`  --code-function: ${palette.syntax.function};`);
  lines.push(`  --code-keyword: ${palette.syntax.keyword};`);
  lines.push(`  --code-operator: ${palette.syntax.operator || palette.textPrimary};`);
  lines.push(`  --code-property: ${palette.syntax.variable};`);
  lines.push(`  --code-punctuation: ${palette.textMuted};`);
  lines.push(`  --code-string: ${palette.syntax.string};`);
  lines.push(`  --code-tag: ${palette.syntax.keyword};`);
  lines.push(`  --code-value: ${palette.syntax.number};`);
  
  generated.push('--code-background', '--code-punctuation');
  
  // === TABLES ===
  if (includeComments) {
    lines.push('');
    lines.push('  /* === Tables === */');
  }
  lines.push(`  --table-header-background: ${isDark ? lighten(palette.backgroundPrimary, 0.05) : darken(palette.backgroundPrimary, 0.05)};`);
  lines.push(`  --table-row-alt-background: ${isDark ? lighten(palette.backgroundPrimary, 0.02) : darken(palette.backgroundPrimary, 0.02)};`);
  lines.push(`  --table-border-color: ${palette.ui.border};`);
  
  generated.push('--table-header-background', '--table-row-alt-background');
  
  // === BLOCKQUOTES ===
  if (includeComments) {
    lines.push('');
    lines.push('  /* === Blockquotes === */');
  }
  lines.push(`  --blockquote-border: ${palette.accent};`);
  
  // === GRAPH VIEW ===
  if (includeComments) {
    lines.push('');
    lines.push('  /* === Graph View === */');
  }
  lines.push(`  --graph-node: ${palette.accent};`);
  lines.push(`  --graph-node-unresolved: ${palette.textMuted};`);
  lines.push(`  --graph-node-tag: ${palette.syntax.keyword};`);
  lines.push(`  --graph-line: ${setAlpha(palette.ui.border, 0.5)};`);
  
  generated.push('--graph-line');
  
  return lines.join('\n');
}

/**
 * Generate syntax highlighting CSS
 */
function generateSyntaxHighlighting(palette: ColorPalette): string {
  const lines: string[] = [];
  
  // Comments
  lines.push(`.cm-comment { color: ${palette.syntax.comment}; }`);
  
  // Keywords
  lines.push(`.cm-keyword { color: ${palette.syntax.keyword}; }`);
  
  // Strings
  lines.push(`.cm-string { color: ${palette.syntax.string}; }`);
  lines.push(`.cm-string-2 { color: ${palette.syntax.string}; }`);
  
  // Numbers
  lines.push(`.cm-number { color: ${palette.syntax.number}; }`);
  
  // Constants
  lines.push(`.cm-atom { color: ${palette.syntax.constant || palette.syntax.number}; }`);
  
  // Variables
  lines.push(`.cm-variable { color: ${palette.syntax.variable}; }`);
  lines.push(`.cm-variable-2 { color: ${palette.syntax.variable}; }`);
  lines.push(`.cm-variable-3 { color: ${palette.syntax.variable}; }`);
  
  // Functions
  lines.push(`.cm-def { color: ${palette.syntax.function}; }`);
  lines.push(`.cm-property { color: ${palette.syntax.variable}; }`);
  
  // Operators
  lines.push(`.cm-operator { color: ${palette.syntax.operator || palette.textPrimary}; }`);
  
  // Types
  lines.push(`.cm-type { color: ${palette.syntax.type}; }`);
  lines.push(`.cm-builtin { color: ${palette.syntax.type}; }`);
  
  // Tags (HTML/XML)
  lines.push(`.cm-tag { color: ${palette.syntax.keyword}; }`);
  lines.push(`.cm-attribute { color: ${palette.syntax.variable}; }`);
  
  // Punctuation
  lines.push(`.cm-punctuation { color: ${palette.textMuted}; }`);
  
  // Markdown
  lines.push(`.cm-header { color: ${palette.syntax.keyword}; font-weight: bold; }`);
  lines.push(`.cm-strong { font-weight: bold; }`);
  lines.push(`.cm-em { font-style: italic; }`);
  lines.push(`.cm-list { color: ${palette.syntax.keyword}; }`);
  lines.push(`.cm-quote { color: ${palette.syntax.comment}; }`);
  lines.push(`.cm-link { color: ${palette.accent}; }`);
  lines.push(`.cm-inline-code { color: ${palette.syntax.string}; }`);
  
  return lines.join('\n');
}

/**
 * Count the number of variables in a CSS string
 */
function countVariables(css: string): number {
  const matches = css.match(/--[\w-]+:/g);
  return matches ? matches.length : 0;
}