export const setCircularFavicon = (imageUrl: string) => {
  const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
  if (!link) return;

  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const img = new Image();
  img.src = imageUrl;
  img.crossOrigin = 'Anonymous';

  img.onload = () => {
    // Clear and set circular clipping path
    ctx.clearRect(0, 0, 64, 64);
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();

    // Draw image
    ctx.drawImage(img, 0, 0, 64, 64);

    // Set as favicon
    link.href = canvas.toDataURL();
  };
};
