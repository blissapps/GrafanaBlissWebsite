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

  sharesFluctuation() {
    const shareLabels = {
      sharesPositiveColor: 'rgb(0, 153, 0)',
      sharesNegativeColor: 'rgb(223, 7, 7)',
      sharesPositiveRgx: /\+[0-9]*\.[0-9]+ \(\+[0-9]*\.[0-9]+%\)/,
      sharesNegativeRgx: /-[0-9]*\.[0-9]+ \(-[0-9]*\.[0-9]+%\)/
    }

    cy.get(selectors.sharesFluctuation)
      .should('have.css', 'color')
      .then((color) => {
        const colorValue = String(color) // Convert color to string

        if (colorValue === shareLabels.sharesPositiveColor) {
          cy.get(selectors.sharesFluctuation).invoke('text').should('match', shareLabels.sharesPositiveReg)
        } else if (colorValue === shareLabels.sharesNegativeColor) {
          cy.get(selectors.sharesFluctuation).invoke('text').should('match', shareLabels.sharesNegativeReg)
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