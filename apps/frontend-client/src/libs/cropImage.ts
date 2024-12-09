import { Area } from 'react-easy-crop';

export default async function getCroppedImg(imageSrc: string, crop: Area): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get 2D context');
  }

  // Set canvas dimensions to the cropped area dimensions
  canvas.width = crop.width;
  canvas.height = crop.height;

  // Draw the cropped image onto the canvas
  ctx.drawImage(
    image,
    crop.x, // Crop start x
    crop.y, // Crop start y
    crop.width, // Crop width
    crop.height, // Crop height
    0, // Draw on canvas starting at x = 0
    0, // Draw on canvas starting at y = 0
    crop.width, // Fit to canvas width
    crop.height // Fit to canvas height
  );

  // Convert the canvas output to a Blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas is empty'));
      },
      'image/jpeg', // Output format
      0.9 // Compression quality (0.9 for high-quality images)
    );
  });
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.crossOrigin = 'anonymous'; // Handles cross-origin images properly
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
  });
}
