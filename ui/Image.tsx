'use client';
import NextImage, { type ImageProps } from 'next/image';

export default function Image(props: ImageProps) {
  return (
    <NextImage
      {...props}
      onError={(e) => {
        e.currentTarget.src = 'https://via.placeholder.com/80x80';
        return null;
      }}
    />
  );
}
