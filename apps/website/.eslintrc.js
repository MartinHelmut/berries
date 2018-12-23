"use strict";

module.exports = {
  extends: ["eslint:recommended", "prettier", "plugin:react/recommended"],
  plugins: ["react", "import", "jsx-a11y"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true
  },
  rules: {
    "react/prop-types": 0,
    "react/jsx-indent": [1, 4],
    "react/jsx-indent-props": [1, 4],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["a"]
      }
    ]
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
