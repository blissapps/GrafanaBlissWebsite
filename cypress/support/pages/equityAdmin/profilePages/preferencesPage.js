import BasePage from '../../basePage'

const selectors = {
  englishCard: '#langCarden-US',
  portugueseCard: '#langCardpt',
  chineseCard: '#langCardzh-chs',
  japaneseCard: '#langCardja'
}

const properties = {
  pageURL: '/profile/preferences'
}

class PreferencesPage extends BasePage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
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
        cy.get(selectors.portugueseCard).click()
        break

      case 'chinese':
        cy.get(selectors.chineseCard).click()
        break

      case 'japanese':
        cy.get(selectors.japaneseCard).click()
        break

      default:
        cy.get(selectors.englishCard).click()
        break
    }
  }
}

export default PreferencesPage
