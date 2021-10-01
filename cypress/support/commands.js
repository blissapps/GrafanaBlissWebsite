/**
 * TO AVOID ANY ERRORS WHEN CREATING A COMMAND,
 * DO NOT FORGET TO ADD THE METHOD SIGNATURE IN THE index.d.ts
 * FILE LOCATED IN cypress/support/
 */

/// <reference types="cypress" />

import 'cypress-waitfor'
import 'cypress-file-upload'
import 'cypress-iframe'
import 'cypress-wait-until'

const executeCommand = command => {
  cy.task('pluginExecuteCommand', command)
}

/**
 * Login command through the application UI with SESSION STORAGE
 *
 * @param {string} email email to login. The default variable is set in the cypress.json file
 * @param {string} password password to login. The default variable is set in the cypress.json file
 */
Cypress.Commands.add('login', (email = Cypress.env('DEFAULT_USER_AUTH'), password = Cypress.env('DEFAULT_PASSWORD_AUTH')) => {
  cy.session([email, password], () => {
    cy.visit('/')
    cy.get('#username-field').type(email)
    cy.get('#password-field').type(password, { log: false })
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500) // avoid element detached from the DOM. See https://github.com/cypress-io/cypress/issues/7306. A ticket was open https://globalshares.atlassian.net/browse/PB-828
    cy.get('#login').click()
    cy.url().should('contain', '/home')
  })
})

/**
 * Login command through the application UI without session STORAGE
 *
 * @param {string} email email to login. The default variable is set in the cypress.json file
 * @param {string} password password to login. The default variable is set in the cypress.json file
 */
Cypress.Commands.add('loginWithoutSession', (email = Cypress.env('DEFAULT_USER_AUTH'), password = Cypress.env('DEFAULT_PASSWORD_AUTH')) => {
  cy.visit('/')
  cy.get('#username-field').type(email)
  cy.get('#password-field').type(password, { log: false })
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(500) // avoid element detached from the DOM. See https://github.com/cypress-io/cypress/issues/7306. A ticket was open https://globalshares.atlassian.net/browse/PB-828
  cy.get('#login').click()
})

/**
 * Waits for XHR requests that may generate elements detached from the DOM after a successful login or in a refresh in the home page
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
  cy.wait(1500) // the menu is no stable yet due to some API duplicated calls. A ticket was open https://globalshares.atlassian.net/browse/PB-828
})

/**
 * Logout command through the application UI
 */
Cypress.Commands.add('logout', () => {
  cy.get('#profile-item').as('avatarBtn')
  cy.get('@avatarBtn').click()
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(500) // avoid element detached from the DOM. See https://github.com/cypress-io/cypress/issues/7306
  cy.get('#logoutButton').click()
})

/**
 * Insert or remove latency in the test to simulate slow connections
 * PS: When using this, you modify all chrome session.
 * So, remember to call the method again with latency = -1 in case you want to remove the latency for all tests in sequence
 *
 * @param {Number} latencyTime Time of latency to simulate a slow connection
 *
 * Only works on Chrome
 */
Cypress.Commands.add('changeNetworkLatency', (latencyTime = -1) => {
  cy.log('************ Inserting LATENCY:' + latencyTime + 'ms **************')
    .then(() => {
      return Cypress.automation('remote:debugger:protocol', {
        command: 'Network.enable'
      })
    })
    .then(() => {
      return Cypress.automation('remote:debugger:protocol', {
        command: 'Network.emulateNetworkConditions',
        params: {
          offline: false,
          latency: latencyTime,
          downloadThroughput: -1,
          uploadThroughput: -1
        }
      })
    })
    .then(() => {
      return Cypress.automation('remote:debugger:protocol', {
        command: 'Network.disable'
      })
    })
})

/**
 * Go online or offline
 *
 * @param {Object} options Object to control the network behavior. See examples.
 *
 * Only works on Chrome
 *
 * @example:
 * cy.network({ offline: true }) => Goes offline
 * cy.network({ offline: false }) => Goes Online
 */
Cypress.Commands.add('network', options => {
  cy.log('***************** Go offline: ' + options.offline + ' ********************')
  Cypress.automation('remote:debugger:protocol', {
    command: 'Network.enable'
  })

  Cypress.automation('remote:debugger:protocol', {
    command: 'Network.emulateNetworkConditions',
    params: {
      offline: options.offline,
      latency: 0,
      downloadThroughput: 0,
      uploadThroughput: 0,
      connectionType: 'none'
    }
  })

  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000) // Just to give a time to the browser to switch the internet connection mode
})

/**
 * Assert if the browser is connected to the internet or not
 *
 * Only works on Chrome
 *
 * @example:
 * cy.network({ online: true }) => Assert the browser is connected
 * cy.network({ online: false }) => Assert the browser is NOT connected
 */
Cypress.Commands.add('assertNetworkOnline', options => {
  return (
    cy
      // @ts-ignore
      .wrap(window)
      .its('navigator.onLine')
      .should('be.' + options.online)
  )
})

export default executeCommand
