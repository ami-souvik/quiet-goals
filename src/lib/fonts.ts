export async function ensureFontLoaded(
    fontName: string,
    fontUrl: string,
    weight: number | string = 'normal'
) {
  
  if (document.fonts.check(`16px "${fontName}"`)) {
    return;
  }

  const font = new FontFace(
    fontName,
    `url(${fontUrl})`,
    { weight: String(weight), style: 'normal' }
  );

  await font.load();
  document.fonts.add(font);
  await document.fonts.ready;
}
