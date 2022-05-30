import EquityAdmin from '../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Login and Logout tests', { tags: ['@smoke'] }, () => {
  context('Unsuccessful scenarios', () => {
    it('C16515484 Unsuccessful Login with wrong password', () => {
      equityAdmin.loginPage.login(Cypress.env('DEFAULT_USER_AUTH'), 'Test@1234', false)
      equityAdmin.loginPage.assertUnsuccessfulLoginErrorMessageDisplayed(
        'You have an invalid username or password or your account is locked. Please try again or contact your service team to assist you.'
      )
    })

    it('C16515486 Unsuccessful Login with wrong username', () => {
      equityAdmin.loginPage.login('test@test.com', Cypress.env('DEFAULT_PASSWORD_AUTH'), false)
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
