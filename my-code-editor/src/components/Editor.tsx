import React, { useEffect } from 'react';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import Prism from 'prismjs'; // Import Prism.js
import 'prismjs/themes/prism-tomorrow.css'; // Optional: import a theme for Prism.js
import 'prismjs/components/prism-javascript.min.js'; // Import the specific language you need
// Import other languages as needed

interface EditorProps {
  code: string;
  setCode: (newCode: string) => void;
  selectedLanguage: string;
  activeFile: string;
  theme: string;
  formatCode: () => void; // Add formatCode prop
}

const Editor: React.FC<EditorProps> = ({
  code,
  setCode,
  selectedLanguage,
  activeFile,
  theme,
  formatCode,
}) => {
  
  // Highlight code on render
  useEffect(() => {
    Prism.highlightAll(); // Highlight code after rendering
  }, [code]); // Re-run effect when code changes

  return (
    <div className={`editor-container flex-grow p-4 ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
      <h3 className="text-lg mb-2">
        Editing: {activeFile} ({selectedLanguage})
      </h3>
      
      <textarea
        className={`w-full h-1/2 p-4 border rounded ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Start coding..."
      />
      
      <div className="highlighted-code mt-4">
        <pre>
          <code className={`language-${selectedLanguage.toLowerCase()}`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default Editor;

