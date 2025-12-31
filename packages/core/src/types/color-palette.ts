/**
 * Color Palette Type Definitions
 * Represents the extracted essence of a theme
 */

import type { ColorHex } from './vscode-theme.js';

/**
 * Core color palette extracted from a theme
 * This is the "essence" that gets channeled between formats
 */
export interface ColorPalette {
  // === PRIMARY COLORS ===
  /** Main editor/canvas background */
  backgroundPrimary: ColorHex;
  
  /** Secondary background (sidebars, panels) */
  backgroundSecondary: ColorHex;
  
  /** Primary text color */
  textPrimary: ColorHex;
  
  /** Secondary/muted text color */
  textMuted: ColorHex;
  
  /** Accent color (links, highlights, focus) */
  accent: ColorHex;
  
  // === SYNTAX COLORS ===
  syntax: {
    /** Comments */
    comment: ColorHex;
    
    /** Keywords (if, for, class, etc.) */
    keyword: ColorHex;
    
    /** Strings and text literals */
    string: ColorHex;
    
    /** Function and method names */
    function: ColorHex;
    
    /** Variable names */
    variable: ColorHex;
    
    /** Numbers and numeric literals */
    number: ColorHex;
    
    /** Type names and class names */
    type: ColorHex;
    
    /** Operators (+, -, *, etc.) */
    operator?: ColorHex;
    
    /** Constants (true, false, null) */
    constant?: ColorHex;
  };
  
  // === UI COLORS ===
  ui: {
    /** Border color */
    border: ColorHex;
    
    /** Selection background */
    selection: ColorHex;
    
    /** Current line highlight */
    lineHighlight?: ColorHex;
    
    /** Search match highlight */
    findMatch?: ColorHex;
  };
  
  // === SEMANTIC COLORS ===
  semantic?: {
    /** Error color (red) */
    error?: ColorHex;
    
    /** Warning color (yellow/orange) */
    warning?: ColorHex;
    
    /** Info color (blue) */
    info?: ColorHex;
    
    /** Success color (green) */
    success?: ColorHex;
  };
}

/**
 * Confidence level for extracted colors
 */
export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'generated';

/**
 * Color with metadata about extraction
 */
export interface ColorWithMetadata {
  color: ColorHex;
  confidence: ConfidenceLevel;
  source?: string; // Where this color came from (e.g., "editor.background")
  generated?: boolean; // Was this color generated/inferred?
}

/**
 * Extended palette with extraction metadata
 */
export interface ExtractedColorPalette extends ColorPalette {
  metadata: {
    /** Source theme name */
    themeName: string;
    
    /** Theme type (dark/light) */
    themeType: 'dark' | 'light' | 'hc';
    
    /** When was this extracted */
    extractedAt: Date;
    
    /** How many colors were found vs generated */
    stats: {
      found: number;
      generated: number;
      total: number;
    };
  };
}

/**
 * Result of color extraction with details
 */
export interface ColorExtractionResult {
  palette: ColorPalette;
  confidence: {
    overall: ConfidenceLevel;
    details: Record<string, ConfidenceLevel>;
  };
  warnings?: string[];
  missing?: string[]; // What colors couldn't be extracted
}