/**
 * Script to update character avatars based on image files in the img directory
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read all image files from img directory
const imgDir = path.join(__dirname, "img");
const imageFiles = fs.readdirSync(imgDir).filter((file) => {
  const ext = path.extname(file).toLowerCase();
  return [".jpg", ".jpeg", ".png", ".webp", ".svg", ""].includes(ext);
});

// Create a mapping from normalized names to image filenames
const imageMap = {};
imageFiles.forEach((file) => {
  // Remove extension and normalize the name
  const nameWithoutExt = file.replace(/\.[^.]+$/, "");
  const normalized = normalizeVietnameseName(nameWithoutExt);
  imageMap[normalized] = file;
  console.log(`Mapped: ${nameWithoutExt} -> ${normalized}`);
});

console.log("\nTotal images found:", imageFiles.length);
console.log("\nImage mapping:", imageMap);

/**
 * Normalize Vietnamese name for matching
 */
function normalizeVietnameseName(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
    .replace(/[èéẹẻẽêềếệểễ]/g, "e")
    .replace(/[ìíịỉĩ]/g, "i")
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
    .replace(/[ùúụủũưừứựửữ]/g, "u")
    .replace(/[ỳýỵỷỹ]/g, "y")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Find matching image for a character name
 */
function findImageForCharacter(characterName) {
  const normalized = normalizeVietnameseName(characterName);

  // Direct match
  if (imageMap[normalized]) {
    return imageMap[normalized];
  }

  // Try to find partial matches
  for (const [key, value] of Object.entries(imageMap)) {
    if (key.includes(normalized) || normalized.includes(key)) {
      return value;
    }
  }

  return null;
}

// Read the characters-data.js file
const charactersDataPath = path.join(
  __dirname,
  "backend",
  "utils",
  "characters-data.js"
);
let content = fs.readFileSync(charactersDataPath, "utf8");

// Parse and update character definitions
const lines = content.split("\n");
const updatedLines = [];
let inCharacterObject = false;
let currentCharacterName = null;
let characterIndent = "";
let foundAvatarProperty = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Detect character object start
  const nameMatch = line.match(/name:\s*['"]([^'"]+)['"]/);
  if (nameMatch && !inCharacterObject) {
    currentCharacterName = nameMatch[1];
    inCharacterObject = true;
    foundAvatarProperty = false;
    // Detect indentation
    const indentMatch = line.match(/^(\s*)/);
    characterIndent = indentMatch ? indentMatch[1] : "    ";
  }

  // Check if avatar property already exists
  if (inCharacterObject && line.match(/avatar:\s*['"][^'"]+['"]/)) {
    foundAvatarProperty = true;
  }

  // Detect end of character object (closing brace with },)
  if (inCharacterObject && line.match(/^\s*\},?\s*$/)) {
    // Add avatar property before closing brace if not found
    if (currentCharacterName && !foundAvatarProperty) {
      const imageFile = findImageForCharacter(currentCharacterName);
      if (imageFile) {
        // Insert avatar property before the closing brace
        const lastPropertyLine = updatedLines[updatedLines.length - 1];
        if (!lastPropertyLine.trim().endsWith(",")) {
          updatedLines[updatedLines.length - 1] = lastPropertyLine.replace(
            /\s*$/,
            ",\n"
          );
        }
        updatedLines.push(`${characterIndent}avatar: '/img/${imageFile}'`);
        console.log(`✓ Added avatar for ${currentCharacterName}: ${imageFile}`);
      } else {
        console.log(`✗ No image found for ${currentCharacterName}`);
      }
    }
    inCharacterObject = false;
    currentCharacterName = null;
    foundAvatarProperty = false;
  }

  updatedLines.push(line);
}

// Write updated content back to file
fs.writeFileSync(charactersDataPath, updatedLines.join("\n"), "utf8");
console.log("\n✓ Successfully updated characters-data.js with avatar paths!");
console.log(`Updated file: ${charactersDataPath}`);
