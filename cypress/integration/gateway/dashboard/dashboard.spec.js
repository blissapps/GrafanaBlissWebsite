import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Dashboard page tests', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login()
        //cy.loginWithUI(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER_AUTH'), Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
    })
    context('General test scenarios', () => {
        it('Dashboard Home Validation', () => {
            //We must pass the account 1st name and href to the dashboard page
            equityGateway.Dashboard.home(Cypress.env('EQUITY_GATEWAY_DEFAULT_ACC_NAME'), '/dashboard')
        })

    })

    context('EGVFOUR-42 - Top Navigation Bar', () => {
        it('Topbar Validation', () => {
            //The name on Topbar must be displayed as "full name" 1st and last name(1st name is a ENV variable)
            equityGateway.Topbar.accDetails(Cypress.env('EQUITY_GATEWAY_DEFAULT_ACC_NAME')+' Maddox')
        })
    })
    context('Side Navigation Bar', () => {
        //TODO
        it('Sidebar shares validation', () => {
            //We must pass the URL that Support Page should contain
            equityGateway.Sidebar.shareInfo()
        })

        it('EGVFOUR-43 - Sidebar Pages Validation', () => {
            equityGateway.Sidebar.pages()
            //We must pass the URL that Support Page should contain
            equityGateway.Sidebar.support('/help')
        })
    })

    context('Side Navigation Bar Share Details', () => {
        //TODO
    })

    context('Component Header', () => {
        //TODO
    })

    context('Component Header Share Details', () => {
        //TODO
    })

    context('Component Footer', () => {
        //TODO
    })
    context('Portfolio Breakdown', () => {
        it('Portfolio - General view', () => {
            equityGateway.Portfolio.portfolioBasis( '1117') //label1 must be the amount of Units allocated to the Test Account
        })

        it('EGVFOUR-53 - Portfolio - Filter by Status', () => {
            equityGateway.Portfolio.filter(0) //Filter '0' stands for 'By Status'
            equityGateway.Portfolio.filterContent('Available', 'Unavailable')
        })

        it('EGVFOUR-54 - Portfolio - Filter by Type', () => {
            equityGateway.Portfolio.filter(1) //Filter '1' stands for 'By Type'
            equityGateway.Portfolio.filterContent('Options', 'Shares')
        })

        it('EGVFOUR-55 - Portfolio - Filter by Plan', () => {
            equityGateway.Portfolio.filter(2) //Filter '2' stands for 'By Plan'
            equityGateway.Portfolio.filterContent('SAYE', 'Employee purchase plan')
        })

        //TODO
    })
    context('Activity', () => {
        //TODO
    })
})
