import BasePage from '../../../../basePage'

const selectors = {
  notLinkedTab: '*[id*="Not Linked"]',
  linkedTab: '*[id*="Linked "]:last-child'
}

class BaseFrameworkByClientLinkedPage extends BasePage {
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
}

export default BaseFrameworkByClientLinkedPage
