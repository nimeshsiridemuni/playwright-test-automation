const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "https://the-internet.herokuapp.com",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
});
