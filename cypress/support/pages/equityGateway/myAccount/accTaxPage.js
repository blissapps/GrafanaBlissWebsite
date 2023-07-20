import BasePage from '../../basePage'

const selectors = {
  header: 'h1',
  infoSector: '[data-test-id="tax-report"]',
  yearMenu: '[data-test-id="tax-list-select-year"] > div > div',
  menuOptions: '#option',
  typeMenu: '[data-test-id="tax-list-select-type"] > div > div',
  reportsContent: '[data-test-id="tax-list"]'
}

class accTaxPage extends BasePage {
  header(title) {
    cy.get(selectors.header).should('contain.text', title)
  }

  infoSector(info) {
    info.forEach((item) => {
      cy.get(selectors.infoSector).contains(item).should('exist')
    })
  }

  yearMenuSelect(position, positionName) {
    cy.get(selectors.yearMenu)
      .click()
      .get(selectors.menuOptions + (position - 1).toString()) // Convert position to string
      .should('have.text', positionName)
      .click()
  }

  typeMenuSelect(position, positionName) {
    cy.get(selectors.typeMenu)
      .click()
      .get(selectors.menuOptions + (position - 1).toString()) // Convert position to string
      .should('have.text', positionName)
      .click()
  }

  reportsElements(elements, exist) {
    elements.forEach((item) => {
      cy.get(selectors.reportsContent).contains(item).should(exist)
    })
  }
}

export default accTaxPage