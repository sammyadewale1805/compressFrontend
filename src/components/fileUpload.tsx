
import { useDropzone } from 'react-dropzone';

type Props = { onFileSelected: (file: File) => void };

const FileUploader: React.FC<Props> = ({ onFileSelected }) => {
  const onDrop = (acceptedFiles: File[]) => {
    onFileSelected(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <p>Drag & Drop your file here, or click to select</p>
    </div>
  );
};

export default FileUploader;
