const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '6d27ms',
  chromeWebSecurity: false,
  trashAssetsBeforeRuns: true,
  numTestsKeptInMemory: 1,
  video: false, //EGV4 Modified only for "Bliss Team" - default status: true
  videoCompression: false,
  videoUploadOnPasses: true,
  defaultCommandTimeout: 15000,
  redirectionLimit: 50,
  viewportWidth: 1920,
  viewportHeight: 1080,
  screenshotOnRunFailure: true,
  screenshotConfig: {
    scale: false
  },

  retries: {
    runMode: 2,
    openMode: 0
  },

  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
    cypressMochawesomeReporterReporterOptions: {
      reportDir: 'cypress/test-results',
      charts: true,
      reportPageTitle: 'Equity Admin V2 - Test results',
      embeddedScreenshots: true,
      inlineAssets: true
    },
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/test-results/junit/results-[hash].xml'
    }
  },

  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },

    baseUrl: 'https://ea-v3-at-10.gscloud.dev/',
    specPattern: ['cypress/integration/admin/**/*.spec.js', 'cypress/integration/gateway/**/*.spec.js'],
    excludeSpecPattern: ['**/__snapshots__/*', '**/__image_snapshots__/*'],
    slowTestThreshold: 30000
  }
})
