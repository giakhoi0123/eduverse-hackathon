// Load environment variables before anything else
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file from parent directory (backend/)
const result = dotenv.config({ path: join(__dirname, '..', '.env') });

if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('✅ Environment variables loaded successfully');
  console.log('   OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✓ Found' : '✗ NOT FOUND');
  console.log('   PORT:', process.env.PORT || '5000');
}

export default process.env;
