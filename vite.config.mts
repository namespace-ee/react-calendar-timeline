import { defineConfig } from "vite-plus";
import { resolve } from "path";

export default defineConfig({
  pack: [
    {
      format: ["esm", "cjs"],
      sourcemap: true,
      dts: true,
      deps: { resolveDepSubpath: true },
    },
    {
      // A stylesheet entry breaks dts generation, so it gets its own build.
      entry: { style: "src/lib/Timeline.scss" },
      copy: ["src/lib/Timeline.scss"],
    },
  ],
  lint: {
    plugins: ["typescript", "react", "oxc"],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    ignorePatterns: ["demo/**", "demo-next/**", "examples/**"],
    rules: {
      "react/no-children-prop": "off",
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    overrides: [
      {
        files: ["__tests__/**"],
        plugins: ["vitest"],
        rules: { "vitest/require-mock-type-parameters": "off" },
      },
    ],
    options: { typeAware: true, typeCheck: true },
  },
  fmt: {
    trailingComma: "es5",
    printWidth: 120,
    sortPackageJson: false,
    ignorePatterns: ["**/*.{md,yml,yaml,html}", "demo/**", "demo-next/**", "examples/**"],
  },
  staged: {
    "*.{ts,tsx,js,jsx,json,css,scss}": "vp fmt",
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["__tests__/setup.ts"],
    include: ["__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}", "__tests__/utils/**/*.{js,ts}"],
    coverage: {
      include: ["src/**"],
    },
  },
  resolve: {
    alias: {
      lib: resolve(__dirname, "src/lib"),
      "test-utility": resolve(__dirname, "__tests__/test-utility"),
    },
  },
});
