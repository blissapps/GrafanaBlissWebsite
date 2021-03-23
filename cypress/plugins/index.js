// @ts-nocheck
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
const { initPlugin } = require('cypress-plugin-snapshots/plugin')
// const selectTestsWithGrep = require('cypress-select-tests/grep')
const tagify = require('cypress-tags')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  //on('file:preprocessor', selectTestsWithGrep(config))
  on('file:preprocessor', tagify(config))
  on('before:browser:launch', (launchOptions, browser = {}) => {
    if (browser.family === 'chromium') {
      launchOptions.args.push(
        '--ignore-certificate-errors',
        '--disable-gpu',
        '--window-size=1920,1080',
        '--start-maximized',
        '--no-sandbox',
        '--proxy-server="direct://"',
        '--proxy-bypass-list=*'
      )
      // launchOptions.args.push("--ignore-certificate-errors", "--disable-gpu", "--window-size=1920,1080", "--start-maximized", "--no-sandbox")

      return launchOptions
    }
  })

  initPlugin(on, config)
}
