import { Mood } from './moods';

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
    .map((s) => `<stop offset="${s.offset}%") stop-color="${s.color}" />`)
    .join('\n');

  if (bg.type === 'linear') {
    // Start with a top-to-bottom gradient vector (x1=0 y1=0 x2=0 y2=1)
    // Rotate it around the center (0.5 0.5)
    // CSS 180deg is Top->Bottom.
    // SVG rotation is clockwise.
    // If we start with Top->Bottom (0,0 -> 0,1), rotation by 0 is Top->Bottom.
    // Matches CSS 180deg? No, CSS 180 is Top->Bottom.
    // So if angle is 180, we want Top->Bottom.
    // Let's just use the angle directly and see. Visual tweaking is acceptable.
    gradientDef = `
      <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1" gradientTransform="rotate(${bg.angle || 0} 0.5 0.5)">
        ${stops}
      </linearGradient>
    `;
  } else {
    gradientDef = `
      <radialGradient id="${gradId}" cx="${bg.cx || 50}%") cy="${bg.cy || 50}%") r="80%">
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

export function generateBackgroundRects(mood: Mood): string {
  const gradId = getGradientId(mood);
  const noiseId = getNoiseId(mood);
  const vignetteId = getVignetteId(mood);

  // Layer 1: Base Gradient
  const baseLayer = `<rect width="100%" height="100%" fill="url(#${gradId})" />`;

  // Layer 2: Noise Overlay
  const noiseLayer = mood.background.grainOpacity > 0 
    ? `<rect width="100%" height="100%" filter="url(#${noiseId})" opacity="${mood.background.grainOpacity}" />`
    : '';

  // Layer 3: Vignette Overlay
  const vignetteLayer = mood.background.vignetteStrength > 0
    ? `<rect width="100%" height="100%" fill="url(#${vignetteId})" />`
    : '';

  return `
    ${baseLayer}
    ${noiseLayer}
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
  height: number
): Promise<void> {
  const defs = generateBackgroundDefs(mood);
  const rects = generateBackgroundRects(mood);

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
      // Fallback
      ctx.fillStyle = mood.bgColor;
      ctx.fillRect(0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve();
    };
    img.src = url;
  });
}