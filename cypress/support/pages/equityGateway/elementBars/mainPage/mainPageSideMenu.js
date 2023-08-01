import BasePage from '../../../basePage'

const selectors = {
  pages: '[data-test-id="dbrd-sidebar-nav"] > ul > :nth-child',
  shareCard: '[data-test-id="dbrd-sidebar-price-card-small"]',
  shareToSelect: '[data-test-id="dbrd-sidebar-price-card-small-all-share-classes"]',
  shareCardDerivation: '[data-test-id="dbrd-sidebar-price-card-small"]  > div > div > div > p',
  btnShareInfoCards: '[data-test-id="dbrd-sidebar-price-card-small-all-share-classes"] > gs-button',
  btnShareInfoCardsNoCardSelected: '[data-test-id="dbrd-sidebar-price-card-small"]  gs-button',
  shareCardsModal: '[data-test-id="dbrd-share-class"]',
  shareCardsModalCard: '[data-test-id="dbrd-share-class-card-0"]',
  btnSupport: '.eg-sidebar > .flex-column > a',
  btnSideBarPages: 'li > gs-button'
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
  pages(position, name) {
    cy.get(selectors.pages + '(' + position + ')').contains(name)
  }

  shareSelect(shareCardActive, shareToSelect) {
    let selectorToUse
    if (shareCardActive === 'true') {
      selectorToUse = selectors.btnShareInfoCardsNoCardSelected
    } else {
      selectorToUse = selectors.btnShareInfoCards
    }

    cy.get(selectorToUse).click()
    cy.get(selectors.shareCardsModal+' [data-test-id="dbrd-share-class-input"]').should('have.attr', 'placeholder', 'Search share class')
    cy.get(selectors.shareCardsModal).should('contain.text', 'All share classes')
    cy.get(selectors.shareCardsModal).contains(shareToSelect).click()
  }

  shareValidation(shareCardActive, name, amount, currency, date) {
    const shareLabels = {
      sharesPositiveColor: 'rgb(0, 153, 0)',
      sharesNegativeColor: 'rgb(223, 7, 7)',
      sharesPositiveRgx: /\s[0-9]*\.[0-9]+ \([0-9]*\.[0-9]+%\)\s/,
      sharesNegativeRgx: /\s-[0-9]*\.[0-9]+ \(-[0-9]*\.[0-9]+%\)\s/
    }
    if (shareCardActive === 'true') {
      cy.get(selectors.shareCard).should('contain.text', name).should('contain.text', amount).should('contain.text', currency).should('contain.text', date)

      cy.get(selectors.shareCardDerivation)
        .should('have.css', 'color')
        .then((color) => {
          const colorValue = String(color) // Convert color to string

          if (colorValue === shareLabels.sharesPositiveColor) {
            cy.get(selectors.shareCardDerivation).invoke('text').should('match', shareLabels.sharesPositiveRgx)
          } else if (colorValue === shareLabels.sharesNegativeColor) {
            cy.get(selectors.shareCardDerivation).invoke('text').should('match', shareLabels.sharesNegativeRgx)
          } else {
            throw new Error('Unexpected color value')
          }
        })
    } else if (shareCardActive === 'false'){
      cy.get(selectors.shareToSelect).should('exist')
    } else {
      throw new Error('Unexpected shareCardActive value')
    }
  }

  support(label) {
    cy.get(selectors.btnSupport).should('contain.text', label)
    cy.get(selectors.btnSupport).click({ force: true })
  }

  clickSideMenuButton(buttonToClick) {
    cy.get(selectors.btnSideBarPages).eq(sideMenuElementPositions[buttonToClick])
  }
}

export default MainPageSideMenu
