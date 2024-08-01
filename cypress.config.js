const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // cypress.config.js
module.exports = {
  e2e: {
    pageLoadTimeout: 120000,
  },
};

    },
  },
});
