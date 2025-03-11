import BasePage from '../basePage'
import TopMenu from '../elementBars/topMenu'

const topMenu = new TopMenu();
const selectors = {
  topBar: '.top-bar',
  thumbnail: '#main > .hero-pages',
  works: '#main > .works',
  btnWorksLoadMore: '#main > .works > .btn',
  btnGetInTOuch: '.work-content__button > .btn',
  brands: '.swiper'
}

class WorkPage extends BasePage{
  goToWork () {
    cy.visit('/our-work')
    cy.get(selectors.topBar).should('exist')
    topMenu.validateTopBar();
  }

  validateThumbnail(){
    cy.get(selectors.thumbnail)
  }

  validateWorkContent(){
    cy.get(selectors.works)
  }

  brandsContainer() {
    cy.get(selectors.brands)
  }

  btnWorkContent(){
    cy.get(selectors.btnWorksLoadMore)
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
export default WorkPage