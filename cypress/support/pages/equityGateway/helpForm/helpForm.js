import BasePage from '../../basePage'
import SideMenuBar from '../sideMenuBar/sideMenuBar'

// @ts-ignore
//TODO [Fix the selectors with navigation and div dependencies]
const selectors = {
  clientLogo: 'eg-company-logo > img',
  contactHeader: 'h1',
  contactText: '.eg-contact__text',
  phoneHeader: '.flex-column > .text-h5', //FIXME (needs to be fixed nav dependent)
  phoneSubTitleTop: '.grid > .flex-column > :nth-child(2)', //FIXME (needs to be fixed nav dependent)
  phoneSubTitleBot: '.font-semibold.pb-5',
  phoneBodyTop: '.overline',
  phoneBodyBot: 'div .mr-5 :nth-child(2)', //FIXME (needs to be fixed div and nav dependent)
  emailTitle: 'div .grid :nth-child(1) > h2', //FIXME (needs to be fixed div and nav dependent)
  emailSubject: 'gs-input-field[title="Subject"]',
  emailSubjectCharCount: 'gs-input-field[title="Subject"] + label', //FIXME (needs to be fixed nav dependent)
  emailSubjectInput: 'gs-input-field[title="Subject"] > div > input', //FIXME (needs to be fixed div and nav dependent)
  emailSubjectError: 'gs-input-field[title="Subject"] > div.message', //FIXME (needs to be fixed div and nav dependent)
  emailMessage: 'gs-input-area[placeholder="Enter detailed description"]',
  emailMessageCharCount: '.eg-contact__area > .absolute', //FIXME (needs to be fixed nav dependent)
  emailMessageInput: 'gs-input-area[placeholder="Enter detailed description"] > textarea', //FIXME (needs to be fixed nav dependent)
  emailMessageError: 'gs-input-area[placeholder="Enter detailed description"] > div.message', //FIXME (needs to be fixed div and nav dependent)
  emailFirstLastName: 'gs-input-field[title="First and last name"]',
  emailFirstLastNameInput: 'gs-input-field[title="First and last name"] > div > input', //FIXME (needs to be fixed div and nav dependent)
  emailFirstLastNameError: 'gs-input-field[title="First and last name"] > div.message', //FIXME (needs to be fixed div and nav dependent)
  emailRequester: 'gs-input-field[title="Email"]',
  emailRequesterInput: 'gs-input-field[title="Email"] > div > input', //FIXME (needs to be fixed div and nav dependent)
  emailRequesterError: 'gs-input-field[title="Email"] > div.message', //FIXME (needs to be fixed div and nav dependent)
  submitButton: 'gs-button',
  footerTermsAndConditions: 'footer > div > a.mr-3', //FIXME (needs to be fixed nav dependent)
  footerPrivacyPolicy: 'footer > div.mb-7 > :last-child', //FIXME (needs to be fixed nav dependent)
  footerGSCopy: 'footer > div > p', //FIXME (needs to be fixed nav dependent)
  footerGSLogo: 'footer > div > img', //FIXME (needs to be fixed nav dependent)
  welcomePageHelp: 'a.ng-star-inserted'
}

class HelpForm extends BasePage {
  /** Navigates to the Helpdesk Page
   * @param {boolean} auth (Adapts the behavior corresponding to the user authentication status)
   */
  navigateToHelpDesk(auth = true) {
    if (auth) {
      const sideMenuBar = new SideMenuBar()
      sideMenuBar.support('/help')
    } else if (!auth) {
      cy.visit(`${Cypress.env('EQUITY_GATEWAY_BASE_URL')}`, { failOnStatusCode: false })
      cy.get(selectors.welcomePageHelp).click()
    }
  }

  /** Validates Helpdesk form elements visibility
   * @param {boolean} auth (Adapts the behavior corresponding to the user authentication status)
   */
  validateFormElements(auth = true) {
    cy.url().should('contain', '/help')
    if (auth) {
      this.validateElementAndAttribute(selectors.footerTermsAndConditions, 'href', '/terms-and-conditions')
    } else if (!auth) {
      this.validateElementAndAttribute(selectors.emailRequester, 'placeholder', 'Enter email address')
      this.validateElementAndAttribute(selectors.emailFirstLastName, 'placeholder', 'Enter first and last name')
    }
    this.validateElementAndAttribute(selectors.clientLogo, 'src', 'assets/images/AJUObp_UKBAA.svg')
    this.validateElementAndAttribute(selectors.clientLogo, 'alt', 'Skanska logo')
    this.validateElementAndText(selectors.contactHeader, 'Contact us')
    this.validateElementAndText(
      selectors.contactText,
      " Need help? We're here for you. Our service desk team are here to answer all your questions - from navigating your portfolio to transferring your shares. "
    )
    this.validateElementAndText(selectors.phoneHeader, 'Reach us by phone')
    this.validateElementAndText(selectors.phoneSubTitleTop, 'Monday to Friday')
    this.validateElementAndText(selectors.phoneSubTitleBot, '08:00 AM - 5:30 PM (GMT)')
    this.validateElementAndText(selectors.phoneBodyTop, 'English')
    this.validateElementAndText(selectors.phoneBodyBot, '+44 2034056932')
    this.validateElementAndText(selectors.emailTitle, 'Write a message')
    this.validateElementAndAttribute(selectors.emailSubject, 'placeholder', 'Enter subject')
    this.validateElementAndAttribute(selectors.emailMessage, 'placeholder', 'Enter detailed description')
    this.validateElementAndAttribute(selectors.footerPrivacyPolicy, 'href', '/privacy-policy')
    this.validateElementAndText(selectors.footerGSCopy, 'Service desk provided by')
    this.validateElementAndAttribute(selectors.footerGSLogo, 'src', 'assets/images/gs_small.svg')
    this.validateElementAndAttribute(selectors.footerGSLogo, 'alt', 'Global Shares and J.P. Morgan company logo')
    this.validateElementAndClass('submitButton', 'disabled')
  }

  /** Generates a string with (a * [times] charsToGenerate)
   *  (eg generateChars(3) will return aaa)
   * @param {number} charsToGenerate
   */
  generateChars(charsToGenerate) {
    let chars = ''
    for (let i = 0; i < charsToGenerate; i++) {
      const randomCharCode = Math.floor(Math.random() * 26) + 97 // Random ASCII code between 97 ('a') and 122 ('z')
      const randomChar = String.fromCharCode(randomCharCode) // Convert ASCII code to character
      chars += randomChar
    }

    return chars
  }

  /** Validates the character related error for input fields
   * (eg. input with char limit of 40 it will validate if when an input of 41+ is passed an error is generated or visible )
   * @param {string} elementIdentifier input element to validate identifier
   * @param {number} charsLimit the characters limit for the input
   * @param {string} errorMessage the error message that should be visible if an error occurs
   */
  validateInputFieldCharsError(elementIdentifier, charsLimit, errorMessage) {
    cy.get(selectors[`${elementIdentifier}Input`])
      .invoke('val', this.generateChars(charsLimit - 1))
      .type('a')

    this.validateElementAndText(selectors[`${elementIdentifier}CharCount`], `${charsLimit}/${charsLimit}`)

    cy.get(selectors[`${elementIdentifier}Input`]).clear().invoke('val', this.generateChars(charsLimit)).type('a')

    this.validateElementAndText(selectors[`${elementIdentifier}CharCount`], `${charsLimit + 1}/${charsLimit}`)
    this.validateElementAndClass(elementIdentifier, 'error')
    this.validateElementAndText(selectors[`${elementIdentifier}Error`], errorMessage)
  }

  /** Validates the errors that could occur when interacting with the inputs
   * (eg. empty (required) input would lead to an Field is required error)
   * @param {string} elementIdentifier input element to validate identifier
   * @param {string} input input text to be passed
   * @param {string} errorMessage the error message that should be visible if an error occurs
   * @param {boolean} isRequiredField is the input element a required field ?
   */
  validateInputCustomError(elementIdentifier, input, errorMessage, isRequiredField = true) {
    if (isRequiredField) {
      cy.get(selectors[`${elementIdentifier}Input`]).type(input)
      cy.get(selectors[`${elementIdentifier}Input`]).clear()
      cy.get(selectors.clientLogo).click()
      this.validateElementAndClass(elementIdentifier, 'error')
      this.validateElementAndText(selectors[`${elementIdentifier}Error`], ' Field is required\n')
    } else {
      cy.get(selectors[`${elementIdentifier}Input`]).type(input)
      this.validateElementAndClass(elementIdentifier, 'error')
      this.validateElementAndText(selectors[`${elementIdentifier}Error`], errorMessage)
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
   * with the desired attribute and attribute value
   * @param {string} elementIdentifier element to validate identifier
   * @param {string} attribute attribute that the element should have
   * @param {string} attributeValue value of the element attribute
   */
  validateElementAndAttribute(elementIdentifier, attribute, attributeValue) {
    cy.get(elementIdentifier).should('have.attr', attribute, attributeValue)
  }

  /** Validates if the element mapped to elementIdentifier is available in the DOM
   *  with the desired tex
   * @param {string} elementIdentifier element to validate identifier
   * @param {string} elementText text that should be within the validated element
   */
  validateElementAndText(elementIdentifier, elementText) {
    cy.get(elementIdentifier).should('have.text', elementText)
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
}
export default HelpForm
