// @ts-nocheck

/**
 * TO AVOID ANY ERRORS WHEN CREATING A COMMAND,
 * DO NOT FORGET TO ADD THE METHOD SIGNATURE IN THE index.d.ts
 * FILE LOCATED IN cypress/support/
 */

// References for global autocomplete
/// <reference types="cypress" />

import 'cypress-iframe'
import 'cypress-wait-until'

const executeCommand = (command) => {
  cy.task('pluginExecuteCommand', command)
}

/**
 * Waits for XHR requests that may generate elements detached from the DOM after a successful login or in a refresh in the home page for the Equity Admin
 *
 * Even though we are using intercepts and waiting for them, these interception are being called more than 1 single time,
 * which are not sufficient because the front-end call some XHR calls twice (I don't know why).
 * To see this behavior, open Chrome dev tools and check this behavior right after the login (XHR examples are 'Self' and 'Permissions').
 *
 */
Cypress.Commands.add('loginSuccessfulXHRWaits', () => {
  // Avoid elements detached from the DOM when loading at the home page right after the login
  cy.intercept('GET', '/api/Clients?$orderby=name**count=true').as('waitsClientsToBeLoaded')
  cy.intercept('GET', '/api/Users/Self/Tenants/**/Permissions').as('waitsPermissionsToBeReceived')

  cy.wait('@waitsClientsToBeLoaded', { timeout: 10000 })
  cy.wait('@waitsPermissionsToBeReceived', { timeout: 20000 })

  cy.waitUntil(() => cy.getCookie('SERVERID').then((cookie) => Boolean(cookie && cookie.value)))
  cy.waitUntil(() => cy.getCookie('idsrv').then((cookie) => Boolean(cookie && cookie.value)))
  cy.waitUntil(() => cy.getCookie('idsrv.session').then((cookie) => Boolean(cookie && cookie.value)))

  cy.intercept({ method: 'POST', url: 'https://rs.fullstory.com/rec/page' }, { success: true })

  cy.forcedWait(1000) // the menu is no stable yet due to some API duplicated calls. A ticket was open https://globalshares.atlassian.net/browse/PB-828
})

/**
 * Insert or remove latency in the test to simulate slow connections
 * PS: When using this, you modify all chrome session.
 * So, remember to call the method again with latency = -1 in case you want to remove the latency for all tests in sequence
 *
 * @param {number} latencyTime Time of latency to simulate a slow connection
 *
 * @only_chrome  Only works on Chrome
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
 * @param {object} options Object to control the network behavior. See examples.
 *
 * Only works on Chrome
 *
 * @example:
 * cy.network({ offline: true }) => Goes offline
 * cy.network({ offline: false }) => Goes Online
 */
Cypress.Commands.add('network', (options) => {
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

  cy.forcedWait(1000) // Just to give a time to the browser to switch the internet connection mode
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
Cypress.Commands.add('assertNetworkOnline', (options) => {
  return (
    cy
      // @ts-ignore
      .wrap(window)
      .its('navigator.onLine')
      .should('be.' + options.online)
  )
})

/**
 * Wait for a explicity amount of time. It is the same as using cy.wait(), but without generating a warning
 *
 * @param {number} time Time im milliseconds to explicit wait
 */
Cypress.Commands.add('forcedWait', (time) => {
  cy.wait(time)
})

/**
 * Get a token from authentication server - Hard coded for alpha14 in the moment
 *
 */
Cypress.Commands.add('getBearerToken', () => {
  cy.request({
    url: Cypress.env('AUTH_API_ALPHA_14'),
    method: 'POST',
    body: {
      grant_type: 'client_credentials',
      client_id: Cypress.env('CLIENT_ID'),
      client_secret: Cypress.env('CLIENT_SECRET'),
      scope: Cypress.env('SCOPE')
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    }
  }).then((response) => {
    cy.log(JSON.stringify(response))

    return cy.wrap(response.body.access_token)
  })
})

/**
 * Purge a client - Send it to the Initiated state
 *
 * Alpha env:   http://10.132.3.203:8083
 * Staging env: http://10.204.0.102:8083
 * Mirror env:  http://10.204.0.102:8083
 *
 * @param {number} clientId Client id number to be sent to Initiated state
 */
Cypress.Commands.add('purgeClient', (clientId) => {
  cy.getBearerToken().then((token) => {
    cy.request({
      method: 'POST',
      url: 'http://10.132.3.203:8083/api/v1/TestingCommands/purge-client/' + clientId,
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  })
})

export default executeCommand
