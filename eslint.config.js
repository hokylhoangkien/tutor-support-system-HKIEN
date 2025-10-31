import js from "@eslint/js";
import react from "eslint-plugin-react";
import prettier from "eslint-config-prettier";

export default [
  {
    ignores: ["node_modules", "dist", "build", "coverage", "eslint.config.js"],
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
      },
    },
    plugins: {
      react,
    },
    rules: {
      "no-unused-vars": "warn",
      "react/react-in-jsx-scope": "off", // React 17+ không cần import React
    },
  },
  js.configs.recommended,
  prettier,
];
