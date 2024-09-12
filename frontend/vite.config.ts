import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true, // Enable sourcemaps
  },
  esbuild: {
    sourcemap: true, // Ensure esbuild generates sourcemaps
  },
});
