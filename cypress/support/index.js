// @ts-nocheck
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// References for autocomplete
/// <reference types="cypress"/>

import './commands.js'
import 'cypress-mochawesome-reporter/register'

// Hooks
beforeEach(() => {
  cy.log('Cypress test: ' + Cypress.currentTest.title)
  window.logCalls = 1
  window.testFlow = []
})

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-plugin-snapshots/commands'

// Alternatively you can use CommonJS syntax: require('./commands')
require('cypress-xpath')
require('@cypress/skip-test/support')

// Personalized logs
Cypress.Commands.overwrite('log', (originalFn, message) => {
  Cypress.log({
    displayName: `--- ${window.logCalls}. ${message} ---`,
    name: `--- ${window.logCalls}. ${message} ---`,
    message: ''
  })

  window.testFlow.push(`${window.logCalls}. ${message}`)
  window.logCalls++
})

// In case a test fails, always display all the logs as a workflow in the end (In case logs are being used)
Cypress.on('fail', error => {
  throw new Error(error + '\n\nTest flow:\n' + window.testFlow.join('\n'))
})

// General Settings for screenshots naming
Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`
    addContext({ test }, `assets/${Cypress.spec.name}/${screenshotFileName}`)
  }
})

// Returning false here prevents Cypress from failing the test
// eslint-disable-next-line no-unused-vars
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
