import BasePage from '../../basePage'

const selectors = {
    filterSelector: 'gs-select[aria-label="graph type"]',
    portfolio: '.eg-portfolio',
    portfolioBasis: '.eg-portfolio > .flex-column',
    portfolioValueAndUnits: 'div.flex.align-items-center.py-2.px-4'
}

class Portfolio extends BasePage {
    filter(type){
        cy.get(selectors.filterSelector).click()
        cy.get(`#option${type}`).click()
    }

    filterContent(label1, label2){
        cy.contains(selectors.portfolio, label1).contains(selectors.portfolio, label2)
    }

    portfolioBasis(label1){
        cy.contains(selectors.portfolioBasis, 'Estimated gross value')
        cy.get(selectors.portfolioValueAndUnits).contains(`${label1} Units`)
    }
}
export default Portfolio