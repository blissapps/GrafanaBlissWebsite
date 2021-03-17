// @ts-nocheck
import BasePage from './basePage'

const selectors = {
  searchProductInput: '#search_query_top',
  searchProductBtn: '#searchbox > .btn'
}

class HomePage extends BasePage {
  visit() {
    cy.visit('/')
  }

  getMenuCategoryLink(categoryName) {
    return cy.xpath('//div[@id="block_top_menu"]//a[@title="' + categoryName + '"]')
  }

  searchForProduct(productName) {
    this.typeInputValueById(selectors.searchProductInput, productName)
    cy.get(selectors.searchProductBtn).click()
  }
}

export default HomePage
