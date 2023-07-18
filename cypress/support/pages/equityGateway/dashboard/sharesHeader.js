import BasePage from '../../basePage'

const selectors = {
  sharesHeaderBar: 'eg-price-card',
  sharesFluctuation: '.pl-8 > .flex'
}

class SharesHeader extends BasePage {
  sharesName(name) {
    cy.get(selectors.sharesHeaderBar).contains(name)
  }

  currency(currency) {
    cy.get(selectors.sharesHeaderBar).contains(currency)
  }

  sharesAmount(amount) {
    cy.get(selectors.sharesHeaderBar).contains(amount)
  }

  sharesFluctuation(sharesPositiveColor, sharesNegativeColor, sharesPositiveReg, sharesNegativeReg) {
    cy.get(selectors.sharesFluctuation)
      .should('have.css', 'color')
      .then((color) => {
        const colorValue = String(color) // Convert color to string

        if (colorValue === sharesPositiveColor) {
          cy.get(selectors.sharesFluctuation).invoke('text').should('match', sharesPositiveReg)
        } else if (colorValue === sharesNegativeColor) {
          cy.get(selectors.sharesFluctuation).invoke('text').should('match', sharesNegativeReg)
        } else {
          cy.wrap(false).should('be.true', 'Unexpected color value')
        }
      })
  }

  date(date) {
    cy.get(selectors.sharesHeaderBar).contains(date)
  }
}

export default SharesHeader