import axios from 'axios';

const API_URL = 'https://compressbysammy.onrender.com/api/compress';

export const uploadFile = async (file: File, onProgress: (progress: number) => void) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axios.post(API_URL, formData, {
    responseType: 'blob',
    onUploadProgress: (event) => {
      const percentCompleted = Math.round((event.loaded * 100) / (event.total || 1));
      onProgress(percentCompleted);
    },
  });
  
  return URL.createObjectURL(response.data);
};