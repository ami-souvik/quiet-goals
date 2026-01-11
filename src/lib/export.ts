export function svgToUrl(svgString: string): string {
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  return URL.createObjectURL(blob);
}

export async function downloadImage(svgString: string, filename: string, width: number, height: number, format: 'png' | 'webp' = 'png') {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) throw new Error('Could not get canvas context');

  const img = new Image();
  const svgUrl = svgToUrl(svgString);

  return new Promise<void>((resolve, reject) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      try {
        const dataUrl = canvas.toDataURL(`image/${format}`, 1.0);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(svgUrl);
        resolve();
      } catch (e) {
        reject(e);
      }
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(svgUrl);
      reject(e);
    };
    img.src = svgUrl;
  });
}
