import BasePage from '../../basePage'

const selectors = {
  filterSelector: '[data-test-id="dbrd-port-breakdown-select"]',
  portfolioBreakdown: '[data-test-id="dbrd-port-breakdown"]',
  portfolioSharesHeader: '[data-test-id="dbrd-port-breakdown-price-card-big"]',
  portfolioValue: '[data-test-id="dbrd-port-breakdown-text-total-potencial-value"]',
  portfolioUnits: '[data-test-id="dbrd-port-breakdown-text-units"]',
  portfolioStatusAvailable: '[data-test-id="dbrd-port-breakdown-card-by-status-available"]',
  portfolioStatusUnavailable: '[data-test-id="dbrd-port-breakdown-card-by-status-unavailable"]',
  portfolioTypeOptions: '[data-test-id="dbrd-port-breakdown-card-by-type-0"]', //by type filtered by by-type-0, 0, 1, 2...
  portfolioTypeOptionsUnitsAvailable: '[data-test-id="dbrd-port-breakdown-card-by-type-0-caption-green"]', //by type filtered by by-type-0, 0, 1, 2...
  portfolioTypeOptionsUnitsUnavailable: '[data-test-id="dbrd-port-breakdown-card-by-type-0-caption-orange"]', //by type filtered by by-type-0, 0, 1, 2...
  portfolioTypeShares: '[data-test-id="dbrd-port-breakdown-card-by-type-1"]',
  portfolioPlanSecurities: '[data-test-id="dbrd-port-breakdown-card-by-plan' //by plan filtered by card-by-plan-0, 0, 1, 2...
}

class Portfolio extends BasePage {
  filter(type) {
    cy.get(selectors.filterSelector).click()
    cy.get(`#option${type}`).click()
  }

  portfolioValidation() {
    cy.get(selectors.portfolioBreakdown).contains('Portfolio breakdown').should('be.visible')
    cy.get(selectors.portfolioValue).should('be.visible')
    cy.get(selectors.portfolioUnits).should('be.visible')
    cy.get(selectors.portfolioSharesHeader).should('be.visible')
    cy.get(selectors.filterSelector).should('be.visible')
  }

  filterContentStatus(availableAmount, availableUnits, unavailableAmount, unavailableUnits){
    cy.contains(selectors.portfolioStatusAvailable, availableAmount, availableUnits)
    cy.contains(selectors.portfolioStatusUnavailable, unavailableAmount, unavailableUnits)
  }

  filterContentType(availableOptionsAmount, availableOptionsAvailableUnits, availableOptionsUnavailableUnits, availableSharesAmount, availableSharesUnits){
    const totalUnits=availableOptionsAvailableUnits+availableOptionsUnavailableUnits

    cy.contains(selectors.portfolioTypeOptions, availableOptionsAmount, totalUnits)
    cy.contains(selectors.portfolioTypeOptionsUnitsAvailable, availableOptionsAvailableUnits)
    cy.contains(selectors.portfolioTypeOptionsUnitsUnavailable, availableOptionsUnavailableUnits)

    cy.contains(selectors.portfolioTypeShares, availableSharesAmount, availableSharesUnits)
  }

  filterContentPlan(numSecurities, cards){
    for (let i = 0; i <= numSecurities-1; i++) {
      const card = cards[i]
      const [amount, units, available, unavailable] = card
      cy.get(selectors.portfolioPlanSecurities+`-${i}"]`).should('exist')
      cy.get(selectors.portfolioPlanSecurities+`-${i}-total-value"]`).should('contain', amount)
      cy.get(selectors.portfolioPlanSecurities+`-${i}-units"]`).should('contain', units)
      cy.get(selectors.portfolioPlanSecurities+`-${i}-caption-green"]`).should('contain', available)
      cy.get(selectors.portfolioPlanSecurities+`-${i}-caption-orange"]`).should('contain', unavailable)
    }
  }

  portfolioValue(label1) {
    cy.get(selectors.portfolioUnits).contains(`${label1} Units`)
  }
}

export default Portfolio