import BasePage from '../../../basePage'

const selectors = {
  companyNavigationMenuButton: 'hearth-participant-record-navigation a:nth-child(3)'
}

/**
 *
 * This class is a common page for all common methods and/or locators over all the pages inside peoplePages folder
 *
 */
class BasePeopleParticipantPage extends BasePage {
  /**
   * Click in some item in the participant navigation menu
   *
   * @param {String} menuName The name of the menu that it is going to be clicked. It can be personal, company, tax, sale, or primary
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
   * Assert if an error message is displayed for a field given an element locator
   *
   * @param {String} elementLocator Element locator to assert if there is a error message to it or not
   * @param {String} textToBeValidated Send a text in this parameter to also validate the content of the error message.
   * @param {Boolean} displayed True to validate if the error message is displayed, and false for otherwise
   * @returns
   */
  assertErrorMessageDisplayedInParticipantField(elementLocator, textToBeValidated = '', displayed = true) {
    if (!displayed) {
      return cy.get(elementLocator + ' div.message').should('not.exist')
    }

    if (textToBeValidated == '') {
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
