/**
 * Tests for Palette Extractor
 */

import {
  describe,
  it,
  expect
} from 'vitest';
import {
  extractPalette,
  extractPaletteWithMetadata
} from '../src/utils/palette-extractor';
import type { ParsedVSCodeTheme } from '../src//types/index';

describe('extractPalette', () => {
  it('should extract palette from a complete theme', () => {
    const theme: ParsedVSCodeTheme = {
      name: 'Test Theme',
      type: 'dark',
      parsedAt: new Date(),
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'sideBar.background': '#252526',
        'sideBar.foreground': '#cccccc',
        'textLink.foreground': '#3794ff',
        'contrastBorder': '#6fc3df',
        'editor.selectionBackground': '#264f78',
        'editorError.foreground': '#f48771',
        'editorWarning.foreground': '#cca700',
      },
      tokenColors: [
        {
          scope: 'comment',
          settings: { foreground: '#6A9955' },
        },
        {
          scope: 'keyword',
          settings: { foreground: '#569cd6' },
        },
        {
          scope: 'string',
          settings: { foreground: '#ce9178' },
        },
        {
          scope: 'entity.name.function',
          settings: { foreground: '#dcdcaa' },
        },
        {
          scope: 'variable',
          settings: { foreground: '#9cdcfe' },
        },
        {
          scope: 'constant.numeric',
          settings: { foreground: '#b5cea8' },
        },
        {
          scope: 'entity.name.type',
          settings: { foreground: '#4ec9b0' },
        },
      ],
    };

    const result = extractPalette(theme);

    expect(result.palette.backgroundPrimary).toBe('#1e1e1e');
    expect(result.palette.backgroundSecondary).toBe('#252526');
    expect(result.palette.textPrimary).toBe('#d4d4d4');
    expect(result.palette.textMuted).toBe('#cccccc');
    expect(result.palette.accent).toBe('#3794ff');
    
    expect(result.palette.syntax.comment).toBe('#6A9955');
    expect(result.palette.syntax.keyword).toBe('#569cd6');
    expect(result.palette.syntax.string).toBe('#ce9178');
    expect(result.palette.syntax.function).toBe('#dcdcaa');
    
    expect(result.palette.ui.border).toBe('#6fc3df');
    expect(result.palette.ui.selection).toBe('#264f78');
    
    // With 7 token colors + several UI colors found, but operators/constants/semantic colors generated
    // This should be medium confidence (not all colors were directly found)
    expect(result.confidence.overall).toBe('medium');
  });

  it('should generate missing colors with fallbacks', () => {
    const theme: ParsedVSCodeTheme = {
      name: 'Minimal Theme',
      type: 'dark',
      parsedAt: new Date(),
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
      },
      tokenColors: [],
    };

    const result = extractPalette(theme);

    // Should have generated colors
    expect(result.palette.backgroundSecondary).toBeDefined();
    expect(result.palette.syntax.comment).toBeDefined();
    expect(result.palette.syntax.keyword).toBeDefined();
    
    // Should have warnings
    expect(result.warnings).toBeDefined();
    expect(result.warnings!.length).toBeGreaterThan(0);
    
    // Should have missing list
    expect(result.missing).toBeDefined();
    expect(result.missing!.length).toBeGreaterThan(0);
    
    // Confidence should be low
    expect(result.confidence.overall).toBe('low');
  });

  it('should handle light themes correctly', () => {
    const theme: ParsedVSCodeTheme = {
      name: 'Light Theme',
      type: 'light',
      parsedAt: new Date(),
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#000000',
      },
      tokenColors: [],
    };

    const result = extractPalette(theme);

    // Light theme should have appropriate fallbacks
    expect(result.palette.backgroundPrimary).toBe('#ffffff');
    expect(result.palette.textPrimary).toBe('#000000');
    
    // Generated colors should be appropriate for light theme
    expect(result.palette.syntax.comment).toBe('#6a737d'); // Light theme comment
  });

  it('should track confidence levels correctly', () => {
    const theme: ParsedVSCodeTheme = {
      name: 'Test',
      type: 'dark',
      parsedAt: new Date(),
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'sideBar.background': '#252526',
      },
      tokenColors: [
        {
          scope: 'comment',
          settings: { foreground: '#6A9955' },
        },
      ],
    };

    const result = extractPalette(theme);

    // Should have high confidence for found colors
    expect(result.confidence.details.backgroundPrimary).toBe('high');
    expect(result.confidence.details.backgroundSecondary).toBe('high');
    expect(result.confidence.details.comment).toBe('high');
    
    // Should have generated confidence for missing colors
    expect(result.confidence.details.keyword).toBe('generated');
  });
});

describe('extractPaletteWithMetadata', () => {
  it('should include extraction metadata', () => {
    const theme: ParsedVSCodeTheme = {
      name: 'Test Theme',
      type: 'dark',
      parsedAt: new Date(),
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
      },
      tokenColors: [],
    };

    const result = extractPaletteWithMetadata(theme);

    expect(result.metadata.themeName).toBe('Test Theme');
    expect(result.metadata.themeType).toBe('dark');
    expect(result.metadata.extractedAt).toBeInstanceOf(Date);
    expect(result.metadata.stats.total).toBeGreaterThan(0);
    expect(result.metadata.stats.found).toBeGreaterThan(0);
    expect(result.metadata.stats.generated).toBeGreaterThan(0);
  });
});