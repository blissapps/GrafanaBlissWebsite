/**
 * This is the basePage class with all basic methods we can use across all the pages
 */

const selectors = {
  clearAllFiltersButton: '#clearButton',
  gsGridTableCell: 'div.data gs-grid-cell',
  gsGridTableCellHighlighted: 'div.data gs-grid-cell gs-highlighted-text.is-matched',
  rightNavBar: 'gs-container-l4',
  toastNotification: 'div.toast-content'
}

class BasePage {
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

  // --------------------------------------- GETS, SELECTS AND CLICKS --------------------------------------------- //

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
   *
   * @MISSING_IDS
   */
  selectTabByName(tabName) {
    cy.xpath(`//div[@class='tabs-bar']//*[@title='${tabName}']`).click()
  }

  // ---------------------------------------  OTHERS --------------------------------------------- //

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

  /**
   *
   * @param {Number} x Number of pixels in the x coordinates (width)
   * @param {Number} y Number of pixels in the Y coordinates (height)
   */
  changeBrowserResolution(x, y) {
    cy.viewport(x, y)
  }

  // --------------------------------------- ASSERTIONS --------------------------------------------- //
  /**
   * Verify if a file was downloaded in the default 'cypress/downloads/' path
   *
   * @param {String} filename name of the file we want to verify if it was downloaded
   */
  assertFileWasDownloadedSuccessfully(filename) {
    // Browser might take a while to download the file, so use "cy.readFile" to retry until the file exists and has length - and we assume that it has finished downloading then
    return cy.readFile('cypress/downloads/' + filename, { timeout: 15000 }).should('have.length.gt', 50)
  }

  /**
   * Assert that a table shows all expected data supposed to be in the columns. The order is taken in consideration.
   *
   * @param {Array} columnsToValidate column names to validate, example: columnsToValidate = [Id, Client, Regulator, Status]
   *
   * @MISSING_IDS When ids are placed in all columns name, change this method to also receive the ids
   */
  assertTableContainsExpectedColumns(columnsToValidate) {
    for (let i = 1; i <= columnsToValidate.length; i++) {
      cy.xpath(`(//gs-grid//gs-grid-row-list//gs-grid-row//gs-grid-cell//span)[${i}]`)
        .invoke('text')
        .should('contain', columnsToValidate[i - 1])
    }
  }

  /**
   * Assert the number of records displayed in a table. It is showed in the top like this: 'X record(s)'
   *
   * @param {Object} locator Object locator where this method will extract the text from this locator
   * @param {Number} numberOfRecords amount of people you want to check in the records
   *
   */
  assertNumberOfRecordsTable(locator, numberOfRecords) {
    cy.get(locator)
      .invoke('text')
      .then(text => {
        expect(text.trim().split(' ')[0]).equal(numberOfRecords.toString()) // compare only numbers
      })
  }

  /**
   * Check the data in a row listed in a table of type gs-grid
   * It is possible to validate multiple rows, just sent the data one after the other (check last example)
   *
   * @param {Array} data Array with the data needed to be validated. The correct order is the ORDER displayed in the UI,
   * example [username, email, and status].
   *
   * @example: send ['amulcahyNE', 'test@globalshares.com', 'Active'] to validate the data from user amulcahyNE is
   * displayed correctly in the Users table list.
   *
   * @example send [76, 'Interxion', 'Form1099', 'Published'] to validate Id, Client, Regulator, and Status in Statements page.
   *
   * It is also possible to validate more than one row at a time.
   * @example send [76, 'Interxion', 'Form1099', 'Published', 77, 'TomTom', 'Form1099', 'Published'] to validate the first two
   * rows in the Statements page
   */
  assertDataDisplayedOnGsGridTable(data) {
    for (let i = 0; i < data.length; i++) {
      cy.get(selectors.gsGridTableCell)
        .eq(i)
        .invoke('text')
        .should('contain', data[i])
    }
  }

  /**
   * Assert a data is highlighted in a GS Table
   *
   * @param {String} dataHighlighted Element text to check if it is highlighted
   */
  assertDataDisplayedOnGsGridTableIsHighlighted(dataHighlighted) {
    cy.get(selectors.gsGridTableCellHighlighted).should('be.visible')
    cy.get(selectors.gsGridTableCellHighlighted)
      .first()
      .invoke('text')
      .should('contain', dataHighlighted)
  }

  /**
   * Assert the right nav bar (L4) containing details is displayed
   */
  assertRightNavBarIsDisplayed() {
    cy.get(selectors.rightNavBar)
      .last()
      .should('be.visible')
  }

  /**
   * Assert a toast notification is displayed alongside a given message
   *
   * @param {String} toastMsg Toast message text
   * @param {Boolean} notDisplayed Send True to assert that no toast message is displayed
   */
  assertToastNotificationMessageIsDisplayed(toastMsg, notDisplayed = false) {
    if (!notDisplayed) {
      cy.get(selectors.toastNotification)
        .should('be.visible')
        .should('contain.text', toastMsg)
    } else {
      cy.get(selectors.toastNotification).should('not.exist')
    }
  }
}

export default BasePage
