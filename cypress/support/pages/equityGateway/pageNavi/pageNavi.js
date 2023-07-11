import BasePage from '../../basePage'
import HelpFormPage from '../helpForm/helpFormPage'

class PageNavi extends BasePage {
  helpForm = new HelpFormPage()

  /** After login the user is in dashboard and validates the URL
   */
  pageNaviUrlValidation(urlNavigation) {
    cy.url().should('contain', urlNavigation)
  }

  /** Navigates to the salesWizardStep page and validates if the URL is redirected to sale-wizard/overview
   * @param {string} salesWizardStep (the desired Sales Wizard Step to navigate to)
   */
  checkSalesWizardRedirect(salesWizardStep = '') {
    cy.window().then((win) => {
      // @ts-ignore
      win.location.href = (`${Cypress.env('EQUITY_GATEWAY_BASE_URL')}/sale-wizard/${salesWizardStep}`)
    })
    cy.url().should('contain', '/sale-wizard/overview')
  }
}

export default PageNavi
