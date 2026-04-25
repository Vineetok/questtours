'use client';

import React, { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      onChange(url);
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    onChange('');
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative w-40 h-40 rounded-xl overflow-hidden border-2 border-gray-100 shadow-sm">
            <Image
              src={value}
              alt="Upload"
              fill
              className="object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
              type="button"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-40 h-40 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 hover:bg-gray-100/50 hover:border-blue-400 transition-all cursor-pointer group">
            {isUploading ? (
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            ) : (
              <>
                <div className="p-3 bg-white rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
                  <Upload className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                </div>
                <span className="text-xs font-medium text-gray-500 group-hover:text-blue-600">Upload Image</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading || disabled}
            />
          </label>
        )}
      </div>
    </div>
  );
}
