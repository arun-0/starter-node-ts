// ================  JS  =========================
// @eslint/js provides standard linting rules ie enables useful correctness rules
import js from "@eslint/js";
// globals provides global names for eslint to be aware of
import globals from "globals";
// eslint-config-prettier disables ESLint formatting rules that would conflict with Prettier. ESLint’s current standard configuration file is eslint.config.js. Below one, supplies an ESLint configuration object that disables ESLint formatting rules that could conflict with Prettier.
import eslintConfigPrettier from "eslint-config-prettier/flat";

// ================  TS  =========================
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores(["coverage/**", "dist/**"]),
  {
    files: ["**/*.js"],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.nodeBuiltin,
    },
  },
  {
    files: ["**/*.ts"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.nodeBuiltin,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  eslintConfigPrettier,
);
