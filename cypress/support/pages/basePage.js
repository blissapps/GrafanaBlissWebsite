/**
 * This is the basePage class with all basic methods we can use across all the pages
 */

const selectors = {
  clearAllFiltersButton: '#clearButton'
}

class BasePage {
  /**
   * Get an element by passing a text
   *
   * @param {string} text text to get the element
   *
   * @returns the element if found
   */
  getElementByText(text) {
    // return cy.xpath(`//*[normalize-space(text()) = '${text}']`)
    return cy.contains(text)
  }

  /**
   * Check url
   *
   * @param {string} url The entire url or a part of it
   *
   * @returns The assertion if the url exists or not
   */
  checkUrl(url) {
    return cy.url().should('include', url)
  }

  /**
   * Check url by passing a regex
   *
   * @param {RegExp} url The entire url or a part of it. Is is a string like this: /regex/
   *
   * @returns The assertion if the url exists or not
   */
  checkUrlByRegex(url) {
    return cy.url().should('match', url)
  }

  /**
   * Click in a element by passing the element text
   *
   * @param {*} text element text to be clicked

   */
  clickElementByText(text) {
    return this.getElementByText(text).click()
  }

  /**
   * Selects a tab
   *
   * @param {String} tabName Name of the tab you want to go in
   */
  selectTabByName(tabName) {
    cy.xpath(`//div[@class='tabs-bar']//*[@title='${tabName}']`).click()
  }

  /**
   * Verify if a file was downloaded in the default 'cypress/downloads/' path
   *
   * @param {String} filename name of the file we want to verify if it was downloaded
   */
  AssertFileWasDownloadedSuccessfully(filename) {
    // Browser might take a while to download the file, so use "cy.readFile" to retry until the file exists and has length - and we assume that it has finished downloading then
    return cy.readFile('cypress/downloads/' + filename, { timeout: 15000 }).should('have.length.gt', 50)
  }

  /**
   * Clear filters in a search by pressing in the "Clear All Filters" button
   *
   */
  clearAllFilters() {
    cy.get(selectors.clearAllFiltersButton).click()
  }

  /**
   * Move back or forward in the browser
   *
   * @param {String} direction 'back' or 'forward' in the browser
   *
   */
  goBackOrForwardInBrowser(direction) {
    if (direction === 'back') {
      cy.go(-1)
    } else if (direction === 'forward') {
      cy.go(1)
    }
  }
}

export default BasePage
