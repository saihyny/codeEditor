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
    alert('Code saved to local storage!'); // Display notification
  };

  const resetCode = () => {
    setCode('');
    setFiles({ ...files, [activeFile]: '' });
    localStorage.removeItem(activeFile);
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
      setFiles({ ...files, [activeFile]: formattedCode });
    } catch (err) {
      console.error('Error formatting code', err);
    }
  };

  useEffect(() => {
    // Load saved code from localStorage when the active file changes
    const savedCode = localStorage.getItem(activeFile);
    setCode(files[activeFile] || savedCode || '');
  }, [activeFile, files]);

  // Add "CTRL + S" keydown event listener to save code
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault(); // Prevent the default browser save behavior
        saveCode(); // Call saveCode function to save the current file
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener when component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [code, activeFile]); // Dependency on code and activeFile to ensure it uses the latest state

  return (
    <div className={`flex h-screen ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}>
      <Sidebar
        files={files}
        activeFile={activeFile}
        setActiveFile={(fileName) => {
          setActiveFile(fileName);
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
          formatCode={formatCode}
        />
        <Editor
          code={code}
          setCode={(newCode) => {
            setCode(newCode);
            setFiles({ ...files, [activeFile]: newCode });
          }}
          selectedLanguage={selectedLanguage}
          activeFile={activeFile}
          theme={isDarkTheme ? 'dark' : 'light'}
        />
      </div>
    </div>
  );
};

export default App;
