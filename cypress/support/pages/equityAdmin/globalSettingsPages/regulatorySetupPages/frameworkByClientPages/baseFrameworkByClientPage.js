import BasePage from '../../../../basePage'

const selectors = {
  notLinkedTab: '*[id*="Not Linked"]',
  linkedTab: '*[id*="Linked "]:last-child'
}

class BaseFrameworkByClientLinkedPage extends BasePage {
  // ----------------------------------------------------------------- CLICKS -------------------------------------------------------------------- //

  /**
   * Click in the Not Linked tab
   */
  clickNotLinkedTab() {
    cy.get(selectors.notLinkedTab).click()
  }

  /**
   * Click in the Linked tab
   */
  clickLinkedTab() {
    cy.get(selectors.linkedTab).click()
  }

  // ----------------------------------------------------------------- ASSERTIONS -------------------------------------------------------------------- //

  /**
   * Assert the number of Not Linked frameworks by checking the tab counter
   *
   * @param {string} tabName The name of the name. It can be both "not linked" or "linked"
   * @param {number} number The number to be asserted in the Not linked Tab
   *
   * @example
   * Send tabName = "linked " and number=10 to assert the linked tab will count 10 frameworks, like this: Linked (10)
   */
  assertTheNumberOfRecordsCountedInTheTab(tabName, number) {
    tabName = tabName.toLowerCase()
    const regexRecords = `.*${number}.*$`

    switch (tabName) {
      case 'not linked':
        cy.get(selectors.notLinkedTab).find('.tab-title').contains(new RegExp(regexRecords))
        break

      case 'linked':
        cy.get(selectors.linkedTab).find('.tab-title').contains(new RegExp(regexRecords))
        break

      default:
        throw new Error('Option invalid for tabName. Use either "not linked" or "linked" only!')
    }
  }
}

export default BaseFrameworkByClientLinkedPage
