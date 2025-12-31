export interface GenerateOptions {
  /** Theme name for metadata */
  themeName?: string;
  
  /** Author name */
  author?: string;
  
  /** Theme version */
  version?: string;
  
  /** Generate both light and dark variants */
  generateBoth?: boolean;
  
  /** Include custom CSS comments */
  includeComments?: boolean;
}