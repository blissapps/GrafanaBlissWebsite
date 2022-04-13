import EquityAdmin from '../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Login and Logout tests', { tags: ['@smoke'] }, () => {
  it('C16515484_Unsuccessful Login with wrong password', () => {
    equityAdmin.loginPage.loginWithoutSession(Cypress.env('DEFAULT_USER_AUTH'), 'Test@1234')
    equityAdmin.loginPage.assertUnsuccessfulLoginErrorMessageDisplayed(
      'You have an invalid username or password or your account is locked. Please try again or contact your service team to assist you.'
    )
  })

  it('C16515485_Successful Login', () => {
    equityAdmin.loginPage.loginWithoutSession()
    equityAdmin.homePage.checkPageUrl()
  })

  it('C16515486_Unsuccessful Login with wrong username', () => {
    equityAdmin.loginPage.loginWithoutSession('test@test.com', Cypress.env('DEFAULT_PASSWORD_AUTH'))
    equityAdmin.loginPage.assertUnsuccessfulLoginErrorMessageDisplayed(
      'You have an invalid username or password or your account is locked. Please try again or contact your service team to assist you.'
    )
  })

  it('C16515487_Logout from the application', () => {
    equityAdmin.loginPage.loginWithoutSession()
    cy.loginSuccessfulXHRWaits()
    equityAdmin.homePage.checkUrl('/home')
    equityAdmin.profileMenuNavBar.logout()

    equityAdmin.loginPage.checkUrl('/Account/Log')
  })

  it('C16515488_Login and Logout functionalities are persistent', () => {
    equityAdmin.loginPage.loginWithoutSession()
    cy.loginSuccessfulXHRWaits()
    equityAdmin.homePage.checkUrl('/home')
    equityAdmin.profileMenuNavBar.logout()

    equityAdmin.loginPage.checkUrl('/Account/Log')
    equityAdmin.loginPage.goBackOrForwardInBrowser('back')
    equityAdmin.loginPage.checkUrl('/Account/Log')
  })
})
