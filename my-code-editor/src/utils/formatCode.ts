// utils/formatCode.ts
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';

export const formatCode = (code: string, language: string): string => {
  let formattedCode: string = code; // Initialize with original code

  if (language === 'JavaScript') {
    try {
      // Prettier's format is synchronous, so no need for async handling
      formattedCode = prettier.format(code, {
        parser: 'babel',
        plugins: [parserBabel],
      });
    } catch (error) {
      console.error('Formatting error:', error);
    }
  }

  return formattedCode;
};
