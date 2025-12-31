/**
 * Tests for Obsidian CSS Generator
 */

import {
    describe,
    it,
    expect
} from 'vitest';
import { generateObsidianCSS } from '../src/generators/obsidian-generator';
import type { ColorPalette } from '../src/types/index';

describe('generateObsidianCSS', () => {
  const mockPalette: ColorPalette = {
    backgroundPrimary: '#1e1e1e',
    backgroundSecondary: '#252526',
    textPrimary: '#d4d4d4',
    textMuted: '#858585',
    accent: '#0e639c',
    syntax: {
      comment: '#6A9955',
      keyword: '#569cd6',
      string: '#ce9178',
      function: '#dcdcaa',
      variable: '#9cdcfe',
      number: '#b5cea8',
      type: '#4ec9b0',
      operator: '#d4d4d4',
      constant: '#569cd6',
    },
    ui: {
      border: '#3c3c3c',
      selection: '#264f78',
      lineHighlight: '#2a2a2a',
      findMatch: '#515c6a',
    },
    semantic: {
      error: '#f48771',
      warning: '#cca700',
      info: '#75beff',
      success: '#89d185',
    },
  };

  it('should generate valid CSS for dark theme', () => {
    const result = generateObsidianCSS(mockPalette, 'dark');

    expect(result.css).toBeTruthy();
    expect(result.css).toContain('.theme-dark');
    expect(result.css).toContain('--background-primary');
    expect(result.css).toContain('--text-normal');
    expect(result.css).toContain('.cm-comment');
  });

  it('should generate valid CSS for light theme', () => {
    const lightPalette: ColorPalette = {
      ...mockPalette,
      backgroundPrimary: '#ffffff',
      textPrimary: '#000000',
    };

    const result = generateObsidianCSS(lightPalette, 'light');

    expect(result.css).toContain('.theme-light');
    expect(result.metadata.themeType).toBe('light');
  });

  it('should include header comment when requested', () => {
    const result = generateObsidianCSS(mockPalette, 'dark', {
      themeName: 'Test Theme',
      author: 'Test Author',
      version: '1.2.3',
      includeComments: true,
    });

    expect(result.css).toContain('Theme: Test Theme');
    expect(result.css).toContain('Author: Test Author');
    expect(result.css).toContain('Version: 1.2.3');
  });

  it('should not include comments when disabled', () => {
    const result = generateObsidianCSS(mockPalette, 'dark', {
      includeComments: false,
    });

    expect(result.css).not.toContain('/*');
    expect(result.css).not.toContain('===');
  });

  it('should use all colors from palette', () => {
    const result = generateObsidianCSS(mockPalette, 'dark');

    // Check backgrounds
    expect(result.css).toContain(mockPalette.backgroundPrimary);
    expect(result.css).toContain(mockPalette.backgroundSecondary);
    
    // Check text
    expect(result.css).toContain(mockPalette.textPrimary);
    expect(result.css).toContain(mockPalette.textMuted);
    
    // Check accent
    expect(result.css).toContain(mockPalette.accent);
    
    // Check syntax
    expect(result.css).toContain(mockPalette.syntax.comment);
    expect(result.css).toContain(mockPalette.syntax.keyword);
    expect(result.css).toContain(mockPalette.syntax.string);
  });

  it('should generate syntax highlighting rules', () => {
    const result = generateObsidianCSS(mockPalette, 'dark');

    expect(result.css).toContain('.cm-comment');
    expect(result.css).toContain('.cm-keyword');
    expect(result.css).toContain('.cm-string');
    expect(result.css).toContain('.cm-number');
    expect(result.css).toContain('.cm-variable');
    expect(result.css).toContain('.cm-def'); // functions
    expect(result.css).toContain('.cm-type');
  });

  it('should include markdown-specific rules', () => {
    const result = generateObsidianCSS(mockPalette, 'dark');

    expect(result.css).toContain('.cm-header');
    expect(result.css).toContain('.cm-strong');
    expect(result.css).toContain('.cm-em');
    expect(result.css).toContain('.cm-list');
    expect(result.css).toContain('.cm-quote');
    expect(result.css).toContain('.cm-link');
  });

  it('should include metadata', () => {
    const result = generateObsidianCSS(mockPalette, 'dark', {
      themeName: 'My Theme',
    });

    expect(result.metadata.sourceTheme).toBe('My Theme');
    expect(result.metadata.themeType).toBe('dark');
    expect(result.metadata.generatedAt).toBeInstanceOf(Date);
    expect(result.metadata.variablesCount).toBeGreaterThan(0);
  });

  it('should track generated variables', () => {
    const result = generateObsidianCSS(mockPalette, 'dark');

    expect(result.generated).toBeDefined();
    expect(result.generated!.length).toBeGreaterThan(0);
    expect(result.generated).toContain('--background-primary-alt');
    expect(result.generated).toContain('--text-faint');
  });

  it('should handle missing semantic colors', () => {
    const paletteNoSemantics: ColorPalette = {
      ...mockPalette,
      semantic: undefined,
    };

    const result = generateObsidianCSS(paletteNoSemantics, 'dark');

    // Should still generate CSS with fallback colors
    expect(result.css).toContain('--text-error');
    expect(result.css).toContain('--background-modifier-success');
    expect(result.css).toContain('--interactive-success');
  });

  it('should handle high contrast theme', () => {
    const result = generateObsidianCSS(mockPalette, 'hc');

    // Should treat as dark theme
    expect(result.css).toContain('.theme-dark');
    expect(result.metadata.themeType).toBe('dark');
  });
});