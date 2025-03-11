import BasePage from '../basePage'
import TopMenu from '../elementBars/topMenu'

const topMenu = new TopMenu();
const selectors = {
  topBar: '.top-bar',
  thumbnail: '#main > .hero-pages',
  postsContainer: '#main > .posts  > :nth-child(2) > article',
  officesContainer: '.offices-block',
  emailsBlock: '.emails-block',
  formLabels: '.contact-form__fields > label',
  fromSelect: '.form > div > form > div > div:nth-child(5)',
  fromAfterSelect: '.form > div > form > div',
  btnUploadCv: '.contact-form__cv  > label > div',
  checkTerms: '.contact-form__disclaimer > div > span > span > span > label > input',
  btnSubmit: '.contact-form__submit-container'
}

class ContactPage extends BasePage{
  goToContact () {
    cy.visit('/contacts')
    cy.get(selectors.topBar).should('exist')
    topMenu.validateTopBar();
  }

  validateThumbnail(){
    cy.get(selectors.thumbnail)
  }

  validateLocationsContainer () {
    cy.get(selectors.officesContainer).invoke('text').then((text) => {
      cy.log(text)
      expect(text).to.contain('Lisbon')
      expect(text).to.contain('Porto')
      expect(text).to.contain('Copenhagen')
      expect(text).to.contain('Boston')
    })
  }

  validateEmailContainer(){
    cy.get(selectors.emailsBlock).invoke('text').then((text) => {
      cy.log(text)
      expect(text).to.contain('Become a client')
      expect(text).to.contain('sales@blissapplications.com')
      expect(text).to.contain('Join us')
      expect(text).to.contain('jobs@blissapplications.com')
      expect(text).to.contain('Everything else')
      expect(text).to.contain('info@blissapplications.com')
    })
  }

  /**
     * @param {string} firstName
     */
  validateForm(firstName, lastName, email, subject) {
    cy.get(selectors.formLabels+':nth-child(1)').type(firstName)
    cy.get(selectors.formLabels+':nth-child(2)').type(lastName)
    cy.get(selectors.formLabels+':nth-child(3)').type(email)
    cy.get(selectors.fromSelect).click()
    switch (subject) {
      case '1':
        cy.get(selectors.fromSelect+'> div:nth-child(2)').contains('Become a client').click()
        break;

      case '2':
        cy.get(selectors.fromSelect+'> div:nth-child(2)').contains('Join us').click()
        break;

      case '3':
        cy.get(selectors.fromSelect+'> div:nth-child(2)').contains('Everything else').click()
        break;

      default:
        throw new Error('Invalid Subject')
    }
  }

  /**
     * @param {string} companyName
     * @param {string} phoneNumber
     * @param {string} message
     */
  validateBecameClient(companyName, phoneNumber, message){
    cy.get(selectors.fromAfterSelect+' > div:nth-child(6)').type(companyName)
    cy.get(selectors.fromAfterSelect+' > div:nth-child(8)').type(phoneNumber)
    cy.get(selectors.fromAfterSelect+' > div:nth-child(10)').type(message)
  }

  /**
     * @param {string} phoneNumber
     * @param {string} message
     */
  validateJoin(phoneNumber, message){
    cy.get(selectors.fromAfterSelect+' > div:nth-child(7)').click()
    cy.get(selectors.fromAfterSelect+' > div:nth-child(7) > div > div:nth-child(2)').invoke('text').then((text) => {
      cy.log(text)
      expect(text).to.contain('Design')
      expect(text).to.contain('Engineering')
      expect(text).to.contain('Project Management')
      expect(text).to.contain('Functional Analysis')
      expect(text).to.contain('Quality Assurance')
      expect(text).to.contain('Other')
    })
    cy.get(selectors.fromAfterSelect+' > div:nth-child(7) > div > div:nth-child(2)').contains('Other').click()
    cy.get(selectors.fromAfterSelect+' > div:nth-child(9)').type(phoneNumber)
    cy.get(selectors.fromAfterSelect+' > div:nth-child(10)').type(message)
    cy.get(selectors.btnUploadCv).should('be.visible')
  }

  /**
     * @param {string} phoneNumber
     * @param {string} message
     */
  validateEvrElse(phoneNumber, message){
    cy.get(selectors.fromAfterSelect+' > div:nth-child(8)').type(phoneNumber)
    cy.get(selectors.fromAfterSelect+' > div:nth-child(10)').type(message)
    cy.get(selectors.checkTerms).click()
  }

  /**
     * @param {string | null} checkTerms
     */
  submitForm(checkTerms = null){
    if (checkTerms != null) {
      cy.get(selectors.checkTerms).click()
      cy.get(selectors.btnUploadCv).should('be.visible')
    } else {
      cy.get(selectors.btnUploadCv).should('not.be.visible')
    }
  }
}
export default ContactPage