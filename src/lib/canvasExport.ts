import { getMood } from './moods';
import { getVariant } from './variants';
import { wrapText, calculateFontSize } from './layout';
import { ensureFontLoaded } from './fonts';
import { drawBackgroundToCanvas } from './background';

function triggerDownload(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
} 

interface CanvasExportParams {
  text: string;
  moodId: string;
  variantId: string;
  width: number;
  height: number;
  filename: string;
  backgroundImage?: string | null;
}

export async function exportWallpaperCanvas({
  text,
  moodId,
  variantId,
  width,
  height,
  filename,
  backgroundImage
}: CanvasExportParams) {
    const mood = getMood(moodId);
    const variant = getVariant(variantId);

    // 1️⃣ Ensure font is loaded
    await ensureFontLoaded(
        mood.fontFamilyCanvas,
        `/fonts/${mood.fontFile}`,
        variant.fontWeight
    );

    // 2️⃣ Hi-DPI safe canvas
    const dpr = window.devicePixelRatio || 1;
    const canvas = document.createElement('canvas');
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context unavailable');

    ctx.scale(dpr, dpr);

    // 3️⃣ Background
    await drawBackgroundToCanvas(ctx, mood, width, height, backgroundImage);

    // 4️⃣ Font size & line height
    const isMobile = width < height;
    const fontSize =
    calculateFontSize(width, isMobile, variant.fontScale) *
    mood.scalingFactor;

    const lineHeight = fontSize * (variant.lineHeight || 1.4);

    // 5️⃣ Prepare text
    const displayText = mood.uppercase ? text.toUpperCase() : text;

    ctx.font = `${fontSize}px "${mood.fontFamilyCanvas}"`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = mood.textColor;
    ctx.globalAlpha = variant.opacity;

    // 🔑 VARIABLE FONT WEIGHT FIX
    if ('fontVariationSettings' in ctx) {
        ctx.fontVariationSettings = `"wght" ${variant.fontWeight}`;
    }


  // 6️⃣ Wrap text (same logic as SVG)
  const maxTextWidth = width * 0.8;
  const lines = wrapText(displayText, maxTextWidth, fontSize);

  // 7️⃣ Vertical alignment
  const totalTextHeight = lines.length * lineHeight;
  let startY = 0;

  if (variant.verticalAlign === 'center') {
    startY = (height - totalTextHeight) / 2 + lineHeight * 0.75;
  } else if (variant.verticalAlign === 'top') {
    startY = height * (variant.offsetY / 100) + lineHeight;
  } else if (variant.verticalAlign === 'bottom') {
    startY =
      height -
      height * (Math.abs(variant.offsetY) / 100) -
      totalTextHeight +
      lineHeight;
  }

  // 8️⃣ Draw text
  const centerX = width / 2;
  
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], centerX, startY + i * lineHeight);
  }

  ctx.globalAlpha = 1;

  // 9️⃣ Export PNG
  const blob = await new Promise<Blob>((resolve) =>
    canvas.toBlob((b) => resolve(b!), 'image/png', 1)
  );

  triggerDownload(blob, filename);
}
