/**
 * Brand Configuration Types
 * Defines the personality and voice of the tool
 */

/**
 * Brand theme/aesthetic
 */
export type BrandTheme = 
  | 'fantasy' 
  | 'scifi' 
  | 'cyberpunk' 
  | 'retro' 
  | 'corporate' 
  | 'minimal' 
  | 'custom';

/**
 * Tone of voice for messages
 */
export type BrandTone = 
  | 'playful' 
  | 'professional' 
  | 'technical' 
  | 'minimal' 
  | 'dramatic';

/**
 * Command names for the CLI
 */
export interface BrandCommands {
  /** Convert theme (e.g., "weave" or "jack") */
  convert: string;
  
  /** Reverse convert (e.g., "unweave" or "unjack") */
  reverse: string;
  
  /** Preview theme (e.g., "scry" or "decrypt") */
  preview: string;
  
  /** Extract palette (e.g., "extract" or "distill") */
  extract: string;
  
  /** Batch process (e.g., "ritual" or "raid") */
  batch: string;
  
  /** Validate theme (e.g., "attune" or "verify") */
  validate: string;
  
  /** Bind to workspace (e.g., "bind" or "link") */
  bind: string;
}

/**
 * Terminology used throughout the tool
 */
export interface BrandTerminology {
  /** Source theme file (e.g., "grimoire" or "manifest") */
  sourceFile: string;
  
  /** Output theme file (e.g., "woven grimoire" or "ported manifest") */
  outputFile: string;
  
  /** Color palette (e.g., "essence" or "matrix") */
  colorPalette: string;
  
  /** Configuration (e.g., "incantation" or "protocol") */
  configuration: string;
  
  /** Workspace (e.g., "realm" or "sector") */
  workspace: string;
  
  /** Process/action (e.g., "weaving" or "jacking") */
  process: string;
}

/**
 * Message templates for different states
 */
export interface BrandMessages {
  /** Success messages (randomly selected) */
  success: string[];
  
  /** Progress/loading messages */
  progress: string[];
  
  /** Error messages */
  error: string[];
  
  /** Warning messages */
  warning: string[];
  
  /** Info messages */
  info: string[];
}

/**
 * Emoji/symbols used in output
 */
export interface BrandEmoji {
  success: string;
  progress: string;
  preview: string;
  error: string;
  warning: string;
  info: string;
}

/**
 * Brand color scheme
 */
export interface BrandColors {
  /** Primary brand color */
  primary: string;
  
  /** Secondary brand color */
  secondary: string;
  
  /** Accent/highlight color */
  accent: string;
}

/**
 * Complete brand configuration
 */
export interface BrandConfig {
  // === METADATA ===
  /** Brand name (e.g., "Chromamancer" or "Palette Jack") */
  name: string;
  
  /** Brand author */
  author: string;
  
  /** Brand version */
  version: string;
  
  /** Brief description */
  description: string;
  
  /** Brand theme/aesthetic */
  theme: BrandTheme;
  
  /** Tone of voice */
  tone: BrandTone;
  
  /** Brief voice guidelines */
  voiceNotes?: string;
  
  // === CONFIGURATION ===
  /** Command names */
  commands: BrandCommands;
  
  /** Terminology */
  terminology: BrandTerminology;
  
  /** Messages */
  messages: BrandMessages;
  
  /** Emoji/symbols */
  emoji: BrandEmoji;
  
  /** Colors */
  colors: BrandColors;
}

/**
 * Brand with validation metadata
 */
export interface ValidatedBrandConfig extends BrandConfig {
  validated: true;
  validatedAt: Date;
}