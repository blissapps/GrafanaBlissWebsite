/// <reference types="cypress" />

import 'cypress-waitfor'
import 'cypress-file-upload'
import 'cypress-iframe'
import 'cypress-wait-until'

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
})

/**
 * Waits for XHR requests that may generate elements detached from the DOM after a successful login
 *
 * Even though we are using intercepts and waiting for them, these interception are being called more than 1 single time,
 * which are not sufficient because the front-end call some XHR calls twice (I don't know why).
 * To see this behavior, open Chrome dev tools and check this behavior right after the login (XHR examples are 'Self' and 'Permissions').
 *
 */
Cypress.Commands.add('loginSuccessfulXHRWaits', () => {
  // Avoid elements detached from the DOM when loading at the home page right after the login
  cy.intercept('GET', '/api/Clients?$orderby=name**count=true').as('waitsClientsToBeLoaded')
  cy.intercept('GET', '/api/Tenants?$orderby=name&$top=**count=true').as('waitsTenantsToBeLoaded')
  cy.intercept('GET', '/api/Users/Self/Tenants/**/Permissions').as('waitsPermissionsToBeReceived')
  cy.intercept('GET', '/api/Users/Self').as('waitsUserSelf')

  cy.wait('@waitsClientsToBeLoaded', { timeout: 10000 })
  cy.wait('@waitsTenantsToBeLoaded', { timeout: 10000 })
  cy.wait('@waitsPermissionsToBeReceived', { timeout: 20000 })
  cy.wait('@waitsUserSelf', { timeout: 20000 })

  cy.waitUntil(() => cy.getCookie('SERVERID').then(cookie => Boolean(cookie && cookie.value)))
  cy.waitUntil(() => cy.getCookie('idsrv').then(cookie => Boolean(cookie && cookie.value)))
  cy.waitUntil(() => cy.getCookie('idsrv.session').then(cookie => Boolean(cookie && cookie.value)))

  cy.intercept({ method: 'POST', url: 'https://rs.fullstory.com/rec/page' }, { success: true })

  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1500) // the menu is no stable yet. As soon as it is resolved, we are gonna remove this from here. See https://github.com/cypress-io/cypress/issues/7306
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
