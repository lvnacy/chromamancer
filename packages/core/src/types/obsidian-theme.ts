/**
 * Obsidian Theme Type Definitions
 * Based on: https://docs.obsidian.md/Reference/CSS+variables/CSS+variables
 */

import type { ColorHex } from './vscode-theme.js';

/**
 * Obsidian CSS custom property (variable)
 */
export type CSSVariable = `--${string}`;

/**
 * CSS color value (hex, rgb, rgba, hsl, hsla, or var())
 */
export type CSSColor = ColorHex | string;

/**
 * Obsidian theme variables organized by category
 */
export interface ObsidianThemeVariables {
  // === BACKGROUNDS ===
  '--background-primary'?: CSSColor;
  '--background-primary-alt'?: CSSColor;
  '--background-secondary'?: CSSColor;
  '--background-secondary-alt'?: CSSColor;
  '--background-modifier-border'?: CSSColor;
  '--background-modifier-form-field'?: CSSColor;
  '--background-modifier-form-field-highlighted'?: CSSColor;
  '--background-modifier-box-shadow'?: CSSColor;
  '--background-modifier-success'?: CSSColor;
  '--background-modifier-error'?: CSSColor;
  '--background-modifier-error-hover'?: CSSColor;
  '--background-modifier-cover'?: CSSColor;
  '--background-modifier-hover'?: CSSColor;
  
  // === TEXT ===
  '--text-normal'?: CSSColor;
  '--text-muted'?: CSSColor;
  '--text-faint'?: CSSColor;
  '--text-error'?: CSSColor;
  '--text-accent'?: CSSColor;
  '--text-accent-hover'?: CSSColor;
  '--text-on-accent'?: CSSColor;
  '--text-selection'?: CSSColor;
  '--text-highlight-bg'?: CSSColor;
  '--text-highlight-bg-active'?: CSSColor;
  
  // === INTERACTIVE ===
  '--interactive-normal'?: CSSColor;
  '--interactive-hover'?: CSSColor;
  '--interactive-accent'?: CSSColor;
  '--interactive-accent-hover'?: CSSColor;
  '--interactive-success'?: CSSColor;
  
  // === TITLE BAR ===
  '--titlebar-background'?: CSSColor;
  '--titlebar-background-focused'?: CSSColor;
  '--titlebar-text-color-focused'?: CSSColor;
  '--titlebar-text-color-unfocused'?: CSSColor;
  
  // === CODE ===
  '--code-normal'?: CSSColor;
  '--code-background'?: CSSColor;
  '--code-comment'?: CSSColor;
  '--code-function'?: CSSColor;
  '--code-keyword'?: CSSColor;
  '--code-operator'?: CSSColor;
  '--code-property'?: CSSColor;
  '--code-punctuation'?: CSSColor;
  '--code-string'?: CSSColor;
  '--code-tag'?: CSSColor;
  '--code-value'?: CSSColor;
  
  // === TABLES ===
  '--table-header-background'?: CSSColor;
  '--table-row-alt-background'?: CSSColor;
  '--table-border-color'?: CSSColor;
  
  // === BLOCKQUOTES ===
  '--blockquote-border'?: CSSColor;
  
  // === GRAPH VIEW ===
  '--graph-node'?: CSSColor;
  '--graph-node-unresolved'?: CSSColor;
  '--graph-node-tag'?: CSSColor;
  '--graph-line'?: CSSColor;
  
  // Allow any additional CSS variables
  [key: CSSVariable]: CSSColor | undefined;
}

/**
 * CodeMirror syntax highlighting classes
 */
export interface CodeMirrorClasses {
  '.cm-comment'?: CSSColor;
  '.cm-keyword'?: CSSColor;
  '.cm-string'?: CSSColor;
  '.cm-string-2'?: CSSColor;
  '.cm-number'?: CSSColor;
  '.cm-atom'?: CSSColor;
  '.cm-variable'?: CSSColor;
  '.cm-variable-2'?: CSSColor;
  '.cm-variable-3'?: CSSColor;
  '.cm-def'?: CSSColor;
  '.cm-property'?: CSSColor;
  '.cm-operator'?: CSSColor;
  '.cm-type'?: CSSColor;
  '.cm-builtin'?: CSSColor;
  '.cm-tag'?: CSSColor;
  '.cm-attribute'?: CSSColor;
  '.cm-punctuation'?: CSSColor;
  '.cm-header'?: CSSColor;
  '.cm-strong'?: CSSColor;
  '.cm-em'?: CSSColor;
  '.cm-list'?: CSSColor;
  '.cm-quote'?: CSSColor;
  '.cm-link'?: CSSColor;
  '.cm-inline-code'?: CSSColor;
  '.cm-code'?: CSSColor;
  
  // Allow any additional classes
  [key: string]: CSSColor | undefined;
}

/**
 * Obsidian theme CSS structure
 */
export interface ObsidianTheme {
  // Theme metadata (in CSS comments)
  metadata?: {
    name?: string;
    author?: string;
    version?: string;
    description?: string;
  };
  
  // Variables for dark theme
  darkTheme?: ObsidianThemeVariables;
  
  // Variables for light theme
  lightTheme?: ObsidianThemeVariables;
  
  // CodeMirror syntax highlighting
  syntax?: CodeMirrorClasses;
  
  // Raw CSS rules (for advanced themes)
  customCSS?: string;
}

/**
 * Generated Obsidian CSS output
 */
export interface GeneratedObsidianCSS {
  // The actual CSS string
  css: string;
  
  // Metadata about generation
  metadata: {
    generatedAt: Date;
    sourceTheme: string;
    themeType: 'dark' | 'light' | 'both';
    variablesCount: number;
  };
  
  // Warnings or notes
  warnings?: string[];
  
  // What was auto-generated
  generated?: string[];
}