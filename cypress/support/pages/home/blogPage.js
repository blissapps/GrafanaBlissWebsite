import BasePage from '../basePage'
import TopMenu from '../elementBars/topMenu'

const topMenu = new TopMenu();
const selectors = {
  topBar: '.top-bar',
  thumbnail: '#main > .hero-pages',
  btnFilter: '#main > .posts > .filters > .filters__container > .filters__item',
  btnFilterInnerContainer: '.filters__inner-container',
  postsContainer: '#main > .posts  > :nth-child(2) > article',
  btnPostsLoadMore: '.posts > .btn'
}

class BlogPage extends BasePage{
  goToBlog () {
    cy.visit('/blog')
    cy.get(selectors.topBar).should('exist')
    topMenu.validateTopBar();
  }

  validateThumbnail(){
    cy.get(selectors.thumbnail)
  }

  btnFilters() {
    cy.get(selectors.btnFilter).click( { force: true })
    cy.get(selectors.btnFilterInnerContainer).invoke('text').then((text) => {
      cy.log('Texto Obtido: \n' + text.trim())
      expect(text).to.contain('All articles')
      expect(text).to.contain('News')
      expect(text).to.contain('Opinion')
    })
  }

  validatePostsContainer () {
    cy.get(selectors.postsContainer)
  }

  btnPostsLoadMore() {
    cy.get(selectors.btnPostsLoadMore).click()
  }
}
export default BlogPage