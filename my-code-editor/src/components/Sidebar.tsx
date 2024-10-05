import React from 'react';

interface SidebarProps {
  files: { [key: string]: string };
  activeFile: string;
  setActiveFile: (fileName: string) => void;
  addFile: () => void;
  deleteFile: (fileName: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  files,
  activeFile,
  setActiveFile,
  addFile,
  deleteFile,
}) => {
  return (
    <div className="w-1/4 bg-gray-700 h-full p-4">
      {/* Header for File Management */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg">Files</h2>
        <button
          onClick={addFile}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          New File
        </button>
      </div>

      {/* File List */}
      <ul className="text-white">
        {Object.keys(files).map((fileName) => (
          <li
            key={fileName}
            className={`p-2 mb-2 cursor-pointer ${
              fileName === activeFile ? 'bg-blue-500' : 'bg-gray-800'
            } rounded flex justify-between items-center`}
            onClick={() => setActiveFile(fileName)}
          >
            {fileName}
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteFile(fileName);
              }}
              className="ml-4 text-red-400 hover:text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
