'use client'
import { useRef, useState } from 'react';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Link from 'next/link';


export function CoverUpload({ setCoverImage, coverImage }) {
  const [isDragging, setIsDragging] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);
  const [cropImage, setCropImage] = useState(null);
  const cropperRef = useRef();
  const [imageLoaded, setImageLoaded] = useState(false);


  const handleCrop = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      if (croppedCanvas) {
        const croppedImage = croppedCanvas.toDataURL();
        setCoverImage(dataURItoBlob(croppedImage));
        console.log('Cropped Image:', croppedImage);
      } else {
        console.error('getCroppedCanvas returned null or undefined.');
      }
    } else {
      console.error('Cropper reference or getCroppedCanvas function is not available.');
    }
  };

  const handleReset = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      // Reset the cropper to the original image size
      cropperRef.current.cropper.reset();

      // Reset the cover image to the original image
      setCoverImage(originalImage);
    }
  };

  const handleChangeImage = () => {
    // Reset states
    setOriginalImage(null);
    setCoverImage(null);
    setImageLoaded(false);
  };


  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };


  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFiles(files);
    setIsDragging(false);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    if (files.length === 1) {
      const file = files[0];

      if (file.type.startsWith('image/')) {
        setOriginalImage(file);
        setCoverImage(file)
        setImageLoaded(false);
        console.log('Valid image file:', file);
      } else {
        alert('Please select a valid image file.');
      }
    } else {
      alert('Please select only one file.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Card
        className={`shadow-lg ${isDragging ? 'border-dashed border-2 border-blue-500' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardHeader className="bg-gray-100 p-4">
          <h2 className="text-2xl font-semibold">Imagen para la Portada</h2>
        </CardHeader>
        <div className='px-4 pb-2'>
          <span>⚠️</span>  
          <Link className="underline" href='https://invitacionesjanos.com.ar/6/muestraboda'>
            Mirá el ejemplo:
          </Link>
          <span> Te puede ayudar a encontrar la mejor ubicación de la imagen para que se vea bien con los textos de la portada </span>
          </div>
        {coverImage ? (
          <div className='w-full'>
            <img
              style={{ display: 'none' }}
              src={URL.createObjectURL(coverImage)}
              onLoad={handleImageLoad}
              alt="Hidden Image"
            />
            {imageLoaded && (
              <div className='flex justify-center'>

              <Cropper
                ref={cropperRef}
                src={URL.createObjectURL(coverImage)}
                autoCropArea={1}
                style={{ height: '100%', width: '85%' }}
                aspectRatio={9 / 16}
                guides={false}
                dragMode="move"
                scalable={true}
                cropBoxResizable={true}
                zoomOnWheel={false}
                />
                </div>

            )}
            <div  className='w-full flex justify-around flex-nowrap'>

            <Button className="mt-4" variant="outline" onClick={handleCrop}>
              Recortar
            </Button>
            <Button className="mt-4" variant="outline" onClick={handleReset}>
              Deshacer
            </Button>
            <Button className="mt-4" variant="outline" onClick={handleChangeImage}>
              Cambiar de Foto
            </Button>
            </div>
          </div>
        ) : (
         <></>
        )}

        <Label htmlFor="picture-upload">
          <CardContent className="p-4">
            <div className="grid w-full items-center gap-4">
              {
                !coverImage &&
                <div
                  className={`${isDragging
                    ? 'border-dashed border-2 border-blue-500'
                    : 'border-dashed border-2 border-gray-300'
                    } h-64 flex items-center justify-center`}
                >
                  <Input
                    className="sr-only"
                    id="picture-upload"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <div className="text-gray-500">
                    <UploadIcon className="w-8 h-8 mx-auto mb-2" />
                    <p className='px-4 text-center'>Hace click o arrastra una imagen a este cuadrado para subirla</p>
                  </div>
                </div>
              }
            </div>

          </CardContent>
        </Label>
      </Card>
    </div>
  );
}

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
