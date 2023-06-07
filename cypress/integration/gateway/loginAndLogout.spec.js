import EquityGateway from '../../support/pages/equityGateway'

// @ts-ignore
const equityGateway = new EquityGateway()

describe('Login and Logout tests', () => {

    context('General Login Successful Scenarios', () => {
        /** General Account Login ACC Credentials Validation
         */
        it('Success Login ACC1', () => {
            equityGateway.LoginPage.login(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER_AUTH').toString(), Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH').toString())
            cy.url().should('contain', '/dashboard')
        })

        it('Success Login ACC2', () => {
            equityGateway.LoginPage.login('m1', Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH').toString())
            cy.url().should('contain', '/dashboard')
        })

        it('Success Login ACC3', () => {
            equityGateway.LoginPage.login('Paulandera', Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH').toString())
            cy.url().should('contain', '/dashboard')
        })
    })

    context('Logout Page Scenarios', () => {
        /** Related to User Stories
         *  EGVFOUR-247
         */
        beforeEach(() => {
            equityGateway.LoginPage.login()
        })

        it('C30426957 - Logout Page Validation', () => {
            const logoutInfo = [
                'You\'re logged out.',
                'Welcome to the company\'s equity plans portal, sponsored by Global Shares.',
                'Software version'
            ]
            const footerInfo = [
                'Privacy Policy',
                'Help'
            ]
            equityGateway.TopBar.accMenuClick(Cypress.env('EQUITY_GATEWAY_DEFAULT_ACC_NAME')+' Maddox', 'Logout')
            equityGateway.LogoutPage.checkPage(logoutInfo)
            equityGateway.LogoutPage.checkFooter(footerInfo)

        })

        it('C30426961 - Logout and Login Validation', () => {
            const logoutInfo = [
                'You\'re logged out.',
                'Welcome to the company\'s equity plans portal, sponsored by Global Shares.',
                'Software version'
            ]
            const footerInfo = [
                'Privacy Policy',
                'Help'
            ]
            equityGateway.TopBar.accMenuClick(Cypress.env('EQUITY_GATEWAY_DEFAULT_ACC_NAME')+' Maddox', 'Logout')
            equityGateway.LogoutPage.checkPage(logoutInfo)
            equityGateway.LogoutPage.checkFooter(footerInfo)
            equityGateway.LogoutPage.checkout()
            equityGateway.LoginPage.login()
            equityGateway.Dashboard.home(Cypress.env('EQUITY_GATEWAY_DEFAULT_ACC_NAME'))
        })
    })
})
