/**
 * This is the basePage class with all basic methods we can use across all the pages
 */

const selectors = {
  clearAllFiltersButton: '#clearButton',
  gsGridTableCell: 'div.data gs-grid-cell',
  gsGridTableCellHighlighted: 'div.data gs-grid-cell gs-highlighted-text.is-matched',
  rightNavBar: 'gs-container-l4-overlay gs-container-l4',
  toastNotification: 'gs-toast div.toast-content',
  toastNotificationXBtn: 'gs-toast gs-svg-icon svg',
  notificationError: '#notificationError',
  bulkActionsCheckbox: 'gs-grid-row gs-checkbox',
  gsProgressBar: 'hearth-root gs-progress-indicator',
  entireAppPage: '#sisenseApp',
  gsTollTip: 'gs-tooltip',
  rowsInTable: 'gs-grid-row-list gs-grid-row'
}

class BasePage {
  /**
   * Check the current url
   *
   * @param {string} url The entire url or a part of it
   *
   */
  checkUrl(url) {
    cy.url().should('include', url)
  }

  /**
   * Check url by passing a regex
   *
   * @param {RegExp} url The entire url or a part of it. Is is a string like this: /regex/
   *
   */
  checkUrlByRegex(url) {
    cy.url().should('match', url)
  }

  // ------------------------------------------------------------------------------- GETS AND CLICKS ------------------------------------------------------------------- //

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
   * @param {string} text element text to be clicked

   */
  clickElementByText(text) {
    this.getElementByText(text).click()
  }

  /**
   * Click in the checkbox to select all elements of table when bulk actions is available
   */
  clickToSelectAllElementsInTable() {
    this.assertBulkOptionsDisplayed()

    cy.get(selectors.bulkActionsCheckbox).click()
  }

  /**
   * Close the L4 right bar by clicking in the middle of the current page
   */
  clickOutsideToCloseL4RightBar() {
    cy.get(selectors.entireAppPage).click('center')
  }

  // --------------------------------------------------------------------------------- ASSERTIONS ------------------------------------------------------------------------------------ //
  /**
   * Verify if a file was downloaded in the default 'cypress/downloads/' path
   *
   * @param {string} filename name of the file we want to verify if it was downloaded
   */
  assertFileWasDownloadedSuccessfully(filename) {
    cy.readFile('cypress/downloads/' + filename, { timeout: 15000 }).should('exist')
    cy.readFile('cypress/downloads/' + filename, { timeout: 15000 }).should('have.length.gt', 50)
  }

  /**
   * Assert that a table shows all expected data supposed to be in the columns. The order is taken in consideration.
   * In case the first column is a checkbox, it will be ignored, so just send the other columns in order
   *
   * @param {string[]} columnsToValidate column names to validate, example: columnsToValidate = [Id, Client, Regulator, Status]
   *
   */
  assertTableContainsExpectedColumnsInOrder(columnsToValidate) {
    for (let i = 1; i <= columnsToValidate.length; i++) {
      cy.get('gs-grid gs-grid-row-list gs-grid-row gs-grid-cell span:not(:empty)')
        .eq(i - 1)
        .should('contain.text', columnsToValidate[i - 1])
    }
  }

  /**
   * Assert the number of records displayed. It is shown in the top like this: 'X record(s)' or 'X SEARCH RESULT(S)'
   *
   * @param {string} locator String that contains the locator where this method will extract the text from
   * @param {number} numberOfRecords amount of people you want to check in the records
   *
   */
  assertNumberOfRecordsDisplayed(locator, numberOfRecords) {
    const regexRecords = `${numberOfRecords}.?`
    cy.get(locator).contains(new RegExp(regexRecords))
  }

  /**
   * Check the data in a row listed in a table of type gs-grid
   * It is possible to validate multiple rows, just sent the data one after the other (check last example)
   *
   * @param {string[]} data Array with the data needed to be validated. The correct order is the ORDER displayed in the UI,
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
      cy.get(selectors.gsGridTableCell).eq(i).should('contain.text', data[i])
    }
  }

  /**
   * Assert a data is highlighted in a GS Table
   *
   * @param {string} dataHighlighted Element text to check if it is highlighted
   */
  assertDataDisplayedOnGsGridTableIsHighlighted(dataHighlighted) {
    cy.get(selectors.gsGridTableCellHighlighted).should('be.visible')
    cy.get(selectors.gsGridTableCellHighlighted).first().should('contain.text', dataHighlighted)
  }

  /**
   * Assert a right nav bar (L4) is displayed
   *
   * @param {boolean} displayed True to assert the L4 is displayed. False otherwise
   */
  assertRightL4BarIsDisplayed(displayed = true) {
    displayed ? cy.get(selectors.rightNavBar).last().should('be.visible') : cy.get(selectors.rightNavBar).should('not.exist')
  }

  /**
   * Assert a toast notification is displayed alongside a given message
   *
   * @param {string} toastMsg Toast message text
   * @param {boolean} displayed True to assert the entity is displayed. False otherwise.
   * @param {boolean} displayed True to close the toastNotification right after it is displayed
   */
  assertToastNotificationMessageIsDisplayed(toastMsg, displayed = true, close = false) {
    if (!displayed && close) {
      throw new Error('It does not make sense to check if the toast is displayed and then ask for close it!')
    }

    if (displayed) {
      cy.get(selectors.toastNotification).should('be.visible').should('contain.text', toastMsg)
    } else {
      cy.get(selectors.toastNotification).should('not.exist')
    }

    if (close) {
      cy.get(selectors.toastNotificationXBtn).click()
    }
  }

  /**
   * Assert if a list of elements is in alphabetical order, or in numerical order.
   * It works by sending n elements with the same locator, so this method can extract the text of all elements and assert they are being neatly displayed.
   *
   * @param {object} locator Object locator containing many elements
   */
  assertElementsInAlphabeticalOrNumericalOrder(locator) {
    const listDisplayed = []
    let listOrdered = []

    cy.get(locator)
      .each(($el, index) => {
        cy.wrap($el)
          .invoke('text')
          .then((text) => {
            listDisplayed.push(text)
            cy.log('Element added in the list to compare: ' + listDisplayed[index])
          })
      })
      .then(() => {
        listOrdered = listDisplayed.slice()
        listOrdered = listOrdered.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })) //Not consider case sensitive, so this is a personalized sort
        cy.log('List Displayed: ' + listDisplayed.slice().toString())
        cy.log('List Ordered: ' + listOrdered.toString())
        expect(JSON.stringify(listOrdered) === JSON.stringify(listDisplayed), 'Asserting if list is ordered').to.be.true
        cy.log('List is alphabetically ordered')
      })
  }

  /**
   * Assert the elements in a locator are not duplicated. For example, you can send the locator contains ids and the method will verify if the ids are unique
   *
   * @param {object} locator Object locator containing many elements
   */
  assertNoDuplicatesOnList(locator) {
    const listToBeVerified = []

    cy.get(locator)
      .each(($el, index) => {
        cy.wrap($el)
          .invoke('text')
          .then((text) => {
            listToBeVerified.push(text)
            cy.log('Element added in the list: ' + listToBeVerified[index])
          })
      })
      .then(() => {
        expect(new Set(listToBeVerified).size !== listToBeVerified.length, 'Asserting duplicated values in an array').to.be.false
      })
  }

  /**
   * Assert the notificationError message is displayed
   *
   * @param {string} textDisplayed Text to be validated in the error notification
   * @param {boolean} displayed True is the default value to validate if the notification error message is displayed. False otherwise.
   */
  assertNotificationErrorDisplayed(textDisplayed = '', displayed = true) {
    displayed ? cy.get(selectors.notificationError).should('be.visible') : cy.get(selectors.notificationError).should('not.exist')

    if (textDisplayed !== '' && displayed) {
      cy.get(selectors.notificationError).contains(textDisplayed)
      // cy.get(selectors.notificationError).invoke('text').then((text) => { expect(text.trim()).equal(textDisplayed) })
    }
  }

  /**
   * Assert if an element is focused
   *
   * @param {string} elementSelector element selector to be validated
   * @param {boolean} focused True is default to validate if the element is focused. False to assert otherwise.
   */
  assertElementIsFocused(elementSelector, focused = true) {
    focused ? cy.get(elementSelector).should('have.focus') : cy.get(elementSelector).should('not.have.focus')
  }

  /**
   * Assert if the gs progress bar is displayed on the top of a page
   *
   * @param {boolean} displayed True is default value to check if the progress bar is being displayed. False to assert otherwise.
   */
  assertProgressBarDisplayed(displayed = true) {
    displayed ? cy.get(selectors.gsProgressBar).should('be.visible') : cy.get(selectors.gsProgressBar).should('not.exist')
  }

  /**
   * Assert if the bulk actions (checkbox to select more than 1 element in a table) is displayed
   *
   * @param {boolean} displayed True is default value to check if the checkbox exists. False to assert otherwise.
   */
  assertBulkOptionsDisplayed(displayed = true) {
    displayed ? cy.get(selectors.bulkActionsCheckbox).should('exist') : cy.get(selectors.bulkActionsCheckbox).should('not.exist')
  }

  /**
   * Assert a tooltip is visible or not with a given text
   *
   * @param {string} text The text to be validated in the tooltip
   * @param {boolean} displayed True to validate the tooltip with the text id displayed, false otherwise
   */
  assertToolTipDisplayedWithText(text, displayed = true) {
    displayed ? cy.get(selectors.gsTollTip).should('have.text', text) : cy.get(selectors.gsTollTip).should('not.exist')
  }

  /**
   * Assert the number of rows in a table (The header is not counted as a row)
   *
   * @param {number} expectedNumberOfRows Expected number of rows in the table WITHOUT COUNTING THE TABLE HEADER
   */
  assertNumberOfRowsInTable(expectedNumberOfRows) {
    if (expectedNumberOfRows > 0) {
      cy.get(selectors.rowsInTable).should('have.length', expectedNumberOfRows + 1)
    } else {
      throw new Error('The number ' + expectedNumberOfRows + ' is invalid, please pick a value greaten than 0 to make sense')
    }
  }

  /**
   * Assert if a text id displayed in a gs-badge element
   *
   * @param {string} text Text to be found inside the gs-badge
   */
  assertBadgeContainsText(text) {
    cy.get('gs-badge').contains(text)
  }

  // -----------------------------------------------------------------------------------  OTHERS ---------------------------------------------------------------------------- //

  /**
   * Clear filters in a search by pressing in the "Clear All Filters" button when available in the UI
   *
   */
  clearAllFilters() {
    cy.get(selectors.clearAllFiltersButton).click()
  }

  /**
   * Move back or forward in the browser
   *
   * @param {string} direction 'back' or 'forward' in the browser
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
   * @param {number} x Number of pixels in the x coordinates (width)
   * @param {number} y Number of pixels in the Y coordinates (height)
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

  /**
   * Navigate to an URL
   *
   * @param {string} url url to navigate. If you have a baseUrl defined in the cypress.json file, just send the endpoint instead of the entire URL.
   *
   * @example
   * When baseURL defined as https://ea-v3.myglobalshares.co.uk/, just send something like /client/431/people and you go to https://ea-v3.myglobalshares.co.uk/client/431/people
   */
  navigateToUrl(url) {
    cy.visit(url, { failOnStatusCode: false })
  }

  /**
   * Get the current URL and add a text (urlPathToAdd) in the end of the current path. Then, visit this new url.
   * This method can be handy in situations where you want to perform an action by an url. Look in the example to more details
   *
   * @param {string} urlPathToAdd text to be added as a path in the end of the current url
   *
   * @example: use addPathToUrlAndVisitIt(';action=duplicate') to visit the url "yourCurrentUrl;action=duplicate"
   */
  addPathToUrlAndVisitIt(urlPathToAdd) {
    cy.url().then((url) => {
      cy.visit(url + urlPathToAdd, { failOnStatusCode: false })
    })
  }

  /**
   * Wait for a certain number of time.
   *
   * PS: Do not use this method unless you really need it.
   * It may be useful in some situations like statements, when we need to wait for some seconds until a statement changes its status
   *
   * @param {number} time Time in milliseconds to wait
   */
  waitSpecificTime(time) {
    cy.forcedWait(time)
  }
}

export default BasePage
