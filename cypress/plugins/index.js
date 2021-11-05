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

// Plugin snapshot variables:
const { initPlugin } = require('cypress-plugin-snapshots/plugin')

// Tags variables:
const tagify = require('cypress-tags')
// const selectTestsWithGrep = require('cypress-select-tests/grep')

// Reporter
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib')
const exec = require('child_process').execSync

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

  on('before:run', async details => {
    console.log('override before:run')
    await beforeRunHook(details)
  })

  on('after:run', async () => {
    console.log('override after:run')
    await afterRunHook()
    await exec('yarn jrm ./cypress/test-results/JUnitReport.xml ./cypress/test-results/junit/*.xml')
  })

  initPlugin(on, config)
}
