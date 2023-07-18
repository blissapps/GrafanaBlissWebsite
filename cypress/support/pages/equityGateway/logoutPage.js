import BasePage from '../basePage'

const selectors = {
  logBackBtn: '.primary-button',
  logoutInfoSector: '.ng-star-inserted',
  footerInfoSector: 'eg-footer'
}

class LoginPage extends BasePage {
  checkPage(expectedInfo) {
    this.checkUrl(Cypress.env('EQUITY_GATEWAY_BASE_URL') + '/welcome')
    expectedInfo.forEach((item) => {
      cy.get(selectors.logoutInfoSector).contains(item).should('exist')
    })
  }

  checkFooter(expectedInfo) {
    expectedInfo.forEach((item) => {
      cy.get(selectors.footerInfoSector).contains(item).should('exist')
    })
  }

  checkout() {
    cy.get(selectors.logBackBtn).contains('Log back in').click()
    cy.url().should('include', '/welcome')
  }
}

export default LoginPage
