/**
 * VS Code Theme Parser
 * Reads and validates VS Code theme JSON files
 */

import { readFile } from 'node:fs/promises';
import { z } from 'zod';
import type {
  VSCodeTheme,
  ParsedVSCodeTheme,
  ParseOptions,
  ThemeType
} from '../types/index';

/**
 * Zod schema for VS Code theme validation
 */
const VSCodeThemeSchema = z.object({
  name: z.string().optional(),
  type: z.enum(['dark', 'light', 'hc']).optional(),
  semanticHighlighting: z.boolean().optional(),
  semanticTokenColors: z.record(z.any()).optional(),
  colors: z.record(z.string()).optional(),
  tokenColors: z.array(
    z.object({
      name: z.string().optional(),
      scope: z.union([z.string(), z.array(z.string())]),
      settings: z.object({
        foreground: z.string().optional(),
        background: z.string().optional(),
        fontStyle: z.string().optional(),
      }),
    })
  ).optional(),
});

/**
 * Error thrown when parsing fails
 */
export class VSCodeParseError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'VSCodeParseError';
  }
}

/**
 * Parse a VS Code theme from JSON string
 */
export function parseVSCodeThemeFromString(
  json: string,
  options: ParseOptions = {}
): ParsedVSCodeTheme {
  const { strict = false, inferType = true } = options;
  
  let rawTheme: unknown;
  
  // Parse JSON
  try {
    rawTheme = JSON.parse(json);
  } catch (error) {
    throw new VSCodeParseError(
      'Failed to parse JSON',
      error
    );
  }
  
  // Validate with Zod
  const result = VSCodeThemeSchema.safeParse(rawTheme);
  
  if (!result.success) {
    if (strict) {
      throw new VSCodeParseError(
        `Theme validation failed: ${result.error.message}`,
        result.error
      );
    }
    // In non-strict mode, we'll work with what we have
  }
  
  const theme = (result.success ? result.data : rawTheme) as VSCodeTheme;
  
  // Extract or infer required fields
  const name = theme.name || 'Unnamed Theme';
  let type: ThemeType = theme.type || 'dark';
  
  // Infer theme type if not specified
  if (inferType && !theme.type && theme.colors) {
    type = inferThemeType(theme.colors);
  }
  
  return {
    ...theme,
    name,
    type,
    parsedAt: new Date(),
  };
}

/**
 * Parse a VS Code theme from a file
 */
export async function parseVSCodeThemeFromFile(
  filePath: string,
  options: ParseOptions = {}
): Promise<ParsedVSCodeTheme> {
  try {
    const content = await readFile(filePath, 'utf-8');
    const theme = parseVSCodeThemeFromString(content, options);
    
    return {
      ...theme,
      source: filePath,
    };
  } catch (error) {
    if (error instanceof VSCodeParseError) {
      throw error;
    }
    throw new VSCodeParseError(
      `Failed to read theme file: ${filePath}`,
      error
    );
  }
}

/**
 * Infer whether a theme is dark or light based on background color
 */
function inferThemeType(colors: Record<string, string>): ThemeType {
  const background = colors['editor.background'];
  
  if (!background) {
    return 'dark'; // Default to dark if no background
  }
  
  // Parse hex color and get luminance
  const luminance = getLuminance(background);
  
  // If luminance > 0.5, it's light; otherwise dark
  return luminance > 0.5 ? 'light' : 'dark';
}

/**
 * Calculate relative luminance of a hex color
 * Based on WCAG formula: https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
function getLuminance(hex: string): number {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Handle short form (#fff -> #ffffff)
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  
  // Handle alpha channel (ignore it for luminance)
  if (hex.length === 8) {
    hex = hex.slice(0, 6);
  }
  
  // Parse RGB values
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  
  // Apply gamma correction
  const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  // Calculate luminance
  return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
}

/**
 * Get all unique colors from a theme
 */
export function extractColors(theme: VSCodeTheme): Set<string> {
  const colors = new Set<string>();
  
  // Add colors from UI
  if (theme.colors) {
    Object.values(theme.colors).forEach(color => {
      if (color) colors.add(color);
    });
  }
  
  // Add colors from token colors
  if (theme.tokenColors) {
    theme.tokenColors.forEach(token => {
      if (token.settings.foreground) {
        colors.add(token.settings.foreground);
      }
      if (token.settings.background) {
        colors.add(token.settings.background);
      }
    });
  }
  
  return colors;
}

/**
 * Get statistics about a theme
 */
export interface ThemeStats {
  name: string;
  type: ThemeType;
  colorCount: number;
  uiColorCount: number;
  tokenColorCount: number;
  hasSemanticHighlighting: boolean;
}

export function getThemeStats(theme: ParsedVSCodeTheme): ThemeStats {
  const allColors = extractColors(theme);
  const uiColors = theme.colors ? Object.keys(theme.colors).length : 0;
  const tokenColors = theme.tokenColors?.length || 0;
  
  return {
    name: theme.name,
    type: theme.type,
    colorCount: allColors.size,
    uiColorCount: uiColors,
    tokenColorCount: tokenColors,
    hasSemanticHighlighting: theme.semanticHighlighting || false,
  };
}