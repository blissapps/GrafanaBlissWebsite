import BasePage from '../../basePage'

const selectors = {
  nameInput: '#name input',
  contactInput: '#contact input',
  emailInput: '#email input',
  personalInfoHeader: '#personalInfoHeader'
}

const properties = {
  pageURL: '/profile/personal-information'
}

class PersonalInformationPage extends BasePage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }

  // -----------------------------------------------------------------------------  ASSERTIONS ---------------------------------------------------------------------- //

  /**
   * Assert if the personal information header is displayed correctly
   *
   * @param {boolean} displayed True is the default value to validate with the header is displayed. False to validate the otherwise
   * @param {string} textToValidate Send a text to validate the text displayed in the header
   */
  assertHeaderIsDisplayedCorrectly(displayed = true, textToValidate = '') {
    if (displayed) {
      cy.get(selectors.personalInfoHeader).should('be.visible')
      textToValidate !== '' ? cy.get(selectors.personalInfoHeader).should('have.text', textToValidate) : null
    } else {
      cy.get(selectors.personalInfoHeader).should('not.exist')
    }
  }

  /**
   * Assert the personal info inputs and data are displayed correctly
   *
   * @param {string} name Send a name in case you want to validate the name content, send '' to not validate the content
   * @param {string} contact Send a contact in case you want to validate the contact content, send '' to not validate the content
   * @param {string} email Send a email in case you want to validate the email content, send '' to not validate the content
   */
  assertPersonalInfoDisplayed(name = '', contact = '', email = '') {
    cy.get(selectors.nameInput).should('be.visible')
    cy.get(selectors.contactInput).should('be.visible')
    cy.get(selectors.emailInput).should('be.visible')

    name !== '' ? cy.get(selectors.nameInput).should('have.value', name) : null
    contact !== '' ? cy.get(selectors.contactInput).should('have.value', contact) : null
    email !== '' ? cy.get(selectors.emailInput).should('have.value', email) : null
  }

  // --------------------------------------------------------------------------------  OTHERS ----------------------------------------------------------------------- //

  /**
   * Edit personal info
   * @param {string} name Name to replace the current name
   * @param {string} contact Contact number to replace the current contact number
   * @param {string} email Email address to replace the current email address
   */
  editPersonalInfo(name = '', contact = '', email = '') {
    if (name !== '') {
      cy.get(selectors.nameInput).clear().type(name)
    }

    if (contact !== '') {
      cy.get(selectors.contactInput).clear().type(contact)
    }

    if (email !== '') {
      cy.get(selectors.emailInput).clear().type(email)
    }
  }
}

export default PersonalInformationPage
