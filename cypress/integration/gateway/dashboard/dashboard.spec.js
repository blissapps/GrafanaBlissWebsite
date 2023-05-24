import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Login and Logout tests', () => {
    context('Successful scenarios', () => {
        // Caching session when logging in via page visit
        beforeEach(() => {
            equityGateway.LoginPage.login()
            //cy.loginWithUI(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER_AUTH'), Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
        })

        it('Dashboard Home Validation', () => {
            equityGateway.Dashboard.home(Cypress.env('EQUITY_GATEWAY_DEFAULT_ACC_NAME'))
        })

        it('Portfolio - Filter by Status', () => {
            equityGateway.Portfolio.filter(0) //Filter '0' stands for 'By Status'
            equityGateway.Portfolio.content('Available', 'Unavailable')
        })

        it('Portfolio - Filter by Type', () => {
            equityGateway.Portfolio.filter(1) //Filter '1' stands for 'By Type'
            equityGateway.Portfolio.content('Options', 'Shares')
        })

        it('Portfolio - Filter by Plan', () => {
            equityGateway.Portfolio.filter(2) //Filter '2' stands for 'By Plan'
            equityGateway.Portfolio.content('SAYE', 'Employee purchase plan')
        })

    })

    context('Unsuccessful scenarios', () => {
            //TODO
    })
})
