"use client";

import { useCallback, useState, useEffect } from "react";

type ImageItem = {
  file: File;
  preview: string;
};

type ImageDropzoneProps = {
  onImagesChange: (imageFiles: File[]) => void;
};

export default function ImageDropzone({ onImagesChange }: ImageDropzoneProps) {
  const [images, setImages] = useState<ImageItem[]>([]);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;

    const validFiles = Array.from(files).filter((file) => {
      return file.type.startsWith("image/");
    });

    const items: ImageItem[] = [];

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target?.result) return;

        items.push({
          file,
          preview: e.target.result as string,
        });

        console.log("items", items.length);

        if (items.length === validFiles.length) {
          setImages((prev) => [...prev, ...items]);
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  useEffect(() => {
    onImagesChange(images.map((img) => img.file));
  }, [images]);

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Dropzone */}
      <label
        htmlFor="image-upload"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer
        border-gray-300 bg-gray-50 hover:bg-gray-100 transition"
      >
        <div className="text-center">
          <p className="text-lg font-semibold">Drop images here</p>
          <p className="text-sm text-gray-500">or click to upload</p>
        </div>
        <input
          id="image-upload"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </label>

      {/* Preview */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-6">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative group rounded-lg overflow-hidden border"
            >
              <img
                src={img.preview}
                alt="preview"
                className="object-cover w-full h-28"
              />

              {/* Remove Button */}
              <button
                type="button"
                onClick={() =>
                  setImages((prev) => {
                    const updatedImages = prev.filter((_, i) => i !== index);

                    // notify parent with updated files
                    onImagesChange(updatedImages.map((img) => img.file));

                    return updatedImages;
                  })
                }
                className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0
                group-hover:opacity-100 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
