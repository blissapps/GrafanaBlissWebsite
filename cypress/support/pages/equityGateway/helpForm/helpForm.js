import BasePage from '../../basePage'

// @ts-ignore
const selectors = {
  dashboardHelp: 'div .flex.mb-6 > a',
  clientLogo: 'eg-company-logo > img',
  contactHeader: 'h1',
  contactText: '.eg-contact__text',
  phoneHeader: 'div .flex-column > h2',
  phoneSubTitleTop: 'div .col-12.lg\\:col-6.flex.p-5 > :nth-child(2)',
  phoneSubTitleBot: 'div .flex-column .p-5 > p.pb-5',
  phoneBodyTop: '.overline',
  phoneBodyBot: 'div .mr-5 :nth-child(2)',
  emailTitle: 'div .grid :nth-child(1) > h2',
  emailSubject: 'gs-input-field[title="Subject"]',
  emailSubjectCharCount: 'gs-input-field[title="Subject"] + label',
  emailSubjectInput: 'gs-input-field[title="Subject"] > div > input',
  emailSubjectError: 'gs-input-field[title="Subject"] > div.message',
  emailMessage: 'gs-input-area[placeholder="Enter detailed description"]',
  emailMessageCharCount: '.eg-contact__area > .absolute',
  emailMessageInput: 'gs-input-area[placeholder="Enter detailed description"] > textarea',
  emailMessageError: 'gs-input-area[placeholder="Enter detailed description"] > div.message',
  emailFirstLastName: 'gs-input-field[title="First and last name"]',
  emailFirstLastNameInput: 'gs-input-field[title="First and last name"] > div > input',
  emailFirstLastNameError: 'gs-input-field[title="First and last name"] > div.message',
  emailRequester: 'gs-input-field[title="Email"]',
  emailRequesterInput: 'gs-input-field[title="Email"] > div > input',
  emailRequesterError: 'gs-input-field[title="Email"] > div.message',
  submitButton: 'gs-button',
  footerTermsAndConditions: 'footer > div > a.mr-3',
  footerPrivacyPolicy: 'footer > div.mb-7 > :last-child',
  footerGSCopy: 'footer > div > p',
  footerGSLogo: 'footer > div > img'
}

class HelpForm extends BasePage {
  /** Navigates to the Helpdesk Page
   * @param {boolean} auth (Adapts the behavior corresponding to the user authentication status)
   */
  navigateToHelpDesk(auth = true) {
    if (auth) {
      cy.get(selectors.dashboardHelp).click()
    } else if (!auth) {
      cy.visit(`${Cypress.env('EQUITY_GATEWAY_BASE_URL')}\\help`, { failOnStatusCode: false })
    }
  }

  // Validates Helpdesk form elements visibility
  /**
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
      " Need help? We're here for you. Our service desk team are here to answer all your questions" + ' - from navigating your portfolio to transferring your shares. '
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

  /** Generetes a string with a*charsToGenerate
   *  (eg generateChars(3) will return aaa)
   * @param {number} charsToGenerate
   */
  generateChars(charsToGenerate) {
    let chars = ''
    for (let i = 0; i < charsToGenerate; i++) {
      chars = chars + 'a'
    }

    return chars
  }

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

  fillInputElement(elementIdentifier, input) {
    cy.get(selectors[`${elementIdentifier}Input`]).type(input)
  }

  validateElementAndAttribute(elementIdentifier, attribute, attributeValue) {
    cy.get(elementIdentifier).should('have.attr', attribute, attributeValue)
  }

  validateElementAndText(elementIdentifier, elementText) {
    cy.get(elementIdentifier).should('have.text', elementText)
  }

  validateElementAndClass(elementIdentifier, elementClass, negation = false) {
    if (negation) {
      cy.get(selectors[elementIdentifier]).should('not.have.class', elementClass)
    } else {
      cy.get(selectors[elementIdentifier]).should('have.class', elementClass)
    }
  }
}
export default HelpForm
