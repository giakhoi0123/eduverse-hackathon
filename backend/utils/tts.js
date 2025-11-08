import gtts from 'gtts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUDIO_DIR = path.join(__dirname, '../audio');

// Ensure audio directory exists
if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

/**
 * Generate speech audio from text using Google TTS
 * @param {string} text - Text to convert to speech
 * @param {string} characterId - Character ID (for voice customization)
 * @param {string} gender - Character gender ('male' or 'female')
 * @returns {Promise<string>} URL to the generated audio file
 */
export async function generateSpeech(text, characterId, gender = 'male') {
  return new Promise((resolve, reject) => {
    try {
      // Generate unique filename
      const filename = `${characterId}_${uuidv4()}.mp3`;
      const filepath = path.join(AUDIO_DIR, filename);

      // Note: gtts library doesn't support voice selection
      // For production, consider using: 
      // - Google Cloud Text-to-Speech API (supports male/female voices)
      // - Azure Cognitive Services
      // - Amazon Polly
      // Current implementation uses default Vietnamese voice
      const speech = new gtts(text, 'vi');

      // Save audio file
      speech.save(filepath, (err) => {
        if (err) {
          console.error('TTS Error:', err);
          reject(new Error('Failed to generate speech'));
          return;
        }

        // Return URL path
        const audioUrl = `/audio/${filename}`;
        console.log(`✅ Audio generated (${gender}):`, audioUrl);
        resolve(audioUrl);
      });

    } catch (error) {
      console.error('TTS Error:', error);
      reject(error);
    }
  });
}

/**
 * Clean up old audio files (optional)
 * @param {number} maxAgeMs - Maximum age in milliseconds
 */
export function cleanupOldAudioFiles(maxAgeMs = 3600000) { // 1 hour default
  try {
    const files = fs.readdirSync(AUDIO_DIR);
    const now = Date.now();

    files.forEach(file => {
      const filepath = path.join(AUDIO_DIR, file);
      const stats = fs.statSync(filepath);
      const age = now - stats.mtimeMs;

      if (age > maxAgeMs) {
        fs.unlinkSync(filepath);
        console.log('🗑️  Deleted old audio file:', file);
      }
    });
  } catch (error) {
    console.error('Cleanup error:', error);
  }
}

// Run cleanup every hour
setInterval(() => {
  cleanupOldAudioFiles();
}, 3600000);
