/**
 * Script to verify which images are not yet mapped to characters
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read characters-data.js to extract all avatar paths
const charactersDataPath = path.join(
  __dirname,
  "backend",
  "utils",
  "characters-data.js"
);
const content = fs.readFileSync(charactersDataPath, "utf8");

// Extract all avatar paths
const avatarMatches = content.matchAll(/avatar:\s*['"]\/img\/([^'"]+)['"]/g);
const usedImages = new Set();
for (const match of avatarMatches) {
  usedImages.add(match[1]);
}

// Read all image files
const imgDir = path.join(__dirname, "img");
const imageFiles = fs.readdirSync(imgDir).filter((file) => {
  const ext = path.extname(file).toLowerCase();
  return [".jpg", ".jpeg", ".png", ".webp", ".svg", ""].includes(ext);
});

// Find unused images
const unusedImages = imageFiles.filter(
  (img) => !usedImages.has(img) && img !== "favicon.svg"
);

console.log("=== THỐNG KÊ ===");
console.log(`Tổng số hình ảnh: ${imageFiles.length}`);
console.log(`Đã sử dụng: ${usedImages.size}`);
console.log(`Chưa sử dụng: ${unusedImages.length}\n`);

if (unusedImages.length > 0) {
  console.log("=== HÌNH ẢNH CHƯA ĐƯỢC SỬ DỤNG ===");
  unusedImages.forEach((img) => console.log(`- ${img}`));
}

console.log("\n=== HÌNH ẢNH ĐÃ ĐƯỢC ÁNH XẠ ===");
const sortedUsed = Array.from(usedImages).sort();
sortedUsed.forEach((img) => console.log(`✓ ${img}`));
