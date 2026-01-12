import { getMood } from './moods';
import { getVariant } from './variants';
import { wrapText, calculateFontSize } from './layout';
import { generateBackgroundDefs, generateBackgroundRects } from './background';

interface GenerateSvgParams {
  text: string;
  moodId: string;
  variantId: string;
  width: number;
  height: number;
  embedFont?: boolean;
  backgroundImage?: string | null;
}

async function loadFontAsBase64(filename: string): Promise<string> {
  try {
    const response = await fetch(`/fonts/${filename}`);
    if (!response.ok) throw new Error('Failed to load font');
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = (reader.result as string).split(',')[1];
        resolve(`data:font/ttf;base64,${base64data}`);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.error('Font loading failed', e);
    return '';
  }
}

export async function generateSvg({
  text,
  moodId,
  variantId,
  width,
  height,
  embedFont = false,
  backgroundImage = null
}: GenerateSvgParams): Promise<string> {
  const mood = getMood(moodId);
  const variant = getVariant(variantId);

  // Determine if mobile based on aspect ratio or fixed dimensions
  const isMobile = width < height;

  // Calculate font size
  const fontSize = calculateFontSize(width, isMobile, variant.fontScale) * mood.scalingFactor;
  const lineHeight = fontSize * (variant.lineHeight || 1.4);

  // Prepare text
  const displayText = mood.uppercase ? text.toUpperCase() : text;
  
  // Measure text to wrap
  let lines: string[] = [displayText];
  
  if (typeof window !== 'undefined') {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      let fontFamily = 'sans-serif';
      if (moodId === 'grounded') fontFamily = 'serif';
      if (moodId === 'ambitious') fontFamily = 'sans-serif';
      
      ctx.font = `${variant.fontWeight} ${fontSize}px ${fontFamily}`;
      
      // Max text width: 80% of screen width
      const maxTextWidth = width * 0.8;
      lines = wrapText(ctx, displayText, maxTextWidth);
    }
  }

  // Calculate Vertical Position
  const totalTextHeight = lines.length * lineHeight;
  let startY = 0;

  if (variant.verticalAlign === 'center') {
    startY = (height - totalTextHeight) / 2 + lineHeight * 0.75;
  } else if (variant.verticalAlign === 'top') {
    startY = (height * (variant.offsetY / 100)) + lineHeight; 
  } else if (variant.verticalAlign === 'bottom') {
    startY = height - (height * (Math.abs(variant.offsetY) / 100)) - totalTextHeight + lineHeight;
  }
  
  const x = width / 2;

  // Font Embedding
  const fontStyles = '';
  const fontFamilyStack = `'ExportFont', ${mood.fontFamilyCss}`;
  
  // Background Generation
  const bgDefs = generateBackgroundDefs(mood);
  const bgRects = generateBackgroundRects(mood, backgroundImage);

  // Generate SVG lines
  const textElements = lines.map((line, i) => {
    return `<text x="${x}" y="${startY + i * lineHeight}" text-anchor="middle" fill="${mood.textColor}" fill-opacity="${variant.opacity}">${line}</text>`;
  }).join('\n');

  const svgContent = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          ${fontStyles}
          text {
            font-family: ${fontFamilyStack};
            font-size: ${fontSize}px;
            font-weight: ${variant.fontWeight};
            letter-spacing: ${variant.letterSpacing};
          }
        </style>
        ${bgDefs}
      </defs>
      ${bgRects}
      ${textElements}
    </svg>
  `;

  return svgContent.trim();
}
