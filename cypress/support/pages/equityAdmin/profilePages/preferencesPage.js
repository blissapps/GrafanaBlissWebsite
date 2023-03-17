import BasePage from '../../basePage'

const selectors = {
  englishCard: '#langCarden-US',
  portugueseCard: '#langCardpt',
  chineseCard: '#langCardzh-chs',
  japaneseCard: '#langCardja',
  preferencesHeader: '#preferencesHeader'
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

  // -----------------------------------------------------------------------------  ASSERTIONS ---------------------------------------------------------------------- //

  /**
   * Assert if the Preferences header is displayed correctly
   *
   * @param {boolean} displayed True is the default value to validate with the header is displayed. False to validate the otherwise
   * @param {string} textToValidate Send a text to validate the text displayed in the header
   */
  assertHeaderIsDisplayedCorrectly(displayed = true, textToValidate = '') {
    if (displayed) {
      cy.get(selectors.preferencesHeader).should('be.visible')
      textToValidate !== '' ? cy.get(selectors.preferencesHeader).should('have.text', textToValidate) : null
    } else {
      cy.get(selectors.preferencesHeader).should('not.exist')
    }
  }

  // --------------------------------------------------------------------------------  OTHERS ----------------------------------------------------------------------- //

  /**
   *
   * @param {string} language language name to change.
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
