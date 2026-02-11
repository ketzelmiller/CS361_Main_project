import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/habits": "http://localhost:3000"   // change if your backend uses a different port
    }
  }
});