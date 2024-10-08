import BasePage from '../basePage'

const selectors = {
  navBar: '.header__navigation',
  contacts: '.page-contact-form__contacts',
  form: '#details > form > div > div',
  cookie: '.footer-cookies > div > div > div:nth-child(2)',
}

class ContactPage extends BasePage{
  goToAboutUs() {
    cy.visit('/contact')
  }

  checkTestObject(ratio) {
    const elnum = this.getRandomInt(10)

    if (elnum < ratio) {
      throw new Error ('Element not Found')
    }
  }

  checkContacts(){
    cy.get(selectors.contacts)
  }

  fillForm(){
    cy.get(selectors.form).eq(0).type('Automation Bot')
    cy.get(selectors.form).eq(1).type('followUrBliss@bliss.com')
    cy.get(selectors.form).eq(2).type('214544553')
    cy.get(selectors.form).eq(3).type('Follow your Bliss with US!')
    cy.get(selectors.form).eq(4).click()
  }
}
export default ContactPage