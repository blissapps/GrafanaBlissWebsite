import EquityGateway from '../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

describe('Login and Logout tests', () => {
    context('Unsuccessful scenarios', () => {
        /*it.skip('**C16515484** Unsuccessful Login with wrong password', () => {
            //TODO
            equityGateway.LoginPage.loginWithoutSession(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER_AUTH'), 'Test@1234')
        })

        it.skip('**C16515486** Unsuccessful Login with wrong username', () => {
            //TODO
        })*/
    })

    context('Successful scenarios', () => {
        before(() => {
            //TODO
            cy.visit(Cypress.env('ENV_ALPHA_25'))
        })

        it('**ID TO PLACE** Successful Login', () => {
            //TODO

        })

    })
})
