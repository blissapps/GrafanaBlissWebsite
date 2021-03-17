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
  cy.visit(Cypress.env('loginAuthURL'))
  cy.get('#username-field').type(email)
  cy.get('#password-field').type(password)
  cy.get('#login').click()
})

/**
 * Logout command through the application UI
 */
Cypress.Commands.add('logout', () => {
  cy.get('#profile-item').click()
  cy.get('a.logout').click()
})

export default executeCommand
