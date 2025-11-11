import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Vercel không cần base path
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/audio": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/img": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
