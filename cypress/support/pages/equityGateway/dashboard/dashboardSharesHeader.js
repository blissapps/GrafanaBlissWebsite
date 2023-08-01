import BasePage from '../../basePage'

const selectors = {
  sharesHeaderBar: '[data-test-id="dbrd-port-breakdown"] eg-price-card',
  sharesFluctuation: '[data-test-id="dbrd-port-breakdown"] .pl-8 > .flex'
}

class DashboardSharesHeader extends BasePage {
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
      sharesPositiveRgx: /\s[0-9]*\.[0-9]+ \([0-9]*\.[0-9]+%\)\s/,
      sharesNegativeRgx: /\s-[0-9]*\.[0-9]+ \(-[0-9]*\.[0-9]+%\)\s/
    }

    cy.get(selectors.sharesFluctuation)
      .should('have.css', 'color')
      .then((color) => {
        const colorValue = String(color) // Convert color to string

        if (colorValue === shareLabels.sharesPositiveColor) {
          cy.get(selectors.sharesFluctuation).invoke('text').should('match', shareLabels.sharesPositiveRgx)
        } else if (colorValue === shareLabels.sharesNegativeColor) {
          cy.get(selectors.sharesFluctuation).invoke('text').should('match', shareLabels.sharesNegativeRgx)
        } else {
          throw new Error('Unexpected color value')
        }
      })
  }

  date(date) {
    cy.get(selectors.sharesHeaderBar).contains(date)
  }
}

export default DashboardSharesHeader