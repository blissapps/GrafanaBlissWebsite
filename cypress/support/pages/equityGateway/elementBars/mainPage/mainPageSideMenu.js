import BasePage from '../../../basePage'

const selectors = {
  pages: 'ul > :nth-child',
  shareInfo: '[data-test-id="dbrd-port-breakdown"] eg-price-card',
  shareDerivation: '.lg\\:mr-8 > .flex',
  support: '.eg-sidebar > .flex-column > a',
  sideBarButton: 'li > gs-button'
}

const sideMenuElementPositions = {
  Dashboard: 0,
  Portfolio: 1,
  Plans: 2,
  Transactions: 3,
  Statements: 4,
  Resources: 5
}

class MainPageSideMenu extends BasePage {
  mainPages(position, name) {
    cy.get(selectors.pages + '(' + position + ')').contains(name)
  }

  shareInfo(name, amount, currency, date) {
    const shareLabels = {
      sharesPositiveColor: 'rgb(0, 153, 0)',
      sharesNegativeColor: 'rgb(223, 7, 7)',
      sharesPositiveRgx: /\+[0-9]*\.[0-9]+ \(\+[0-9]*\.[0-9]+%\)/,
      sharesNegativeRgx: /-[0-9]*\.[0-9]+ \(-[0-9]*\.[0-9]+%\)/
    }

    cy.get(selectors.shareInfo).contains(name)
    cy.get(selectors.shareInfo).contains(amount)
    cy.get(selectors.shareInfo).contains(currency)
    cy.get(selectors.shareInfo).contains(date)

    cy.get(selectors.shareDerivation)
      .should('have.css', 'color')
      .then((color) => {
        const colorValue = String(color) // Convert color to string

        if (colorValue === shareLabels.sharesPositiveColor) {
          cy.get(selectors.shareDerivation).invoke('text').should('match', shareLabels.sharesPositiveReg)
        } else if (colorValue === shareLabels.sharesNegativeColor) {
          cy.get(selectors.shareDerivation).invoke('text').should('match', shareLabels.sharesNegativeReg)
        } else {
          throw new Error('Unexpected color value')
        }
      })
  }

  support(label) {
    cy.get(selectors.support).should('contain.text', label)
    cy.get(selectors.support).click({ force: true })
  }

  clickSideMenuButton(buttonToClick) {
    cy.get(selectors.sideBarButton).eq(sideMenuElementPositions[buttonToClick])
  }
}

export default MainPageSideMenu
