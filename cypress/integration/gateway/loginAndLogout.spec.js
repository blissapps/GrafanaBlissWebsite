import EquityGateway from '../../support/pages/equityGateway'

// @ts-ignore
const equityGateway = new EquityGateway()

describe('Login and Logout tests', () => {
    context('Unsuccessful scenarios', () => {
        /*it.skip('**C16515484** Unsuccessful Login with wrong password', () => {
            equityGateway.LoginPage.loginWithoutSession(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER_AUTH'), 'Test@1234')
        }) */
    })

    context('Successful scenarios', () => {
        /*
        before(() => {
            cy.visit(Cypress.env('EQUITY_GATEWAY_BASE_URL'))
        }) */
    })
})
