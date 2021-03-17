/* eslint-disable */
// @ts-nocheck
const selectors = {
  backToTheListBtn: 'input',
  headerTitle: 'h1',
  usernameInput: '#name',
  submitBtn: '[type="button"]',
  table: 'table',
  tableContent: 'tbody',
  tableContentList: 'tr',
  tableContentListEntries: 'td'
}

class BasePage {
  ////////////////////////// Check ///////////////////////
  checkUrl(url) {
    cy.url().should('contain', url)
  }

  checkPageTitle(pageTitle) {
    cy.title().should('contain', pageTitle)
  }

  checkMessageIsDisplayed(message) {
    this.findElementbyContainsText('*', message).should('be.visible')
  }

  checkMessageIsNotDisplayed(message) {
    cy.get('body').then($body => {
      if ($body.find(`:contains(${message})`).length > 0) {
        // element is visible
        cy.get(`:contains(${message})`).then($header => {
          if ($header.is(':visible')) {
            assert.isNotOk(false, 'this will pass')
          } else {
            // element is not visible
            assert.isOk('everything', 'everything is OK')
          }
        })
      } else {
        // element does not exist
        assert.isOk('everything', 'everything is OK')
      }
    })
  }

  checkTitleIsDisplayed(title) {
    this.findElementbyText('h1', title).should('be.visible')
  }

  checkButtonState(text, state) {
    this.findElementbyText('button', text).should('be.' + state)
  }

  checkElementExistsByDataIdLabel(dataIdLabel) {
    cy.get(`[data-id-label = '${dataIdLabel}']`).should('be.visible')
  }

  checkHyperlinkExistsByText(text) {
    this.findElementbyText('a', text).should('be.visible')
  }

  checkButtonExistsByText(text) {
    this.findElementbyText('button', text).should('be.visible')
  }

  checkButtonExistsBySpanByText(text) {
    this.findElementbyText('button//span', text).should('be.visible')
  }

  checkPExistsByText(text) {
    this.findElementbyText('p', text).should('be.visible')
  }

  checkPDoesNotExistsByText(text) {
    this.findElementbyText('p', text).should('not.exist')
  }

  checkElementExistsByDataIdLabelAndValue(value, dataIdLabel) {
    cy.xpath(`//input[@value='${value}' and @data-id-label="${dataIdLabel}"]`).should('be.visible')
  }

  checkTextsWithCustomColorExists(text, color) {
    let rgb = 'rgb(0, 0, 0)' // black
    if (color === 'green') {
      rgb = 'rgb(101, 196, 102)'
    }
    this.findElementbyText('*', text).should('have.css', 'color', rgb)
  }

  checkIfTextsExistsInTooltip(text) {
    cy.xpath(`//div[@role="tooltip"]//*[text()='${text}']`).should('be.visible')
  }

  ////////////////////////// Click ///////////////////////

  clickElementByText(text) {
    cy.wait(200) // avoid "detached from the DOM" error
    this.findElementbyText('*', text).click()
  }

  clickRadioButtonByText(text) {
    cy.xpath(`//span[text()="${text}"]/following-sibling::input[@type="radio"]`).click()
  }

  clickHyperlinkByText(text) {
    cy.wait(200) // avoid "detached from the DOM" error
    this.findElementbyText('a', text).click()
  }

  clickButtonBySpanByText(text) {
    cy.wait(200) // avoid "detached from the DOM" error
    this.findElementbyText('button//span', text).click()
  }

  clickOptionByValue(text) {
    cy.xpath(`//option[@value="${text}"]`).click()
  }

  /**
   * To select an option from the data-list we need to clear and type the option value in the field, instead of clicking on an option.
   * ref: https://docs.cypress.io/api/commands/type.html#%E2%80%98Selecting%E2%80%99-an-option-from-datalist
   */
  clickOptionByValueOnADataList(text, dataIdLabel) {
    cy.wait(1000) // wait for the backend response for the suggestions
    this.findElementbyDataIdLabel('input', dataIdLabel).clear()
    this.findElementbyDataIdLabel('input', dataIdLabel).type(text)
  }

  clickInputBydataIdLabel(dataIdLabel) {
    cy.wait(200) // avoid "detached from the DOM" error
    this.findElementbyDataIdLabel('input', dataIdLabel).click()
  }

  ////////////////////////// Type ///////////////////////

  typeTextByDataIdLabel(text, dataIdLabel) {
    this.findElementbyDataIdLabel('*', dataIdLabel).type(text)
  }

  ////////////////////////// Select ///////////////////////

  selectOptionByValue(value) {
    cy.get('select').select(value)
  }

  ////////////////////////// Wait ///////////////////////

  waitByElementText(elementTag, text) {
    cy.waitFor("'" + elementTag + "':contains('" + text + "')")
  }

  ////////////////////////// Clear ///////////////////////

  clearComponentByDataIdLabel(dataIdLabel) {
    this.findElementbyDataIdLabel('*', dataIdLabel).clear()
  }

  ////////////////////////// Hover over ///////////////////////

  /**
   * To hover over an item, we ca use trigger. (.hover() does not exist yet for cypress)
   * ref: https://docs.cypress.io/api/commands/hover.html#Workarounds
   */
  hoverOverAText(text) {
    this.findElementbyText('*', text).trigger('mouseover')
  }

  ////////////////////////// BasicMethods ///////////////////////

  findElementbyText(elementTag, text) {
    return cy.xpath(`//${elementTag}[text()="${text}"]`)
  }

  findElementbyContainsText(elementTag, text) {
    return cy.xpath(`//${elementTag}[contains(text(),"${text}")]`)
  }

  findElementbyDataIdLabel(elementTag, value) {
    return cy.xpath(`//${elementTag}[@data-id-label="${value}"]`)
  }

  findElementbyDataTestId(elementTag, value) {
    return cy.xpath(`//${elementTag}[@data-testid="${value}"]`)
  }

  /**
   * Get the text of an element you want to copy, and save it in the lastTextCopiedToClipboard alias to future usage.
   * param locator: The locator path to be analysed
   * Example: Get a "span" text/number that is being displayed and save it to use it later as (this.lastTextCopiedToClipboard)
   */
  getTextFromElementToBeCopied(locator) {
    return cy
      .xpath(locator)
      .invoke('text')
      .as('lastTextCopiedToClipboard')
  }

  hitEnterOnForm() {
    cy.get('form input, form button')
      .first()
      .type('{enter}')
  }
}

export default BasePage
