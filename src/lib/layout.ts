export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const lines: string[] = [];
  const paragraphs = text.split('\n');

  for (const paragraph of paragraphs) {
    if (paragraph === '') {
      lines.push('');
      continue;
    }

    const words = paragraph.split(' ');
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + ' ' + word).width;
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
  }
  return lines;
}

export function calculateFontSize(
  width: number,
  isMobile: boolean,
  baseScale: number
): number {
  // Backend used 0.12 for mobile, 0.07 for desktop as base scales
  // We can adjust these defaults if needed
  const defaultBase = isMobile ? 0.12 : 0.07;
  return width * defaultBase * baseScale;
}
