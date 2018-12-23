"use strict";

module.exports = {
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 8
  },
  env: {
    node: true,
    jest: true,
    es6: true
  }
};
