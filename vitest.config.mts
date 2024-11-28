import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [vue(), tsconfigPaths()],
  test: {
    globals: true, // Enables using global variables in your tests
    environment: "jsdom", // Ensures the DOM is simulated in Node.js for tests
    setupFiles: "./setupTests.ts",
    coverage: {
      reporter: ["text", "html"], // Specifies the coverage reporters
    },
  },
});
