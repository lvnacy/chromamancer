/**
 * Tests for VS Code Theme Parser
 */

import { describe, it, expect } from 'vitest';
import {
  parseVSCodeThemeFromString,
  VSCodeParseError,
  extractColors,
  getThemeStats,
} from '../src/parsers/vscode-parser';

describe('parseVSCodeThemeFromString', () => {
  it('should parse a minimal valid theme', () => {
    const json = JSON.stringify({
      name: 'Test Theme',
      type: 'dark',
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
      },
    });

    const theme = parseVSCodeThemeFromString(json);

    expect(theme.name).toBe('Test Theme');
    expect(theme.type).toBe('dark');
    expect(theme.colors?.['editor.background']).toBe('#1e1e1e');
    expect(theme.parsedAt).toBeInstanceOf(Date);
  });

  it('should handle theme without name', () => {
    const json = JSON.stringify({
      type: 'dark',
      colors: {},
    });

    const theme = parseVSCodeThemeFromString(json);

    expect(theme.name).toBe('Unnamed Theme');
    expect(theme.type).toBe('dark');
  });

  it('should infer dark theme from dark background', () => {
    const json = JSON.stringify({
      colors: {
        'editor.background': '#1e1e1e', // Dark color
      },
    });

    const theme = parseVSCodeThemeFromString(json, { inferType: true });

    expect(theme.type).toBe('dark');
  });

  it('should infer light theme from light background', () => {
    const json = JSON.stringify({
      colors: {
        'editor.background': '#ffffff', // Light color
      },
    });

    const theme = parseVSCodeThemeFromString(json, { inferType: true });

    expect(theme.type).toBe('light');
  });

  it('should parse token colors', () => {
    const json = JSON.stringify({
      name: 'Test',
      tokenColors: [
        {
          name: 'Comment',
          scope: 'comment',
          settings: {
            foreground: '#6A9955',
            fontStyle: 'italic',
          },
        },
        {
          scope: ['string', 'string.quoted'],
          settings: {
            foreground: '#ce9178',
          },
        },
      ],
    });

    const theme = parseVSCodeThemeFromString(json);

    expect(theme.tokenColors).toHaveLength(2);
    expect(theme.tokenColors?.[0].name).toBe('Comment');
    expect(theme.tokenColors?.[0].scope).toBe('comment');
    expect(theme.tokenColors?.[1].scope).toEqual(['string', 'string.quoted']);
  });

  it('should throw VSCodeParseError for invalid JSON', () => {
    const invalidJson = '{ invalid json }';

    expect(() => {
      parseVSCodeThemeFromString(invalidJson);
    }).toThrow(VSCodeParseError);
  });

  it('should handle semantic highlighting', () => {
    const json = JSON.stringify({
      name: 'Test',
      semanticHighlighting: true,
      semanticTokenColors: {
        'variable': '#9CDCFE',
        'function': '#DCDCAA',
      },
    });

    const theme = parseVSCodeThemeFromString(json);

    expect(theme.semanticHighlighting).toBe(true);
    expect(theme.semanticTokenColors?.['variable']).toBe('#9CDCFE');
  });
});

describe('extractColors', () => {
  it('should extract colors from UI and token colors', () => {
    const theme = {
      name: 'Test',
      type: 'dark' as const,
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'sideBar.background': '#252526',
      },
      tokenColors: [
        {
          scope: 'comment',
          settings: {
            foreground: '#6A9955',
          },
        },
        {
          scope: 'string',
          settings: {
            foreground: '#ce9178',
          },
        },
      ],
    };

    const colors = extractColors(theme);

    expect(colors.size).toBe(5); // 3 UI + 2 token colors
    expect(colors.has('#1e1e1e')).toBe(true);
    expect(colors.has('#6A9955')).toBe(true);
    expect(colors.has('#ce9178')).toBe(true);
  });

  it('should handle themes with no colors', () => {
    const theme = {
      name: 'Empty',
      type: 'dark' as const,
    };

    const colors = extractColors(theme);

    expect(colors.size).toBe(0);
  });

  it('should not include undefined values', () => {
    const theme = {
      name: 'Test',
      type: 'dark' as const,
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': undefined,
      },
    };

    const colors = extractColors(theme);

    expect(colors.size).toBe(1);
    expect(colors.has('#1e1e1e')).toBe(true);
    expect(colors.has('undefined')).toBe(false);
  });
});

describe('getThemeStats', () => {
  it('should return correct statistics', () => {
    const theme = {
      name: 'Test Theme',
      type: 'dark' as const,
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
        {
          scope: 'string',
          settings: { foreground: '#ce9178' },
        },
      ],
      semanticHighlighting: true,
    };

    const stats = getThemeStats(theme);

    expect(stats.name).toBe('Test Theme');
    expect(stats.type).toBe('dark');
    expect(stats.colorCount).toBe(5);
    expect(stats.uiColorCount).toBe(3);
    expect(stats.tokenColorCount).toBe(2);
    expect(stats.hasSemanticHighlighting).toBe(true);
  });

  it('should handle themes with no token colors', () => {
    const theme = {
      name: 'Minimal',
      type: 'light' as const,
      parsedAt: new Date(),
      colors: {
        'editor.background': '#ffffff',
      },
    };

    const stats = getThemeStats(theme);

    expect(stats.tokenColorCount).toBe(0);
    expect(stats.hasSemanticHighlighting).toBe(false);
  });
});