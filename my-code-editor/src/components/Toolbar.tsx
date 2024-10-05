import React from 'react';

interface ToolbarProps {
  saveCode: () => void;
  resetCode: () => void;
  formatCode: () => void; // Add formatCode prop
  toggleTheme: () => void;
  isDarkTheme: boolean;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  saveCode,
  resetCode,
  formatCode, // Include formatCode prop
  toggleTheme,
  isDarkTheme,
  selectedLanguage,
  setSelectedLanguage,
}) => {
  return (
    <div className="flex justify-between p-4 bg-gray-200 dark:bg-gray-700">
      <div>
        <button
          onClick={saveCode}
          className="mr-4 p-2 bg-green-500 text-white rounded"
        >
          Save
        </button>
        <button
          onClick={resetCode}
          className="mr-4 p-2 bg-red-500 text-white rounded"
        >
          Reset
        </button>
        <button
          onClick={formatCode}
          className="p-2 mr-4 bg-blue-500 text-white rounded"
        >
          Format Code
        </button>

        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="p-2 bg-white dark:bg-gray-600 text-black dark:text-white rounded"
        >
          <option value="JavaScript">JavaScript</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
        </select>
      </div>
      <div>
        <button
          onClick={toggleTheme}
          className="p-2 bg-purple-500 text-white rounded"
        >
          {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
