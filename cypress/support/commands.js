/// <reference types="cypress" />

import 'cypress-waitfor'
import 'cypress-file-upload'
import 'cypress-iframe'

const executeCommand = command => {
  cy.task('pluginExecuteCommand', command)
}

/**
 * Login command through the application UI
 * @param {string} email email to login. The default variable is set in the cypress.json file
 * @param {string} password password to login. The default variable is set in the cypress.json file
 */
Cypress.Commands.add('login', (email = Cypress.env('defaultUserAuth'), password = Cypress.env('defaultPasswordAuth')) => {
  cy.visit('/')
  cy.get('#username-field').type(email)
  cy.get('#password-field').type(password)
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(500) // avoid element detached from the DOM. See https://github.com/cypress-io/cypress/issues/7306
  cy.get('#login').click()

  // Avoid elements detached from the DOM when loading the home page right after the login
  cy.intercept('GET', '/api/Users/Self/Tenants/**').as('waitsSettingsToBeLoaded')
  cy.intercept('GET', '/api/Tenants?*').as('waitsMenuToBeLoaded')
  cy.intercept('GET', '/api/Users/Self/Tenants/**/Permissions*').as('waitsPermissionsToBeReceived')
  cy.wait('@waitsSettingsToBeLoaded', { requestTimeout: 10000 })
  cy.wait('@waitsMenuToBeLoaded', { requestTimeout: 20000 })
  cy.wait('@waitsPermissionsToBeReceived', { requestTimeout: 20000 })
})

/**
 * Logout command through the application UI
 */
Cypress.Commands.add('logout', () => {
  cy.get('.count') // Wait for this element to make sure all the content is loaded (the left bar has a bug if you click in the settings button before everything is loaded, the left bar closes automatically)
  cy.get('#profile-item').click()
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(500) // avoid element detached from the DOM. See https://github.com/cypress-io/cypress/issues/7306
  cy.get('a.logout').click()
})

export default executeCommand
