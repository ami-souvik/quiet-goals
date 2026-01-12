import { Mood } from './moods';
import { getImageCssFilter, getCanvasFilter } from './filters';

export function getGradientId(mood: Mood) {
  return `grad-${mood.id}`;
}

export function getNoiseId(mood: Mood) {
  return `noise-${mood.id}`;
}

export function getVignetteId(mood: Mood) {
  return `vignette-${mood.id}`;
}

export function generateBackgroundDefs(mood: Mood): string {
  const bg = mood.background;
  const gradId = getGradientId(mood);
  const noiseId = getNoiseId(mood);
  const vignetteId = getVignetteId(mood);

  // 1. Main Gradient
  let gradientDef = '';
  const stops = bg.stops
    .map((s) => `<stop offset="${s.offset}%" stop-color="${s.color}" />`)
    .join('\n');

  if (bg.type === 'linear') {
    gradientDef = `
      <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1" gradientTransform="rotate(${bg.angle || 0} 0.5 0.5)">
        ${stops}
      </linearGradient>
    `;
  } else {
    gradientDef = `
      <radialGradient id="${gradId}" cx="${bg.cx || 50}%" cy="${bg.cy || 50}%" r="80%">
        ${stops}
      </radialGradient>
    `;
  }

  // 2. Noise Filter
  const noiseFilter = `
    <filter id="${noiseId}">
      <feTurbulence 
        type="fractalNoise" 
        baseFrequency="${0.8 * (bg.noiseScale || 1)}" 
        numOctaves="3" 
        stitchTiles="stitch" 
      />
      <feColorMatrix type="saturate" values="0" />
    </filter>
  `;

  // 3. Vignette Gradient
  const vignetteDef = `
    <radialGradient id="${vignetteId}" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000" stop-opacity="${bg.vignetteStrength}" />
    </radialGradient>
  `;

  return `
    ${gradientDef}
    ${noiseFilter}
    ${vignetteDef}
  `;
}

export function generateBackgroundRects(mood: Mood, imageUrl?: string | null): string {
  const gradId = getGradientId(mood);
  const noiseId = getNoiseId(mood);
  const vignetteId = getVignetteId(mood);

  let baseLayer = '';
  let imageLayer = '';
  let overlayLayer = '';

  if (imageUrl) {
      // IMAGE MODE
      const cssFilter = getImageCssFilter(mood);
      // We use preserveAspectRatio="xMidYMid slice" to simulate object-fit: cover
      imageLayer = `<image href="${imageUrl}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style="filter: ${cssFilter}" />`;
      
      // Color Overlay
      overlayLayer = `<rect width="100%" height="100%" fill="${mood.image.overlayColor}" fill-opacity="${mood.image.overlayOpacity}" />`;
  } else {
      // PROCEDURAL MODE
      baseLayer = `<rect width="100%" height="100%" fill="url(#${gradId})" />`;
      
      // Noise Overlay
      overlayLayer = mood.background.grainOpacity > 0 
        ? `<rect width="100%" height="100%" filter="url(#${noiseId})" opacity="${mood.background.grainOpacity}" />`
        : '';
  }

  // Vignette Overlay (Always applied if strength > 0)
  const vignetteLayer = mood.background.vignetteStrength > 0
    ? `<rect width="100%" height="100%" fill="url(#${vignetteId})" />`
    : '';

  return `
    ${baseLayer}
    ${imageLayer}
    ${overlayLayer}
    ${vignetteLayer}
  `;
}

/**
 * Draws the mood background onto a canvas context using a temporary SVG.
 * This ensures the export matches the SVG preview exactly.
 */
export async function drawBackgroundToCanvas(
  ctx: CanvasRenderingContext2D,
  mood: Mood,
  width: number,
  height: number,
  imageUrl?: string | null
): Promise<void> {
  // If imageUrl is present, we handle it with native canvas operations to avoid Tainted Canvas issues with SVG blobs
  if (imageUrl) {
      try {
        // 1. Load Image
        const img = new Image();
        img.crossOrigin = "anonymous";
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = imageUrl;
        });

        // 2. Draw Image with "Cover" fit
        const imgRatio = img.width / img.height;
        const canvasRatio = width / height;
        
        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
            drawHeight = height;
            drawWidth = height * imgRatio;
            offsetY = 0;
            offsetX = (width - drawWidth) / 2;
        } else {
            drawWidth = width;
            drawHeight = width / imgRatio;
            offsetX = 0;
            offsetY = (height - drawHeight) / 2;
        }

        ctx.save();
        ctx.filter = getCanvasFilter(mood);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        ctx.restore();

        // 3. Draw Overlay
        ctx.fillStyle = mood.image.overlayColor;
        ctx.globalAlpha = mood.image.overlayOpacity;
        ctx.fillRect(0, 0, width, height);
        ctx.globalAlpha = 1.0;

        // 4. Draw Vignette (Re-using SVG logic for vignette gradient)
        const defs = generateBackgroundDefs(mood);
        const vignetteRect = mood.background.vignetteStrength > 0
            ? `<rect width="100%" height="100%" fill="url(#${getVignetteId(mood)})" />`
            : '';

        if (vignetteRect) {
             const svgString = `
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
              <defs>${defs}</defs>
              ${vignetteRect}
            </svg>`;
            
            const vImg = new Image();
            const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            await new Promise((resolve) => {
                vImg.onload = () => {
                    ctx.drawImage(vImg, 0, 0, width, height);
                    URL.revokeObjectURL(url);
                    resolve(null);
                };
                vImg.src = url;
            });
        }
        
        return;

      } catch (e) {
          console.error("Failed to load export image, falling back to procedural", e);
          // Fall through to procedural
      }
  }

  // PROCEDURAL FALLBACK
  const defs = generateBackgroundDefs(mood);
  const rects = generateBackgroundRects(mood, null);

  const svgString = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>${defs}</defs>
      ${rects}
    </svg>
  `;

  const img = new Image();
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  return new Promise((resolve, reject) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve();
    };
    img.onerror = (e) => {
      console.error('Failed to load background SVG for canvas', e);
      ctx.fillStyle = mood.bgColor;
      ctx.fillRect(0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve();
    };
    img.src = url;
  });
}
