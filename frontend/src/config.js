// API Configuration
export const API_URL = import.meta.env.PROD 
  ? 'https://eduverse-backend.onrender.com' // URL Render sau khi deploy
  : 'http://localhost:3000';

export default API_URL;
