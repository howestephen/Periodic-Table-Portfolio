import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// For GitHub Pages: Set base to match your repository name
// IMPORTANT:
// - For LOCAL DEVELOPMENT: Keep this as "/" (easier to test)
// - For PRODUCTION/DEPLOYMENT: Change this to "/figma-portfolio/" (or your repo name)
// The GitHub Actions workflow will build with the correct base path
// For now, keep as "/" for local development
const base = "/";

export default defineConfig({
  base,
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
});
