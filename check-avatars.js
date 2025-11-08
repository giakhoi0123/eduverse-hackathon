/**
 * Script to check if all characters have avatars
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const charactersDataPath = path.join(
  __dirname,
  "backend",
  "utils",
  "characters-data.js"
);
const content = fs.readFileSync(charactersDataPath, "utf8");

// Extract all character names and check if they have avatars
const characterPattern =
  /\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',[\s\S]*?\}/g;
let match;
const characters = [];

// Split by character objects
const characterObjects = content.split(/\},\s*\{/).map((obj, index, arr) => {
  if (index === 0) return obj + "}";
  if (index === arr.length - 1) return "{" + obj;
  return "{" + obj + "}";
});

let charactersWithoutAvatar = [];
let charactersWithAvatar = [];

for (const obj of characterObjects) {
  const nameMatch = obj.match(/name:\s*['"]([^'"]+)['"]/);
  const avatarMatch = obj.match(/avatar:\s*['"]([^'"]+)['"]/);

  if (nameMatch) {
    const name = nameMatch[1];
    if (avatarMatch) {
      charactersWithAvatar.push({ name, avatar: avatarMatch[1] });
    } else {
      // Check if this is actually a character definition (has id field)
      const idMatch = obj.match(/id:\s*['"]([^'"]+)['"]/);
      if (idMatch) {
        charactersWithoutAvatar.push(name);
      }
    }
  }
}

console.log("=== KẾT QUẢ KIỂM TRA ===\n");
console.log(`✓ Nhân vật có avatar: ${charactersWithAvatar.length}`);
console.log(`✗ Nhân vật chưa có avatar: ${charactersWithoutAvatar.length}\n`);

if (charactersWithoutAvatar.length > 0) {
  console.log("=== NHÂN VẬT CHƯA CÓ AVATAR ===");
  charactersWithoutAvatar.forEach((name) => console.log(`- ${name}`));
  console.log();
}

console.log("=== MỘT SỐ NHÂN VẬT ĐÃ CÓ AVATAR ===");
charactersWithAvatar.slice(0, 10).forEach(({ name, avatar }) => {
  console.log(`✓ ${name}: ${avatar}`);
});
console.log(`... và ${charactersWithAvatar.length - 10} nhân vật khác`);
