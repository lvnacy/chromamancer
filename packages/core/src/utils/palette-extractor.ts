/**
 * Color Palette Extractor
 * Extracts the essence of colors from VS Code themes
 */

import type {
  ParsedVSCodeTheme,
  ColorPalette,
  ExtractedColorPalette,
  ColorExtractionResult,
  ConfidenceLevel,
} from '../types/index';
import {
  generateColor,
  darken,
  lighten
} from './color-utils';

/**
 * Extract a color palette from a VS Code theme
 */
export function extractPalette(theme: ParsedVSCodeTheme): ColorExtractionResult {
  const colors = theme.colors || {};
  const tokenColors = theme.tokenColors || [];
  
  const warnings: string[] = [];
  const missing: string[] = [];
  const confidenceMap: Record<string, ConfidenceLevel> = {};
  
  // Helper to get color with fallback and confidence tracking
  const getColor = (
    keys: string[],
    fallback: () => string,
    name: string
  ): string => {
    for (const key of keys) {
      if (colors[key]) {
        confidenceMap[name] = 'high';
        return colors[key];
      }
    }
    
    // No direct match found
    missing.push(name);
    confidenceMap[name] = 'generated';
    warnings.push(`Generated ${name} (no direct match found)`);
    return fallback();
  };
  
  // Helper to get color from token scope
  const getTokenColor = (
    scopes: string[],
    fallback: () => string,
    name: string
  ): string => {
    for (const scope of scopes) {
      const token = tokenColors.find(t => 
        typeof t.scope === 'string' 
          ? t.scope === scope || t.scope.includes(scope)
          : t.scope.some(s => s === scope || s.includes(scope))
      );
      
      if (token?.settings.foreground) {
        confidenceMap[name] = 'high';
        return token.settings.foreground;
      }
    }
    
    missing.push(name);
    confidenceMap[name] = 'generated';
    warnings.push(`Generated ${name} from fallback`);
    return fallback();
  };
  
  // === PRIMARY COLORS ===
  
  const backgroundPrimary = getColor(
    ['editor.background'],
    () => theme.type === 'light' ? '#ffffff' : '#1e1e1e',
    'backgroundPrimary'
  );
  
  const backgroundSecondary = getColor(
    ['sideBar.background', 'panel.background', 'editorGroupHeader.tabsBackground'],
    () => theme.type === 'light' 
      ? darken(backgroundPrimary, 0.05)
      : lighten(backgroundPrimary, 0.05),
    'backgroundSecondary'
  );
  
  const textPrimary = getColor(
    ['editor.foreground', 'foreground'],
    () => theme.type === 'light' ? '#000000' : '#ffffff',
    'textPrimary'
  );
  
  const textMuted = getColor(
    ['sideBar.foreground', 'descriptionForeground', 'editorLineNumber.foreground'],
    () => theme.type === 'light'
      ? lighten(textPrimary, 0.3)
      : darken(textPrimary, 0.3),
    'textMuted'
  );
  
  const accent = getColor(
    ['textLink.foreground', 'focusBorder', 'button.background', 'activityBarBadge.background'],
    () => generateColor('accent', theme.type),
    'accent'
  );
  
  // === SYNTAX COLORS ===
  
  const comment = getTokenColor(
    ['comment', 'comment.line', 'comment.block'],
    () => theme.type === 'light' ? '#6a737d' : '#6a9955',
    'comment'
  );
  
  const keyword = getTokenColor(
    ['keyword', 'keyword.control', 'storage.type'],
    () => theme.type === 'light' ? '#d73a49' : '#c586c0',
    'keyword'
  );
  
  const string = getTokenColor(
    ['string', 'string.quoted'],
    () => theme.type === 'light' ? '#032f62' : '#ce9178',
    'string'
  );
  
  const functionColor = getTokenColor(
    ['entity.name.function', 'support.function'],
    () => theme.type === 'light' ? '#6f42c1' : '#dcdcaa',
    'function'
  );
  
  const variable = getTokenColor(
    ['variable', 'variable.other'],
    () => theme.type === 'light' ? '#24292e' : '#9cdcfe',
    'variable'
  );
  
  const number = getTokenColor(
    ['constant.numeric'],
    () => theme.type === 'light' ? '#005cc5' : '#b5cea8',
    'number'
  );
  
  const type = getTokenColor(
    ['entity.name.type', 'entity.name.class', 'support.class'],
    () => theme.type === 'light' ? '#6f42c1' : '#4ec9b0',
    'type'
  );
  
  const operator = getTokenColor(
    ['keyword.operator'],
    () => textPrimary,
    'operator'
  );
  
  const constant = getTokenColor(
    ['constant.language'],
    () => theme.type === 'light' ? '#005cc5' : '#569cd6',
    'constant'
  );
  
  // === UI COLORS ===
  
  const border = getColor(
    ['contrastBorder', 'panel.border', 'sideBar.border'],
    () => theme.type === 'light'
      ? darken(backgroundPrimary, 0.1)
      : lighten(backgroundPrimary, 0.1),
    'border'
  );
  
  const selection = getColor(
    ['editor.selectionBackground'],
    () => theme.type === 'light'
      ? darken(backgroundPrimary, 0.15)
      : lighten(backgroundPrimary, 0.15),
    'selection'
  );
  
  const lineHighlight = getColor(
    ['editor.lineHighlightBackground'],
    () => theme.type === 'light'
      ? darken(backgroundPrimary, 0.05)
      : lighten(backgroundPrimary, 0.05),
    'lineHighlight'
  );
  
  const findMatch = getColor(
    ['editor.findMatchBackground', 'editor.findMatchHighlightBackground'],
    () => generateColor('warning', theme.type),
    'findMatch'
  );
  
  // === SEMANTIC COLORS ===
  
  const error = getColor(
    ['editorError.foreground', 'errorForeground'],
    () => generateColor('error', theme.type),
    'error'
  );
  
  const warning = getColor(
    ['editorWarning.foreground', 'warningForeground'],
    () => generateColor('warning', theme.type),
    'warning'
  );
  
  const info = getColor(
    ['editorInfo.foreground', 'infoForeground'],
    () => generateColor('info', theme.type),
    'info'
  );
  
  const success = getColor(
    ['terminal.ansiGreen', 'gitDecoration.addedResourceForeground'],
    () => generateColor('success', theme.type),
    'success'
  );
  
  // === BUILD PALETTE ===
  
  const palette: ColorPalette = {
    backgroundPrimary,
    backgroundSecondary,
    textPrimary,
    textMuted,
    accent,
    syntax: {
      comment,
      keyword,
      string,
      function: functionColor,
      variable,
      number,
      type,
      operator,
      constant,
    },
    ui: {
      border,
      selection,
      lineHighlight,
      findMatch,
    },
    semantic: {
      error,
      warning,
      info,
      success,
    },
  };
  
  // Calculate confidence
  const highConfidence = Object.values(confidenceMap).filter(c => c === 'high').length;
  const total = Object.keys(confidenceMap).length;
  const confidenceRatio = highConfidence / total;
  
  let overallConfidence: ConfidenceLevel;
  if (confidenceRatio >= 0.8) {
    overallConfidence = 'high';
  } else if (confidenceRatio >= 0.5) {
    overallConfidence = 'medium';
  } else {
    overallConfidence = 'low';
  }
  
  return {
    palette,
    confidence: {
      overall: overallConfidence,
      details: confidenceMap,
    },
    warnings: warnings.length > 0 ? warnings : undefined,
    missing: missing.length > 0 ? missing : undefined,
  };
}

/**
 * Extract palette with full metadata
 */
export function extractPaletteWithMetadata(
  theme: ParsedVSCodeTheme
): ExtractedColorPalette {
  const result = extractPalette(theme);
  
  const found = Object.values(result.confidence.details).filter(
    c => c === 'high' || c === 'medium'
  ).length;
  const generated = Object.values(result.confidence.details).filter(
    c => c === 'generated'
  ).length;
  
  return {
    ...result.palette,
    metadata: {
      themeName: theme.name,
      themeType: theme.type,
      extractedAt: new Date(),
      stats: {
        found,
        generated,
        total: found + generated,
      },
    },
  };
}