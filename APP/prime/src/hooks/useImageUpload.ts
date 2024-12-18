import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const useImageUpload = (options = {}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.[0]) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    multiple: false,
    onDrop,
    ...options
  });

  const removeFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview("");
  };

  return {
    file,
    preview,
    isDragActive,
    getRootProps,
    getInputProps,
    removeFile
  };
};

export default useImageUpload;