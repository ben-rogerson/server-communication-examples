import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
  },
  plugins: [react()],
  resolve: { alias: { "@/": "/src/" } },
});
