const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '6d27ms',
  chromeWebSecurity: false,
  trashAssetsBeforeRuns: true,
  numTestsKeptInMemory: 10,
  video: true,
  videoCompression: false,
  videoUploadOnPasses: true,
  defaultCommandTimeout: 15000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  retries: {
    runMode: 2,
    openMode: 0
  },
  screenshotOnRunFailure: true,
  screenshotConfig: {
    scale: false
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
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://ea-v3-at-10.gscloud.dev/',
    specPattern: 'cypress/integration/official/**/*.spec.js',
    excludeSpecPattern: ['**/__snapshots__/*', '**/__image_snapshots__/*'],
    experimentalSessionAndOrigin: true,
    slowTestThreshold: 30000
  }
})
