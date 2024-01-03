import React, { useState, useRef } from 'react';
import { Input } from '../ui/input';

const FotoFinal = ( {setFotofinal}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const selectedFile = files[0];

    if (selectedFile) {
      const reader = new FileReader();
      setFotofinal(selectedFile);
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(selectedFile);
    }

    setIsDragging(false);
  };

  const handleSquareClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <h2 className='mx-4 font-semibold'>Foto final:</h2>
      <div
        className={'border-2 mx-4 border-gray-300 h-64 flex items-center justify-center'}
        onClick={handleSquareClick}
      >
        <Input
          ref={fileInputRef}
          className="sr-only"
          id="picture-upload"
          type="file"
          onChange={handleFileChange}
        />
        {selectedImage ? (
          <img
            className="w-full h-full object-cover"
            src={selectedImage}
            alt="Uploaded Preview"
          />
        ) : (
          <div className="text-gray-500">
            <UploadIcon className="w-8 h-8 mx-auto mb-2" />
            <p className='px-4 text-center'>Hace click aca para subirla</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FotoFinal;



function UploadIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
    )
}
