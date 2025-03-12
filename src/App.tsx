import React, { useState } from 'react';
import FileUploader from './components/fileUpload';
import ProgressBar from './components/progresssBar';
import { uploadFile } from './services/api';
import './index.css';
import './components/styles/fileUpload.css'


const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [compressionProgress, setCompressionProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [stage, setStage] = useState<'idle' | 'uploading' | 'compressing' | 'completed' | 'error'>('idle');

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setMessage(`File "${selectedFile.name}" selected (${formatFileSize(selectedFile.size)})`);
    setCompressedFile(null);
    setUploadProgress(0);
    setCompressionProgress(0);
    setStage('idle');
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleCompress = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setUploadProgress(0);
    setCompressionProgress(0);
    setCompressedFile(null);
    setStage('uploading');
    setMessage(`Uploading "${file.name}"...`);
    
    try {
      // Track upload progress
      const trackUploadProgress = (progress: number) => {
        setUploadProgress(progress);
        if (progress >= 100) {
          setStage('compressing');
          setMessage(`Compressing "${file.name}"...`);
          
          // Simulate compression progress after upload is complete
          let compressionPct = 0;
          const interval = setInterval(() => {
            compressionPct += 5;
            setCompressionProgress(compressionPct);
            
            if (compressionPct >= 100) {
              clearInterval(interval);
              setStage('completed');
              setMessage('File compressed successfully!');
            }
          }, 150);
        }
      };
      
      // Using your API function to upload and compress the file
      const url = await uploadFile(file, trackUploadProgress);
      setCompressedFile(url);
      setStage('completed');
      setMessage('');
    } catch (error) {
      console.error('Compression error:', error);
      setStage('error');
      setMessage('Error processing file. Please check if your API server is running at https://compressbysammy.onrender.com.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container">
      <h1>🚀 File Compression App</h1>
      <p>Select a file or folder to compress</p>
      
      <FileUploader onFileSelected={handleFileSelect} />
      
      <button 
        onClick={handleCompress} 
        disabled={!file || isProcessing}
        className={isProcessing ? 'processing' : ''}
      >
        {isProcessing ? 'Processing...' : 'Compress File'}
      </button>
      
      {stage === 'uploading' && (
        <div className="progress-section">
          <h3>Upload Progress</h3>
          <ProgressBar progress={uploadProgress} label="Uploading" />
        </div>
      )}
      
      {stage === 'compressing' && (
        <div className="progress-section">
          <h3>Compression Progress</h3>
          <ProgressBar progress={compressionProgress} label="Compressing" />
        </div>
      )}
      
      {stage === 'completed' && compressedFile && (
        <div className="download-container">
          <div className="success-message">
            <span className="success-icon">✅</span>
            <span>Compression completed successfully!</span>
          </div>
          <a href={compressedFile} download="compressed.zip" className="download-button">
            Download Compressed File
          </a>
        </div>
      )}
      
      {message && <p className={`message ${stage === 'error' ? 'error' : ''}`}>{message}</p>}
    </div>
  );
};

export default App;