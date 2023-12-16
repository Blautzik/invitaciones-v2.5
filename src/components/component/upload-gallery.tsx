
'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import square from '../../../public/square-xxl.png'




export function UploadGallery() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
 





  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Upload Images</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Select up to 5 images for upload</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="images">Select Images</Label>
          <Input id="images" multiple required type="file" />
          <div className="grid grid-cols-2 gap-4">
            {filePreviews.map((preview, index) => (
              <img
                key={index}
                alt={`Image Preview ${index + 1}`}
                className="w-full h-full object-cover"
                height="100"
                src={preview}
                style={{
                  aspectRatio: '100/100',
                  objectFit: 'cover',
                }}
                width="100"
              />
            ))}
          </div>
        </div>
        <Button className="w-full" type="submit">
          Upload Images
        </Button>
      </div>
    </div>
  )
}
