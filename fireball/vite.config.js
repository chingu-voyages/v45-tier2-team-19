import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/dist/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "treat-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;
        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic",
        });
      },
    },
  ],
  test: {
    environment: "jsdom",
    // environmentMatchGlobs: [["src/__tests__/**", "node"]],
    globals: true,
    include: [...configDefaults.include, "src/__tests__/*"],
    setupFiles: "./tests/setup.js",
  },
  build: {
    outdir: './docs'
  }
});
