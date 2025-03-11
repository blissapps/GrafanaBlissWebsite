import BasePage from '../basePage'
import TopMenu from '../elementBars/topMenu'

const topMenu = new TopMenu();
const selectors = {
  topBar: '.top-bar',
  thumbnail: '#main > .hero-pages',
  btnJoinUs: '.call-to-action > .btn',
  statsBlock: '#main > .stats-block',
  benefitsContainer: '#main > .cards-block',
  eventsContainer: '.events-block'
}

class CarrersPage extends BasePage{

  goToCareers () {
    cy.visit('/careers')
    cy.get(selectors.topBar).should('exist')
    topMenu.validateTopBar();
  }

  validateThumbnail(){
    cy.get(selectors.thumbnail)
  }

  btnContact () {
    cy.get(selectors.btnJoinUs).click({ force: true })
    cy.url().should('contain', 'contacts')
  }

  validateStatsContainer () {
    cy.get(selectors.statsBlock)
  }

  validateBenefitsContainer() {
    cy.get(selectors.benefitsContainer)
  }

  validateEventsContainer() {
    cy.get(selectors.eventsContainer)
  }
}
export default CarrersPage