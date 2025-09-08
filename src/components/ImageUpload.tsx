import React, { useState, useRef } from 'react';
import { validateFile, downscaleImage } from '../utils/imageUtils';

interface ImageUploadProps {
  onImageSelected: (dataUrl: string) => void;
  currentImage?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, currentImage }) => {
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError('');
    setIsProcessing(true);

    const validation = validateFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      setIsProcessing(false);
      return;
    }

    try {
      const dataUrl = await downscaleImage(file, 1920);
      onImageSelected(dataUrl);
    } catch (err) {
      setError('Failed to process image');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
        Upload Image
      </label>
      
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive
            ? 'border-blue-400 bg-blue-50'
            : currentImage
            ? 'border-green-300 bg-green-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {isProcessing ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Processing image...</p>
          </div>
        ) : currentImage ? (
          <div className="text-center">
            <img
              src={currentImage}
              alt="Uploaded preview"
              className="max-h-48 mx-auto rounded-lg shadow-sm mb-3"
            />
            <p className="text-sm text-green-600 mb-2">Image uploaded successfully</p>
            <button
              type="button"
              onClick={openFileDialog}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Change image
            </button>
          </div>
        ) : (
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="mt-2">
              <button
                type="button"
                onClick={openFileDialog}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Click to upload
              </button>
              <p className="text-gray-500 text-sm">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 10MB</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          className="hidden"
          accept=".png,.jpg,.jpeg"
          onChange={handleFileInput}
          aria-describedby="file-upload-description"
        />
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      
      <p id="file-upload-description" className="mt-1 text-xs text-gray-500">
        Files larger than 1920px will be automatically downscaled
      </p>
    </div>
  );
};