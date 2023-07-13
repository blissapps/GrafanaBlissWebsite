import BasePage from '../../basePage'

class AccBase extends BasePage {
  goToMyAccPage(pageName) {
    cy.window().then((win) => {
      switch (pageName) {
        case 'Personal Information':
          // @ts-ignore
          win.location.href = Cypress.env('EQUITY_GATEWAY_BASE_URL') + '/my-account/profile/personal-information'
          break
        case 'Bank account':
          // @ts-ignore
          win.location.href = Cypress.env('EQUITY_GATEWAY_BASE_URL') + '/my-account/account-preferences/bank-account'
          break
        case 'Payments':
          // @ts-ignore
          win.location.href = Cypress.env('EQUITY_GATEWAY_BASE_URL') + '/my-account/account-preferences/payments'
          break
        case 'Password & Security':
          //TODO not developed yet
          break
        case 'Language':
          // @ts-ignore
          win.location.href = Cypress.env('EQUITY_GATEWAY_BASE_URL') + '/my-account/account-preferences/language'
          break
        case 'Tax documents':
          //@ts-ignore
          win.location.href = Cypress.env('EQUITY_GATEWAY_BASE_URL') + '/help'
          break
        default:
          //By default, go to personal information page
          //@ts-ignore
          win.location.href = Cypress.env('EQUITY_GATEWAY_BASE_URL') + '/my-account/profile/personal-information'
      }
    })
  }
}

export default AccBase