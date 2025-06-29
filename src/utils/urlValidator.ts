import { ValidationResult } from '../types';

export const validateUrl = (url: string): ValidationResult => {
  if (!url.trim()) {
    return {
      isValid: false,
      message: 'Please enter a URL'
    };
  }

  try {
    const urlObj = new URL(url);
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return {
        isValid: false,
        message: 'URL must start with http:// or https://'
      };
    }
    return {
      isValid: true,
      message: 'Valid URL'
    };
  } catch {
    return {
      isValid: false,
      message: 'Please enter a valid URL'
    };
  }
};