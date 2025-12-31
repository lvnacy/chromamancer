/**
 * Theme parsers
 */

export {
  parseVSCodeThemeFromString,
  parseVSCodeThemeFromFile,
  extractColors,
  getThemeStats,
  VSCodeParseError,
  type ParseOptions,
  type ThemeStats,
} from './vscode-parser';

// TODO: Export Obsidian parser when implemented
// export { parseObsidianThemeFromString, parseObsidianThemeFromFile } from './obsidian-parser.js';