/**
 * VS Code Theme Type Definitions
 * Based on: https://code.visualstudio.com/api/references/theme-color
 */

/**
 * A VS Code theme can be 'dark', 'light', or 'hc' (high contrast)
 */
export type ThemeType = 'dark' | 'light' | 'hc';

/**
 * Color value in hex format (e.g., "#ff0000" or "#ff0000ff" with alpha)
 */
export type ColorHex = string;

/**
 * TextMate token scope (e.g., "comment", "string.quoted")
 */
export type TokenScope = string | string[];

/**
 * Font style for syntax highlighting
 */
export type FontStyle = 'bold' | 'italic' | 'underline' | 'strikethrough' | '';

/**
 * Individual token color rule
 */
export interface TokenColor {
  name?: string;
  scope: TokenScope;
  settings: {
    foreground?: ColorHex;
    background?: ColorHex;
    fontStyle?: FontStyle;
  };
}

/**
 * Semantic token colors (optional, more advanced)
 */
export interface SemanticTokenColors {
  [key: string]: ColorHex | {
    foreground?: ColorHex;
    background?: ColorHex;
    fontStyle?: FontStyle;
  };
}

/**
 * Main VS Code theme structure
 */
export interface VSCodeTheme {
  // Metadata
  name?: string;
  type?: ThemeType;
  
  // Semantic highlighting (optional)
  semanticHighlighting?: boolean;
  semanticTokenColors?: SemanticTokenColors;
  
  // UI Colors - Core editor
  colors?: {
    // === EDITOR ===
    'editor.background'?: ColorHex;
    'editor.foreground'?: ColorHex;
    'editorLineNumber.foreground'?: ColorHex;
    'editorLineNumber.activeForeground'?: ColorHex;
    'editorCursor.foreground'?: ColorHex;
    
    // Selection
    'editor.selectionBackground'?: ColorHex;
    'editor.selectionHighlightBackground'?: ColorHex;
    'editor.inactiveSelectionBackground'?: ColorHex;
    'editor.lineHighlightBackground'?: ColorHex;
    'editor.lineHighlightBorder'?: ColorHex;
    
    // Find/Search
    'editor.findMatchBackground'?: ColorHex;
    'editor.findMatchHighlightBackground'?: ColorHex;
    'editor.findRangeHighlightBackground'?: ColorHex;
    
    // === SIDEBAR ===
    'sideBar.background'?: ColorHex;
    'sideBar.foreground'?: ColorHex;
    'sideBar.border'?: ColorHex;
    'sideBarTitle.foreground'?: ColorHex;
    'sideBarSectionHeader.background'?: ColorHex;
    'sideBarSectionHeader.foreground'?: ColorHex;
    
    // === ACTIVITY BAR ===
    'activityBar.background'?: ColorHex;
    'activityBar.foreground'?: ColorHex;
    'activityBar.inactiveForeground'?: ColorHex;
    'activityBar.border'?: ColorHex;
    'activityBarBadge.background'?: ColorHex;
    'activityBarBadge.foreground'?: ColorHex;
    
    // === STATUS BAR ===
    'statusBar.background'?: ColorHex;
    'statusBar.foreground'?: ColorHex;
    'statusBar.border'?: ColorHex;
    'statusBar.debuggingBackground'?: ColorHex;
    'statusBar.debuggingForeground'?: ColorHex;
    'statusBar.noFolderBackground'?: ColorHex;
    
    // === TITLE BAR ===
    'titleBar.activeBackground'?: ColorHex;
    'titleBar.activeForeground'?: ColorHex;
    'titleBar.inactiveBackground'?: ColorHex;
    'titleBar.inactiveForeground'?: ColorHex;
    'titleBar.border'?: ColorHex;
    
    // === TABS ===
    'tab.activeBackground'?: ColorHex;
    'tab.activeForeground'?: ColorHex;
    'tab.inactiveBackground'?: ColorHex;
    'tab.inactiveForeground'?: ColorHex;
    'tab.border'?: ColorHex;
    'tab.activeBorder'?: ColorHex;
    'tab.activeBorderTop'?: ColorHex;
    
    // === PANEL ===
    'panel.background'?: ColorHex;
    'panel.border'?: ColorHex;
    'panelTitle.activeBorder'?: ColorHex;
    'panelTitle.activeForeground'?: ColorHex;
    'panelTitle.inactiveForeground'?: ColorHex;
    
    // === INPUTS ===
    'input.background'?: ColorHex;
    'input.foreground'?: ColorHex;
    'input.border'?: ColorHex;
    'input.placeholderForeground'?: ColorHex;
    'inputOption.activeBorder'?: ColorHex;
    'inputValidation.errorBackground'?: ColorHex;
    'inputValidation.errorBorder'?: ColorHex;
    
    // === BUTTONS ===
    'button.background'?: ColorHex;
    'button.foreground'?: ColorHex;
    'button.hoverBackground'?: ColorHex;
    'button.secondaryBackground'?: ColorHex;
    'button.secondaryForeground'?: ColorHex;
    'button.secondaryHoverBackground'?: ColorHex;
    
    // === DROPDOWNS ===
    'dropdown.background'?: ColorHex;
    'dropdown.foreground'?: ColorHex;
    'dropdown.border'?: ColorHex;
    'dropdown.listBackground'?: ColorHex;
    
    // === LISTS ===
    'list.activeSelectionBackground'?: ColorHex;
    'list.activeSelectionForeground'?: ColorHex;
    'list.inactiveSelectionBackground'?: ColorHex;
    'list.inactiveSelectionForeground'?: ColorHex;
    'list.hoverBackground'?: ColorHex;
    'list.hoverForeground'?: ColorHex;
    'list.focusBackground'?: ColorHex;
    'list.focusForeground'?: ColorHex;
    'list.highlightForeground'?: ColorHex;
    
    // === LINKS ===
    'textLink.foreground'?: ColorHex;
    'textLink.activeForeground'?: ColorHex;
    
    // === BORDERS ===
    'contrastBorder'?: ColorHex;
    'contrastActiveBorder'?: ColorHex;
    'focusBorder'?: ColorHex;
    
    // === TERMINAL ===
    'terminal.background'?: ColorHex;
    'terminal.foreground'?: ColorHex;
    'terminal.ansiBlack'?: ColorHex;
    'terminal.ansiRed'?: ColorHex;
    'terminal.ansiGreen'?: ColorHex;
    'terminal.ansiYellow'?: ColorHex;
    'terminal.ansiBlue'?: ColorHex;
    'terminal.ansiMagenta'?: ColorHex;
    'terminal.ansiCyan'?: ColorHex;
    'terminal.ansiWhite'?: ColorHex;
    'terminal.ansiBrightBlack'?: ColorHex;
    'terminal.ansiBrightRed'?: ColorHex;
    'terminal.ansiBrightGreen'?: ColorHex;
    'terminal.ansiBrightYellow'?: ColorHex;
    'terminal.ansiBrightBlue'?: ColorHex;
    'terminal.ansiBrightMagenta'?: ColorHex;
    'terminal.ansiBrightCyan'?: ColorHex;
    'terminal.ansiBrightWhite'?: ColorHex;
    
    // === GIT DECORATIONS ===
    'gitDecoration.addedResourceForeground'?: ColorHex;
    'gitDecoration.modifiedResourceForeground'?: ColorHex;
    'gitDecoration.deletedResourceForeground'?: ColorHex;
    'gitDecoration.untrackedResourceForeground'?: ColorHex;
    'gitDecoration.ignoredResourceForeground'?: ColorHex;
    'gitDecoration.conflictingResourceForeground'?: ColorHex;
    
    // === DIFF EDITOR ===
    'diffEditor.insertedTextBackground'?: ColorHex;
    'diffEditor.removedTextBackground'?: ColorHex;
    
    // === EDITOR ERRORS/WARNINGS ===
    'editorError.foreground'?: ColorHex;
    'editorWarning.foreground'?: ColorHex;
    'editorInfo.foreground'?: ColorHex;
    'editorHint.foreground'?: ColorHex;
    
    // Allow any additional color keys (VS Code has hundreds)
    [key: string]: ColorHex | undefined;
  };
  
  // Syntax highlighting
  tokenColors?: TokenColor[];
}

/**
 * Parsed VS Code theme with metadata
 */
export interface ParsedVSCodeTheme extends VSCodeTheme {
  // Ensure required fields
  name: string;
  type: ThemeType;
  
  // Metadata from parsing
  source?: string; // Original file path
  parsedAt?: Date;
}