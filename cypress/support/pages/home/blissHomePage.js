import BasePage from '../basePage'

const selectors = {
  navBar: '.header__navigation',
  form: '[id=details] > form > div > div',
  cookie: '.footer-cookies > div > div > div:nth-child(2)',
  blogId: '.blog-grid > :nth-child(3)',
  btnFindOutMore: '.info > a > .button',
  btnCheckOurWork: '.services__action > a > .button'
}
class BlissHomePage extends BasePage{
  goToHome() {
    cy.visit('/')
    cy.get(selectors.navBar).should('exist')
  }

  checkTestObject(ratio) {
    this._cookie()

    const elnum = this.getRandomInt(10)

    if (elnum < 5) {
      cy.scrollTo('bottom')
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(600)
      cy.scrollTo('top')
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(300)
    }

    if (elnum < ratio) {
      throw new Error('Element not Found')
    }
  }

  /**
     * @param {string} page
     */
  checkPage(page = '') {
    this._cookie()

    if (!page){
      switch (page) {
        case 'aboutUs':
          cy.get(selectors.navBar).contains('About us').click()
          break

        case 'work':
          cy.get(selectors.navBar).contains('Work').click()
          break

        case 'careers':
          cy.get(selectors.navBar).contains('Careers').click()
          break

        case 'blog':
          cy.get(selectors.navBar).contains('Blog').click()
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(600)
          cy.scrollTo('bottom')
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(600)
          cy.get(selectors.blogId).click()
          break

        case 'contact':
          cy.get(selectors.navBar).contains('Contact').click()
          break
      }
    } else {
      cy.get(selectors.navBar).should('exist')
    }


    cy.get('.footer')
  }

  checkButtons() {
    cy.get(selectors.btnFindOutMore)
    cy.get(selectors.btnCheckOurWork)
  }

  checkForm() {
    this._cookie()

    cy.scrollTo('bottom')

    cy.get('[placeholder="Enter your email..."]').eq(1).type('toKnowMore@bliss.com', { force: true })
    cy.get('.input-checkbox > label').click()
  }

  _cookie () {
    cy.get(selectors.cookie).click()
  }
}
export default BlissHomePage