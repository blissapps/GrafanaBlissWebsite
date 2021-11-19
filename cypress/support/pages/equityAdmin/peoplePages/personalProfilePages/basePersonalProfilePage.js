import BasePage from '../../../basePage'

const selectors = {
  overviewTab: 'div[id*=Overview]',
  addressAndContactTab: 'div[id*=Address]',
  bankAccountsTab: 'div[id*=Bank]',
  saveChangesButton: 'gs-button[id = saveChanges]'
}

/**
 *
 * This class is a common page for all common methods and/or locators over the pages located in the same level of this file (inside personalProfilePages folder)
 *
 */
class BasePersonalProfilePage extends BasePage {
  /**
   * Click in a tab by passing the first tab name
   *
   * @param {String} firstTabName Tabs can be either "overview", "address", or "bank"
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

      default:
        throw new Error('Option invalid. Tabs can be either "overview", "address", or "bank"')
    }
  }

  /**
   * Click in the "Save Changes" button to save all the changes made in the personal-profile pages
   */
  clickToSaveChanges() {
    cy.get(selectors.saveChangesButton)
      .scrollIntoView()
      .click()
  }
}

export default BasePersonalProfilePage
