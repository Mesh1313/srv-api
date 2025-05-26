import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    silent: false,
    coverage: {
      exclude: ["**/node_modules/**", "**/index.ts"],
    },
    globals: true,
    restoreMocks: true,
    setupFiles: ["./src/test/testSetup.ts"],
  },
  plugins: [tsconfigPaths()],
});
