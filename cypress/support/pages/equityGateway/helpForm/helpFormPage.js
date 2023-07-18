import BasePage from '../../basePage'

const selectors = {
  contactHeader: 'h1',
  contactText: '.eg-contact__text',
  phoneSection: '[data-test-id="helpdesk-contacts"]',
  emailTitle: 'div:nth-child(1) > h2',
  emailSubject: '[data-test-id="helpdesk-form-input-subject"]',
  emailSubjectCharCount: '.eg-contact__formlength',
  emailSubjectInput: 'input[placeholder="Enter subject"]',
  emailSubjectError: '[data-test-id="helpdesk-form-input-subject"] > div.message',
  emailMessage: 'gs-input-area[placeholder="Enter detailed description"]',
  emailMessageCharCount: '.h-3rem  > label:nth-child(2)',
  emailMessageInput: '[data-test-id="helpdesk-form-input-message"] > textarea',
  emailMessageError: '[data-test-id="helpdesk-form-input-message"]  > div.message',
  emailFirstName: '[data-test-id="helpdesk-form-input-first-name"]',
  emailFirstNameInput: '[data-test-id="helpdesk-form-input-first-name"] input',
  emailFirstNameError: '[data-test-id="helpdesk-form-input-first-name"] > div.message',
  emailLastName: '[data-test-id="helpdesk-form-input-last-name"]',
  emailLastNameInput: '[data-test-id="helpdesk-form-input-last-name"] input',
  emailLastNameError: '[data-test-id="helpdesk-form-input-last-name"] > .message',
  emailRequester: '[data-test-id="helpdesk-form-input-email"]',
  emailRequesterInput: '[data-test-id="helpdesk-form-input-email"] input',
  emailRequesterError: '[data-test-id="helpdesk-form-input-email"] > .message',
  submitButton: '[data-test-id="helpdesk-form-btn-submit"]',
  footer: 'footer'
}

class HelpFormPage extends BasePage {
  /** Navigates to the Helpdesk Page
   */
  gotoHelpDesk() {
    cy.window().then((win) => {
      // @ts-ignore
      win.location.href = 'https://eg-v4-alpha-25.gsapps.dev/help'
    })
  }

  /** Validates Helpdesk form elements visibility
   * @param {boolean} auth (Adapts the behavior corresponding to the user authentication status)
   */
  validateFormElements(auth = true) {
    cy.url().should('contain', '/help')
    if (auth) {
      this._validateElementAndAttribute(selectors.footer+' > div > a:nth-child(1)', 'href', '/terms-and-conditions')
      this._validateElementAndAttribute(selectors.footer+' > div > a:nth-child(2)', 'href', '/privacy-policy')
    } else if (!auth) {
      this._validateElementAndAttribute(selectors.footer+' > div > a:nth-child(1)', 'href', '/privacy-policy')
      this._validateElementAndAttribute(selectors.emailRequester, 'placeholder', 'Enter email address')
      this._validateElementAndAttribute(selectors.emailFirstName, 'placeholder', 'Enter first name')
      this._validateElementAndAttribute(selectors.emailLastName, 'placeholder', 'Enter last name')
    }
    this._validateElementAndText(selectors.contactHeader, 'Contact us', true)
    this._validateElementAndText(
      selectors.contactText,
      " Need help? We're here for you. Our service desk team are here to answer all your questions - from navigating your portfolio to transferring your shares. "
    )
    this._validateElementAndText(selectors.phoneSection, 'Reach us by phone', true)
    this._validateElementAndText(selectors.phoneSection, 'Monday to Friday', true)
    this._validateElementAndText(selectors.phoneSection, '08:00 AM - 5:30 PM (GMT)', true)
    this._validateElementAndText(selectors.phoneSection, 'English', true)
    this._validateElementAndText(selectors.phoneSection, '+44 2034056932', true)
    this._validateElementAndText(selectors.emailTitle, 'Write a message')
    this._validateElementAndAttribute(selectors.emailSubject, 'placeholder', 'Enter subject')
    this._validateElementAndAttribute(selectors.emailMessage, 'placeholder', 'Enter detailed description')
    this._validateElementAndText(selectors.footer, 'Service desk provided by', true)
    this.validateElementAndClass('submitButton', 'disabled')
  }

  /** Validates the character related error for input fields
   * (eg. input with char limit of 40 it will validate if when an input of 41+ is passed an error is generated or visible )
   * @param {string} elementIdentifier input element to validate identifier
   * @param {number} charsLimit the characters limit for the input
   * @param {string} errorMessage the error message that should be visible if an error occurs
   */
  validateInputFieldCharsError(elementIdentifier, charsLimit, errorMessage) {
    cy.get(selectors[`${elementIdentifier}Input`])
      .invoke('val', this._generateChars(charsLimit - 1))
      .type('a')

    this._validateElementAndText(selectors[`${elementIdentifier}CharCount`], ` ${charsLimit}/${charsLimit} `)

    cy.get(selectors[`${elementIdentifier}Input`]).clear().invoke('val', this._generateChars(charsLimit)).type('a')

    this._validateElementAndText(selectors[`${elementIdentifier}CharCount`], ` ${charsLimit + 1}/${charsLimit} `)
    this.validateElementAndClass(elementIdentifier, 'error')
    this._validateElementAndText(selectors[`${elementIdentifier}Error`], errorMessage, true)
  }

  /** Validates the errors that could occur when interacting with the inputs
   * (eg. empty (required) input would lead to a Field is required error)
   * @param {string} elementIdentifier input element to validate identifier
   * @param {string} input input text to be passed
   * @param {string} errorMessage the error message that should be visible if an error occurs
   * @param {boolean} isRequiredField is the input element a required field ?
   */
  validateInputCustomError(elementIdentifier, input, errorMessage, isRequiredField = true) {
    if (isRequiredField) {
      cy.get(selectors[`${elementIdentifier}Input`]).type(input).clear()
      cy.get(selectors.contactHeader).click()
      this.validateElementAndClass(elementIdentifier, 'error')
      this._validateElementAndText(selectors[`${elementIdentifier}Error`], 'Field is required', true)
    } else {
      cy.get(selectors[`${elementIdentifier}Input`]).type(input)
      this.validateElementAndClass(elementIdentifier, 'error')
      this._validateElementAndText(selectors[`${elementIdentifier}Error`], errorMessage, true)
    }
    cy.get(selectors[`${elementIdentifier}Input`]).clear()
  }

  /** Fills the input element with the desired input
   * (eg. fillInputElement(nameBox, 'First Name') will fill the element mapped with the identifier nameBox with <First Name>)
   * @param {string} elementIdentifier input element to validate identifier
   * @param {string} input input text to be passed
   */
  fillInputElement(elementIdentifier, input) {
    cy.get(selectors[`${elementIdentifier}Input`]).type(input)
  }

  /** Validates if the element mapped to elementIdentifier is available in the DOM
   * with the desired class or the negation of it
   * @param {string} elementIdentifier element to validate identifier
   * @param {string} elementClass class that the element should have or not
   * @param {boolean} negation if we should be looking for a positive or negative match
   */
  validateElementAndClass(elementIdentifier, elementClass, negation = false) {
    if (negation) {
      cy.get(selectors[elementIdentifier]).should('not.have.class', elementClass)
    } else {
      cy.get(selectors[elementIdentifier]).should('have.class', elementClass)
    }
  }

  /** Validates if the element mapped to elementIdentifier is available in the DOM
   * with the desired attribute and attribute value
   * @param {string} elementIdentifier element to validate identifier
   * @param {string} attribute attribute that the element should have
   * @param {string} attributeValue value of the element attribute
   */
  _validateElementAndAttribute(elementIdentifier, attribute, attributeValue) {
    cy.get(elementIdentifier).should('have.attr', attribute, attributeValue)
  }

  /** Validates if the element mapped to elementIdentifier is available in the DOM
   *  with the desired tex
   * @param {string} elementIdentifier element to validate identifier
   * @param {string} elementText text that should be within the validated element
   * @param contains
   */
  _validateElementAndText(elementIdentifier, elementText, contains = false) {
    if (!contains) {
      cy.get(elementIdentifier).should('have.text', elementText)
    } else {
      cy.get(elementIdentifier).contains(elementText)
    }
  }

  /** Generates a string with (a * [times] charsToGenerate)
   *  (eg generateChars(3) will return aaa)
   * @param {number} charsToGenerate
   */
  _generateChars(charsToGenerate) {
    let chars = ''
    for (let i = 0; i < charsToGenerate; i++) {
      const randomCharCode = Math.floor(Math.random() * 26) + 97 // Random ASCII code between 97 ('a') and 122 ('z')
      const randomChar = String.fromCharCode(randomCharCode) // Convert ASCII code to character
      chars += randomChar
    }

    return chars
  }
}

export default HelpFormPage
