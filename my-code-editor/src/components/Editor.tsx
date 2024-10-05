import React, { useEffect } from 'react';
import Prism from 'prismjs'; 
import 'prismjs/themes/prism-tomorrow.css'; 
import 'prismjs/components/prism-javascript.min.js'; 

interface EditorProps {
  code: string;
  setCode: (newCode: string) => void;
  selectedLanguage: string;
  activeFile: string;
  theme: string;
}

const Editor: React.FC<EditorProps> = ({
  code,
  setCode,
  selectedLanguage,
  activeFile,
  theme,
}) => {
  
  useEffect(() => {
    Prism.highlightAll(); 
  }, [code]); 

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
