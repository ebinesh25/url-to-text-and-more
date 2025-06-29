export interface ExtractedContent {
  title: string;
  content: string;
  url: string;
  wordCount: number;
  extractedAt: string;
}

export interface ExportOptions {
  format: 'clipboard' | 'txt' | 'html' | 'md';
  content: ExtractedContent;
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
}