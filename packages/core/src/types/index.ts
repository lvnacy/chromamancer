/**
 * Core type definitions for Chromamancer
 */

// Brand configuration types
export type {
  BrandTheme,
  BrandTone,
  BrandCommands,
  BrandTerminology,
  BrandMessages,
  BrandEmoji,
  BrandColors,
  BrandConfig,
  ValidatedBrandConfig,
} from './brand';

// Color palette types
export type {
  ColorPalette,
  ConfidenceLevel,
  ColorWithMetadata,
  ExtractedColorPalette,
  ColorExtractionResult,
} from './color-palette';

// Generators types
export type {
  GenerateOptions,
} from './generator-options';

// Obsidian theme types
export type {
  CSSVariable,
  CSSColor,
  ObsidianThemeVariables,
  CodeMirrorClasses,
  ObsidianTheme,
  GeneratedObsidianCSS,
} from './obsidian-theme';

// Parser options
export type {
  ParseOptions
} from './parser-options';

// VS Code theme types
export type {
  ThemeType,
  ColorHex,
  TokenScope,
  FontStyle,
  TokenColor,
  SemanticTokenColors,
  VSCodeTheme,
  ParsedVSCodeTheme,
} from './vscode-theme';