export interface FileUploadProps {
    onFileChange: (file: File) => void;
    disabled: boolean;
  }
  
  export interface CompressedFileDownloadProps {
    fileUrl: string | null;
  }
  
  export interface AppState {
    file: File | null;
    compressedFile: string | null;
    loading: boolean;
    complete: boolean;
  }