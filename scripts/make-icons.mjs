import sharp from "sharp";
import { mkdirSync } from "node:fs";

mkdirSync(new URL("../public/icons/", import.meta.url), { recursive: true });

// Square SCA monogram icon — gold on deep black with a fine gold ring.
const svg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#E8C77A"/>
      <stop offset="0.5" stop-color="#D4AF37"/>
      <stop offset="1" stop-color="#B8902A"/>
    </linearGradient>
    <radialGradient id="bg" cx="0.5" cy="0.32" r="0.9">
      <stop offset="0" stop-color="#1a1a1a"/>
      <stop offset="1" stop-color="#0A0A0A"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#bg)"/>
  <rect x="26" y="26" width="460" height="460" rx="92" fill="none" stroke="url(#g)" stroke-width="6" opacity="0.85"/>
  <text x="256" y="300" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="190" font-weight="700" letter-spacing="2" fill="url(#g)">SCA</text>
  <text x="256" y="372" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="34" letter-spacing="10" fill="#F4F2EC" opacity="0.7">ALPHAVILLE</text>
</svg>`;

const targets = [
  { size: 192, file: "icon-192.png" },
  { size: 512, file: "icon-512.png" },
  { size: 180, file: "apple-touch-icon.png" },
];

for (const { size, file } of targets) {
  await sharp(Buffer.from(svg(size)))
    .resize(size, size)
    .png()
    .toFile(new URL(`../public/icons/${file}`, import.meta.url).pathname);
  console.log("wrote", file);
}
