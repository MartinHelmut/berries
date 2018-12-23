"use strict";

module.exports = {
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/utils/jest.setup.js"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/public/"]
};
