import React, { useState } from 'react';
import FileUploader from './components/fileUpload';
import ProgressBar from './components/compressedFileDownload';
import { uploadFile } from './services/api';
import '../src/index.css';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const handleCompress = async () => {
    if (!file) return;
    setUploadProgress(0);
    setCompressedFile(null);

    try {
      const url = await uploadFile(file, setUploadProgress);
      setCompressedFile(url);
      setMessage('File compressed successfully!');
    } catch (error) {
      setMessage('Error compressing file.');
    }
  };

  return (
    <div className="container">
      <h1>🚀 File Compression App</h1>
      <FileUploader onFileSelected={setFile} />
      <button onClick={handleCompress} disabled={!file}>Compress File</button>
      {uploadProgress > 0 && <ProgressBar progress={uploadProgress} />}
      {compressedFile && <a href={compressedFile} download="compressed.zip">Download ZIP</a>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
