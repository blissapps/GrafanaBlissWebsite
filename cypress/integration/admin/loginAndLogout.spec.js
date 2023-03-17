import EquityAdmin from '../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

// @ts-ignore
describe('Login and Logout tests', () => {
  context('Unsuccessful scenarios', () => {
    it('C16515484 Unsuccessful Login with wrong password', () => {
      equityAdmin.loginPage.loginWithoutSession(Cypress.env('DEFAULT_USER_AUTH'), 'Test@1234')
      equityAdmin.loginPage.assertUnsuccessfulLoginErrorMessageDisplayed(
        'You have an invalid username or password or your account is locked. Please try again or contact your service team to assist you.'
      )
    })

    it('C16515486 Unsuccessful Login with wrong username', () => {
      equityAdmin.loginPage.loginWithoutSession('test@test.com', Cypress.env('DEFAULT_PASSWORD_AUTH'))
      equityAdmin.loginPage.assertUnsuccessfulLoginErrorMessageDisplayed(
        'You have an invalid username or password or your account is locked. Please try again or contact your service team to assist you.'
      )
    })
  })

  context('Successful scenarios', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login()
      equityAdmin.homePage.checkPageUrl()
    })

    it('C16515485 Successful Login', () => {
      cy.log('Test passes - scenario covered on the hook')
    })

    it('C16515487 Logout from the application', () => {
      equityAdmin.applicationLeftMenuBar.openProfileMenuBar()
      equityAdmin.profileMenuNavBar.clickToSignOut()

      equityAdmin.loginPage.checkUrl('/Account/Log')
    })

    it('C16515488 Login and Logout functionalities are persistent', () => {
      equityAdmin.applicationLeftMenuBar.openProfileMenuBar()
      equityAdmin.profileMenuNavBar.clickToSignOut()

      equityAdmin.loginPage.checkUrl('/Account/Log')
      equityAdmin.loginPage.goBackOrForwardInBrowser('back')
      equityAdmin.loginPage.checkUrl('/Account/Log')
    })
  })
})
