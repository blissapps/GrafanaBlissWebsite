import BasePage from '../basePage'

const selectors = {
  thumbnail: '.hero__overlay',
  workProjects: '.works__items',
  workProjectsSwiper: '.swiper',
  services: '.accordion-block',
  get servicesCategory() { return `${this.services} > :nth-child(2) > div` },
  cardsBlock: '.cards-block',
  statsBlock: '.stats-block',
  quotesContainer: '.quotes-block',
  btnExploreWork: '.call-to-action > .btn',

  navBar: '.header__navigation',
  form: '[id=details] > form > div > div',
  cookie: '.footer-cookies > div > div > div:nth-child(2)',
  blogId: '.blog-grid > :nth-child(3)'
}
class BlissHomePage extends BasePage{
  validateThumbnail(){
    cy.get(selectors.thumbnail).should('be.visible')
  }

  workProjects(){
    cy.get(selectors.workProjects).should('be.visible')
  }

  workProjectsSwiper(){
    cy.get(selectors.workProjectsSwiper).should('be.visible')
  }

  validateServices() {
    cy.get(selectors.services)
    cy.get(selectors.servicesCategory).invoke('text').then((text) => {
      expect(text).to.contain('Product Vision and Strategy')
      expect(text).to.contain('Product Experience and Design')
      expect(text).to.contain('Design System and Accessibility Setup')
      expect(text).to.contain('Emotional Design Foundations')
      expect(text).to.contain('Custom AI Agents')
      expect(text).to.contain('Web and Mobile Development')
      expect(text).to.contain('Server and Process Optimization')
      expect(text).to.contain('Product Lifecycle Management')
    })
  }

  cardsContainer() {
    cy.get(selectors.cardsBlock)
  }

  statsContainer() {
    cy.get(selectors.statsBlock)
  }

  quotesContainer(){
    cy.get(selectors.quotesContainer)
  }

  btnExploreWork(){
    cy.get(selectors.btnExploreWork).click( { force: true })
    cy.url().should('contain', 'our-work')
  }
}
export default BlissHomePage
