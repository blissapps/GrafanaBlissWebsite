import BasePage from '../basePage'

class AboutUsPage extends BasePage{
  goToHome() {
    cy.visit('/about-us')
  }

  checkTestObject(ratio) {
    const elnum = this.getRandomInt(10)

    if (elnum < ratio) {
      throw new Error ('Element not Found')
    }
  }
  checkForm() {
    cy.scrollTo('bottom')

    cy.get('[placeholder="Enter your email..."]').eq(1).type('toKnowMore@bliss.com', { force: true })
    cy.get('.input-checkbox > label').click()
  }
}
export default AboutUsPage