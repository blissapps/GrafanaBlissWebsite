import EquityGateway from '../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

describe('Login and Logout Tests', () => {
  context('General Login Successful Scenarios', () => {
    /** General Account Login ACC Credentials Validation
     */
    it('Success Login ACC1', () => {
      equityGateway.LoginPage.login()
      equityGateway.DashboardPage.checkPageUrl()
      //Check used User
      cy.log('USER USED: ' + equityGateway.LoginPage.getLastUser())
    })

    it('Success Login ACC2', () => {
      equityGateway.LoginPage.login('m1')
      equityGateway.DashboardPage.checkPageUrl()
    })

    it('Success Login ACC3', () => {
      equityGateway.LoginPage.login('Paulandera')
      equityGateway.DashboardPage.checkPageUrl()
    })
  })

  context('General Login Unsuccessful Scenarios', () => {
    /** General Account Login ACC Credentials Validation
     */
    it('Login without User', () => {
      equityGateway.LoginPage.login(null, Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
      equityGateway.LoginPage.errorToast()
    })

    it('Login without PW', () => {
      equityGateway.LoginPage.login('Paulandera', null)
      equityGateway.LoginPage.errorToast()
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
      const logoutInfo = ["You're logged out.", "Welcome to the company's equity plans portal, sponsored by Global Shares.", 'Software version']
      const footerInfo = ['Privacy Policy', 'Help']

      equityGateway.TopBar.accMenuClick(null, 'Logout')
      equityGateway.LogoutPage.checkPage(logoutInfo)
      equityGateway.LogoutPage.checkFooter(footerInfo)
    })

    it('C30426961 - Logout and Login Validation', () => {
      const logoutInfo = ["You're logged out.", "Welcome to the company's equity plans portal, sponsored by Global Shares.", 'Software version']
      const footerInfo = ['Privacy Policy', 'Help']
      equityGateway.TopBar.accMenuClick(null, 'Logout')
      equityGateway.LogoutPage.checkPage(logoutInfo)
      equityGateway.LogoutPage.checkFooter(footerInfo)
      equityGateway.LogoutPage.checkout()
      equityGateway.LoginPage.login()
      equityGateway.DashboardPage.home(Cypress.env('EQUITY_GATEWAY_DEFAULT_ACC_1ST_NAME'))
    })
  })
})
