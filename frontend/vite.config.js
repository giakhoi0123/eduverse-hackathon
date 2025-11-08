import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/eduverse-hackathon/' : '',
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
