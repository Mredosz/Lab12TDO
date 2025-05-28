import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node,
      env: {
        node: true,
      },
    },
  },
  {
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: { ...globals.node, ...globals.mocha },
      env: {
        node: true,
        mocha: true,
      },
    },
  },
]);
