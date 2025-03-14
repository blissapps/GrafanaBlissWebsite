import BasePage from '../basePage'
import TopMenu from '../elementBars/topMenu'

const topMenu = new TopMenu();
const selectors = {
  topBar: '.top-bar',
  thumbnail: '#main > .hero-pages',
  blogContentBlock: '#main > .blog-content-block',
  workImg: '.image',
  timeline: '#main > .timeline-block',
  clientSlideShow: '.clients-slideshow',
  lifeAtBliss: '#main > .life-at-bliss',
  btnJoinUs: '.call-to-action > .btn'
}

class AboutUsPage extends BasePage{
  goToAboutUs() {
      cy.visit('/about')
      cy.get(selectors.topBar).should('exist')
      topMenu.validateTopBar();
  }

  validateThumbnail(){
    cy.get(selectors.thumbnail)
  }

  validateBlogContent(){
    cy.get(selectors.blogContentBlock)
  }

  validateWorkImage() {
    cy.get(selectors.workImg).should('have.attr', 'src')
  }

  validateTimeline () {
    cy.get(selectors.timeline)
  }

  validateClientSlideShow () {
    cy.get(selectors.clientSlideShow)
  }

  validateLifeAtBliss () {
    cy.get(selectors.lifeAtBliss)
  }

  btnJoinUs () {
    cy.get(selectors.btnJoinUs).click()
    cy.url().should('contain', 'contacts')
  }
}
export default AboutUsPage