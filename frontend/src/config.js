// API Configuration
export const API_URL = import.meta.env.PROD
  ? "https://eduverse-hackathon.onrender.com" // Backend on Render
  : "http://localhost:3000";

export default API_URL;
