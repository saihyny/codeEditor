import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';

const App: React.FC = () => {
  const [files, setFiles] = useState<{ [key: string]: string }>({
    'main.js': '',
  });
  const [activeFile, setActiveFile] = useState('main.js');
  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('JavaScript');
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const addFile = () => {
    const fileName = `file-${Object.keys(files).length + 1}.js`;
    setFiles({ ...files, [fileName]: '' });
    setActiveFile(fileName);
  };

  const deleteFile = (fileName: string) => {
    if (Object.keys(files).length === 1) {
      alert('Cannot delete the only file.');
      return;
    }

    const updatedFiles = { ...files };
    delete updatedFiles[fileName];
    setFiles(updatedFiles);

    if (activeFile === fileName) {
      const nextFile = Object.keys(updatedFiles)[0];
      setActiveFile(nextFile);
      setCode(updatedFiles[nextFile]);
    }
  };

  const saveCode = () => {
    localStorage.setItem(activeFile, code);
    alert('Code saved!');
  };

  const resetCode = () => {
    setCode('');
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const formatCode = () => {
    try {
      const formattedCode = prettier.format(code, {
        parser: 'babel',
        plugins: [parserBabel],
      });
      setCode(formattedCode);
    } catch (err) {
      console.error('Error formatting code', err);
    }
  };

  useEffect(() => {
    // Load saved code from localStorage on component mount
    const savedCode = localStorage.getItem(activeFile);
    if (savedCode) {
      setCode(savedCode);
    }
  }, [activeFile]);

  return (
    <div className={`flex h-screen ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}>
      <Sidebar
        files={files}
        activeFile={activeFile}
        setActiveFile={(fileName) => {
          setActiveFile(fileName);
          setCode(files[fileName]);
        }}
        addFile={addFile}
        deleteFile={deleteFile}
      />
      <div className="flex-grow flex flex-col">
        <Toolbar
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          saveCode={saveCode}
          resetCode={resetCode}
          toggleTheme={toggleTheme}
          isDarkTheme={isDarkTheme}
          onFormatCode={formatCode} // Pass formatCode function to Toolbar
        />
        <Editor
          code={code}
          setCode={(newCode) => setFiles({ ...files, [activeFile]: newCode })}
          selectedLanguage={selectedLanguage}
          activeFile={activeFile}
          theme={isDarkTheme ? 'dark' : 'light'} // Pass the theme state
          formatCode={formatCode} // Pass formatCode function to Editor
        />
      </div>
    </div>
  );
};

export default App;
