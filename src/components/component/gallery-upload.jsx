import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function GalleryUpload({setGaleria}) {
  const initialImages = Array(6).fill('square-xxl.png');
  const [uploadedImages, setUploadedImages] = useState(initialImages);
  const [imagesToFirestore, setImagesToFirestore] = useState(Array(6).fill('square-xxl.png'));



  const handleImageClick = (index) => {
    // Trigger the file input for the specific image
    document.getElementById(`fileInput-${index}`).click();
  };

  const handleImageChange = (index, event) => {
    const files = event.target.files;

    if (files.length !== 1) {
      alert('Please select one image for upload.');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const invalidFile = files[0];

    if (!allowedTypes.includes(invalidFile.type)) {
      alert('Invalid file type. Please select only image files.');
      return;
    }

    // Update the specific image in the array

    const newImagesToFirestore = [...imagesToFirestore];
    newImagesToFirestore[index] = invalidFile;
    setImagesToFirestore(newImagesToFirestore);

    const newImages = [...uploadedImages];
    newImages[index] = URL.createObjectURL(invalidFile);
    setUploadedImages(newImages);
    setGaleria(newImagesToFirestore)
  };

  return (


    <div className="mx-auto max-w-md space-y-6 px-6">
      <div className="grid grid-cols-2 gap-1">
        {uploadedImages.map((src, index) => (
          <div key={index} className="relative">
            <img
              alt={`Image Preview ${index + 1}`}
              className="w-full h-full object-cover cursor-pointer"
              height="100"
              src={src}
              style={{
                aspectRatio: "100/100",
                objectFit: "cover",
              }}
              width="100"
              onClick={() => handleImageClick(index)}
            />
            <Input
              id={`fileInput-${index}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleImageChange(index, event)}
            />
            <Button
              className="absolute bottom-0 right-0 bg-black text-white p-2 cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              {src != 'square-xxl.png' ? `editar foto ${index+1}` : `subir foto ${index+1}` }

            </Button>
          </div>
        ))}
      </div>



      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="images">Selecciona 6 imágenes</Label>
          {/* Hidden file input for general image upload */}
          <Input id="images" multiple required type="file" accept="image/*" className="hidden" />
        </div>
        <div className="space-y-2 flex">
          <p className=''>Chequeá en la vista previa cómo se van a visualizar las imágenes en la invitación. Puede ser que necesites recortar o acomodarlas para que se vean bien en el recuadro</p>
        </div>
      </div>
    </div>
  );
}