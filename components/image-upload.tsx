'use client';

import { useEffect, useState } from 'react';

import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';

type ImageUploadProps = {
  onChange: (src: string) => void;
  value: string;
  disabled?: boolean;
};

export default function ImageUpload({
  value,
  onChange,
  disabled,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  // This useEffect will run once server side rendering is complete and we switch to client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className='space-y-4 w-full flex flex-col justify-center items-center'>
      <CldUploadButton
        onSuccess={(result: any) => onChange(result.info.secure_url)}
        options={{
          maxFiles: 1,
        }}
        uploadPreset='l16p1cly'
      >
        <div className='p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center'>
          <div className='relative h-40 w-40'>
            <Image
              src={value || '/placeholder.svg'}
              alt='Uploaded image'
              fill
              className='object-cover rounded-lg'
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
}
