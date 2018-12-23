"use strict";

module.exports = {
  env: {
    development: {
      presets: ["next/babel"],
      plugins: ["styled-components"]
    },
    production: {
      presets: ["next/babel"],
      plugins: ["styled-components"]
    },
    test: {
      presets: [["next/babel", { "preset-env": { modules: "commonjs" } }]],
      plugins: ["styled-components"]
    }
  }
};
