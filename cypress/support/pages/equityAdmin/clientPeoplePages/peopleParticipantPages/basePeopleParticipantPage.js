import BasePage from '../../../basePage'

const selectors = {
  companyNavigationMenuButton: 'hearth-participant-record-navigation a:nth-child(3)',
  saveChangesButton: 'gs-button#saveChanges'
}

/**
 *
 * This class is a common page for all common methods and/or locators over all the pages inside peopleParticipantPages folder
 *
 */
class BasePeopleParticipantPage extends BasePage {
  // --------------------------------------------------------------------------- CLICKS  ----------------------------------------------------------------------------- //
  /**
   * Click in some item in the participant navigation menu
   *
   * @param {string} menuName The name of the menu that it is going to be clicked. It can be personal, company, tax, sale, or primary
   */
  clickOnTheParticipantNavigationMenu(menuName) {
    menuName = menuName.toLowerCase()
    switch (menuName) {
      case 'personal':
        cy.log('TO BE IMPLEMENTED')
        break

      case 'company':
        cy.get(selectors.companyNavigationMenuButton).click()
        break

      case 'tax':
        cy.log('TO BE IMPLEMENTED')
        break

      case 'sale':
        cy.log('TO BE IMPLEMENTED')
        break

      case 'primary':
        cy.log('TO BE IMPLEMENTED')
        break

      default:
        throw new Error('Please, choose a valid option. It can be personal, company, tax, sale, or primary')
    }
  }

  /**
   * Click in the "Save Changes" button to save all the changes made in the personal-profile pages
   */
  clickToSaveChanges() {
    cy.get(selectors.saveChangesButton).scrollIntoView().click()
  }

  /**
   * Click in a tab by passing the first tab name
   *
   * @param {string} firstTabName Tabs can be either "overview", "address", "bank", or payroll
   */
  clickTab(firstTabName) {
    firstTabName = firstTabName.toLowerCase()

    switch (firstTabName) {
      case 'overview':
        cy.get(selectors.overviewTab).click()
        break

      case 'address':
        cy.get(selectors.addressAndContactTab).click()
        break

      case 'bank':
        cy.get(selectors.bankAccountsTab).click()
        break

      case 'payroll':
        cy.get(selectors.payrollInformationTab).click()
        break

      default:
        throw new Error('Option invalid. Tabs can be either "overview", "address", "bank", or payroll')
    }
  }

  // --------------------------------------------------------------------------- ASSERTIONS  ----------------------------------------------------------------------------- //

  /**
   * Assert if an error message is displayed for a field given an element locator
   *
   * @param {string} elementLocator Element locator to assert if there is a error message to it or not
   * @param {string} textToBeValidated Send a text in this parameter to also validate the content of the error message.
   * @param {boolean} displayed True to validate if the error message is displayed, and false for otherwise
   * @returns
   */
  assertErrorMessageDisplayedInParticipantField(elementLocator, textToBeValidated = '', displayed = true) {
    if (!displayed) {
      return cy.get(elementLocator + ' div.message').should('not.exist')
    }

    if (textToBeValidated === '') {
      cy.get(elementLocator + ' div.message')
        .scrollIntoView()
        .should('be.visible')
    } else {
      cy.get(elementLocator + ' div.message')
        .scrollIntoView()
        .should('be.visible')
        .should('contain.text', textToBeValidated)
    }
  }
}

export default BasePeopleParticipantPage
