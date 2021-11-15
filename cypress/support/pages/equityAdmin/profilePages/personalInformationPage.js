import BasePage from '../../basePage'

const selectors = {
  nameInput: '#name input',
  contactInput: '#contact input',
  emailInput: '#email input'
}

const properties = {
  pageURL: '/profile/personal-information'
}

class PersonalInformationPage extends BasePage {
  /**
   * Checks if the current page is the one in the properties
   */
  checkProfilePersonalInformationUrl() {
    this.checkUrl(properties.pageURL)
  }

  /**
   * Edit personal info
   * @param {String} name Name to replace the current name
   * @param {String} contact Contact number to replace the current contact number
   * @param {String} email Email address to replace the current email address
   */
  editPersonalInfo(name = '', contact = '', email = '') {
    if (name != '') {
      cy.get(selectors.nameInput).clear()
      cy.get(selectors.nameInput).type(name)
    }

    if (contact != '') {
      cy.get(selectors.contactInput).clear()
      cy.get(selectors.contactInput).type(contact)
    }

    if (email != '') {
      cy.get(selectors.emailInput).clear()
      cy.get(selectors.emailInput).type(email)
    }
  }

  // put the save button in here when available
}

export default PersonalInformationPage
