import BasePage from '../basePage'

const selectors = {
  topBar: '.top-bar',
  get topIco() { return `${this.topBar} > a`; },
  get topMenu() { return `${this.topBar} > nav`; },
  get topBtn() { return `${this.topBar} > div >.btn`; },

  thumbnail: '.hero__overlay'
}

class TopMenu extends BasePage{
  validateTopBar() {
    cy.get(selectors.topIco)
    cy.get(selectors.topMenu).invoke('text').then((text) => {
      cy.log(text)
      expect(text).to.contain('About us')
      expect(text).to.contain('Services')
      expect(text).to.contain('Work')
      expect(text).to.contain('Careers')
      expect(text).to.contain('Blog')
    })
    cy.get(selectors.topBtn)
  }

  btnGetInTouch() {
    cy.get(selectors.topBtn).click( { force: true })
    cy.url().should('contain', 'contacts')
  }
}
export default TopMenu