/**
 * This is the basePage class with all basic methods we can use across all the pages
 */

const selectors = {
  clearAllFiltersButton: '#clearButton',
  gsGridTableCell: 'div.data gs-grid-cell',
  gsGridTableCellHighlighted: 'div.data gs-grid-cell gs-highlighted-text.is-matched',
  rightNavBar: 'gs-container-l4',
  toastNotification: 'gs-toast div.toast-content',
  toastNotificationXBtn: 'gs-toast gs-svg-icon svg',
  notificationError: '#notificationError'
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

  // --------------------------------------- GETS, SELECTS, AND CLICKS --------------------------------------------- //

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
   * Click in a tab by the html title
   *
   * @param {String} tabTitle Html title of the tab you want to go in
   *
   * @MISSING_IDS
   */
  clickTabByTitle(tabTitle) {
    cy.get(`div.tabs-bar *[title='${tabTitle}']`).click()
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
   * Change the browser resolution
   *
   * @param {Number} x Number of pixels in the x coordinates (width)
   * @param {Number} y Number of pixels in the Y coordinates (height)
   */
  changeBrowserResolution(x, y) {
    cy.viewport(x, y)
  }

  /**
   * Reload/Refresh the current page
   */
  reloadPage() {
    cy.reload()
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
   * In case the first column is a checkbox, it will be ignored, so just send the other columns in order
   *
   * @param {Array} columnsToValidate column names to validate, example: columnsToValidate = [Id, Client, Regulator, Status]
   *
   * @MISSING_IDS When ids are placed in all columns name, change this method to also receive the ids
   */
  assertTableContainsExpectedColumns(columnsToValidate) {
    for (let i = 1; i <= columnsToValidate.length; i++) {
      cy.get('gs-grid gs-grid-row-list gs-grid-row gs-grid-cell span:not(:empty)')
        .eq(i - 1)
        .should('contain.text', columnsToValidate[i - 1])
    }
  }

  /**
   * Assert the number of records displayed. It is shown in the top like this: 'X record(s)' or 'X SEARCH RESULT(S)'
   *
   * @param {Object} locator Object locator where this method will extract the text from this locator
   * @param {Number} numberOfRecords amount of people you want to check in the records
   *
   */
  assertNumberOfRecordsDisplayed(locator, numberOfRecords) {
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
        .should('contain.text', data[i])
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
      .should('contain.text', dataHighlighted)
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
   * @param {Boolean} displayed True to assert the entity is displayed. False otherwise.
   * @param {Boolean} displayed True to close the toastNotification right after it is displayed
   */
  assertToastNotificationMessageIsDisplayed(toastMsg, displayed = true, close = false) {
    if (!displayed && close) {
      throw new Error('It does not make sense to check if the toast is displayed and then ask for close it!')
    }

    if (displayed) {
      cy.get(selectors.toastNotification)
        .should('be.visible')
        .should('contain.text', toastMsg)
    } else {
      cy.get(selectors.toastNotification).should('not.exist')
    }

    if (close) {
      cy.get(selectors.toastNotificationXBtn).click()
    }
  }

  /**
   * Assert a list of elements is in alphabetical order.
   * It works by sending an locator with many similar elements, so this method can extract the text of all elements and assert they are being displayed neatly.
   *
   * @param {Object} locator Object locator containing many elements
   */
  assertElementsInAlphabeticalOrder(locator) {
    const listDisplayed = []
    let listOrdered = []

    cy.get(locator)
      .each(($el, index) => {
        cy.wrap($el)
          .invoke('text')
          .then(text => {
            listDisplayed.push(text)
            cy.log('Element added in the list to compare: ' + listDisplayed[index])
          })
      })
      .then(() => {
        listOrdered = listDisplayed.slice()
        listOrdered = listOrdered.sort()
        expect(JSON.stringify(listOrdered) === JSON.stringify(listDisplayed)).to.be.true
        cy.log('List is alphabetically ordered')
      })
  }

  /**
   * Assert the notificationError message is displayed
   *
   * @param {String} textDisplayed Text to be validated in the error notification
   * @param {Boolean} displayed True is the default value to validate if the notification error message is displayed. False otherwise.
   */
  assertNotificationErrorDisplayed(textDisplayed = '', displayed = true) {
    displayed ? cy.get(selectors.notificationError).should('be.visible') : cy.get(selectors.notificationError).should('not.exist')

    if (textDisplayed != '') {
      cy.get(selectors.notificationError)
        .invoke('text')
        .then(text => {
          expect(text.trim()).equal(textDisplayed)
        })
    }
  }

  /**
   * Assert if an element is focused
   *
   * @param {String} elementSelector element selector to be validated
   * @param {boolean} focused True is default to validate if the element is focused. False, otherwise.
   */
  assertElementIsFocused(elementSelector, focused = true) {
    focused ? cy.get(elementSelector).should('have.focus') : cy.get(elementSelector).should('not.have.focus')
  }
}

export default BasePage
