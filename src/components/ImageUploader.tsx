import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (imageFile: File) => void;
  onResult: (result: any) => void;  // result dari backend
  setIsLoading: (loading: boolean) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, onResult, setIsLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    onImageSelected(file);
    uploadToBackend(file);
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewImage(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      <div
        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive 
            ? 'border-blue-600 bg-blue-50' 
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
        } ${previewImage ? 'h-auto' : 'h-64'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={previewImage ? undefined : triggerFileInput}
      >
        {previewImage ? (
          <div className="relative w-full">
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
            >
              <X size={20} className="text-gray-600" />
            </button>
            <img
              src={previewImage}
              alt="Uploaded dental X-ray"
              className="max-h-[400px] rounded-lg mx-auto"
            />
          </div>
        ) : (
          <>
            <Upload size={48} className="text-gray-400 mb-4" />
            <p className="text-gray-700 font-medium mb-2">Upload Dental X-ray</p>
            <p className="text-gray-500 text-sm text-center max-w-xs">
              Drag and drop your image here, or click to browse
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Supported formats: JPG, PNG, TIFF
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
