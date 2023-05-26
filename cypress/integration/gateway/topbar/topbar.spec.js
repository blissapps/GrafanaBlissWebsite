import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

describe('Topbar tests', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login() //Workaround for now
        //cy.loginWithUI(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER_AUTH'), Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
    })

    context('Top Navigation Bar', () => {
        it('EGVFOUR- 42 - Topbar Acc name Validation', () => {
            //The name on Topbar must be displayed as "full name" 1st and last name(1st name is a ENV variable)
            equityGateway.Topbar.accDetails(Cypress.env('EQUITY_GATEWAY_DEFAULT_ACC_NAME')+' Maddox')
        })

        it('EGVFOUR- 109 - Topbar ACC Menu Validation', () => {
            //Check Menu and URLS
            equityGateway.Topbar.accMenu()
        })
    })
})
