import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

type Props = {
  onFileSelected: (file: File) => void;
};

const FileUploader: React.FC<Props> = ({ onFileSelected }) => {
  const [fileName, setFileName] = useState<string>('');
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onFileSelected(file);
      setFileName(file.name);
      setIsFileSelected(true);
    }
  }, [onFileSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    noClick: false,
    noKeyboard: false,
    // Removing maxSize restriction to support large files
    // Removing accept restriction to support all file formats
  });

  // Reset file selection state if external component needs to clear it
  useEffect(() => {
    // You can add a prop like `reset` to clear the selection if needed
    // This is just a placeholder for that functionality
  }, []);

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? 'active' : ''} ${isFileSelected ? 'file-selected' : ''}`}
      style={{
        border: '2px dashed #cccccc',
        borderRadius: '4px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: isFileSelected ? '#e6ffe6' : '#fafafa',
        transition: 'background-color 0.3s ease'
      }}
    >
      <input {...getInputProps()} />
      
      {isFileSelected ? (
        <div>
          <p>Selected: <strong>{fileName}</strong></p>
          <p className="hint">(Click or drag again to replace)</p>
        </div>
      ) : (
        <div>
          <p>Drag & Drop your file or folder here, or click to select</p>
          <p className="hint">Supports all file formats and large files</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;