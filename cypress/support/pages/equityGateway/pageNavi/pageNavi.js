import BasePage from '../../basePage'
import HelpForm from '../helpForm/helpForm'
import SideMenuBar from '../sideMenuBar/sideMenuBar'

// @ts-ignore
//TODO [Fix the selectors with navigation and div dependencies]
const selectors = {
  welcomePageHelp: 'a.ng-star-inserted',
  dashboardDropdown: 'gs-button.icon.medium.square.flat',
  dropdownPersonalInfo: '.eg-header__dropdown > :nth-child(1)' //FIXME (needs to be fixed nav dependent)
}

class PageNavi extends BasePage {
  helpForm = new HelpForm()

  /** Navigates to the Helpdesk Page without authentication validates the URL
   */
  navigateToHelpDeskNoAuth() {
    cy.visit(`${Cypress.env('EQUITY_GATEWAY_BASE_URL')}`, { failOnStatusCode: false })
    cy.get(selectors.welcomePageHelp).click()
    this.helpForm.validateFormElements(false)
  }

  /** Navigates to Helpdesk Page through the Dashboard after authentication validates the URL
   */
  navigateToHelpDeskAuth() {
    const sideMenuBar = new SideMenuBar()
    sideMenuBar.support('/help')
    this.helpForm.validateFormElements()
  }

  /** After login the user is in dashboard and validates the URL
   */
  navigateToDashboard() {
    // User logs in
    cy.url().should('contain', '/dashboard')
  }

  /** Navigates to the Personal Information page and validates he URL
   */
  navigateToMyAccountProfile() {
    // User logs in and is in dashboard
    cy.get(selectors.dashboardDropdown).click()
    cy.get(selectors.dropdownPersonalInfo).click()
    cy.url().should('contains', 'my-account/profile/personal-information')
  }

  /** Navigates to the salesWizardStep page and validates if the URL is redirected to sale-wizard/overview
   * @param {string} salesWizardStep (the desired Sales Wizard Step to navigate to)
   */
  navigateToSalesWizard(salesWizardStep = '') {
    cy.log(`SALES WIZARD PAGE TO NAVIGATE: ${salesWizardStep}`)
    cy.visit(`https://eg-v4-alpha-25.gsapps.dev/sale-wizard/${salesWizardStep}`, { failOnStatusCode: false })
    cy.url().should('contain', '/sale-wizard/overview')
  }

  /** Navigates to the Activity page and validates he URL
   */
  navigateToActivity(){
    // User logs in
    cy.visit('https://eg-v4-alpha-25.gsapps.dev/activity', { failOnStatusCode: false })
    cy.url().should('contain', '/activity')
  }
}

export default PageNavi