import BasePage from '../basePage'
import TopMenu from '../elementBars/topMenu'

const topMenu = new TopMenu();
const selectors = {
  topBar: '.top-bar',
  thumbnail: '#main > .hero-pages',
  blogContentBlock: '#main > .blog-content-block',
  workContentBlock: '#main > .work-content',
  workImg: '#main > .work-content > :nth-child(2) > picture > img',
  statsBlock: '#main > .stats-block',
  cardsBlock: '#main > .cards-block',
  countries: '#main > .countries',
  quotesBlock: '#main > .quotes-block',
  btnGetInTOuch: '.call-to-action > .btn'
}

class ServicesPage extends BasePage{

  goToService () {
    cy.visit('/services')
    cy.get(selectors.topBar).should('exist')
    topMenu.validateTopBar();
  }

  validateThumbnail(){
    cy.get(selectors.thumbnail)
  }

  validateBlogContent(){
    cy.get(selectors.blogContentBlock)
  }

  validateWorkImages() {
    cy.get(selectors.workImg).should('have.attr', 'src')
  }

  validateStatsContainer () {
    cy.get(selectors.statsBlock)
  }

  validateCardsBlock () {
    cy.get(selectors.cardsBlock)
  }

  validateLocationsSector () {
    cy.get(selectors.countries)
    cy.get(selectors.quotesBlock)
  }

  btnGetInTouch () {
    cy.get(selectors.btnGetInTOuch)
      .invoke('attr', 'href')
      .then((url) => {
        // @ts-ignore
        cy.visit(url)
      })
    cy.url().should('contain', 'contacts')
  }

}
export default ServicesPage