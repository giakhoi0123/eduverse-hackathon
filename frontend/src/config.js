// API Configuration
export const API_URL = import.meta.env.PROD
  ? "" // Vercel sẽ dùng same domain /api
  : "http://localhost:3000";

export default API_URL;
