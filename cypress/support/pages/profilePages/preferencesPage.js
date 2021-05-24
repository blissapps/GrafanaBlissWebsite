import BasePage from '../basePage'

const selectors = {
  englishCard: '(//section//gs-card)[1]',
  portugueseCard: '(//section//gs-card)[2]',
  chineseCard: '(//section//gs-card)[3]',
  japaneseCard: '(//section//gs-card)[4]'
}

const properties = {
  pageURL: '/profile/preferences'
}

class SecurityPage extends BasePage {
  /**
   * Checks if the current page is the one in the properties
   */
  checkProfilePreferencesUrl() {
    this.checkUrl(properties.pageURL)
  }

  /**
   *
   * @param {String} language language name to change.
   *
   * @example List currently available: english (default), portuguese, chinese, and japanese
   */
  changeLanguage(language = 'english') {
    language = language.toLowerCase()
    switch (language) {
      case 'portuguese':
        cy.xpath(selectors.portugueseCard).click()
        break

      case 'chinese':
        cy.xpath(selectors.chineseCard).click()
        break

      case 'japanese':
        cy.xpath(selectors.japaneseCard).click()
        break

      default:
        cy.xpath(selectors.englishCard).click()
        break
    }
  }
}

export default SecurityPage
