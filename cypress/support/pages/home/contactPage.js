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
  fromSelect: '.form > div > form > div > div:nth-child(5)'
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
  validateForm(firstName, lastName, email) {
    cy.get(selectors.formLabels+':nth-child(1)').type(firstName)
    cy.get(selectors.formLabels+':nth-child(2)').type(lastName)
    cy.get(selectors.formLabels+':nth-child(3)').type(email)
    cy.get(selectors.fromSelect).click()

  }
}
export default ContactPage