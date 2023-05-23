import BasePage from '../../basePage'

const selectors = {
    filterSelector: 'gs-select[aria-label="graph type"]',
    portfolio: '.eg-portfolio'
}

class portfolio extends BasePage {
    filter(type){
        cy.get(selectors.filterSelector).click()
        cy.get(`#option${type}`).click()
    }

    portfolio(label1, label2){
        cy.contains(selectors.portfolio, label1).contains(selectors.portfolio, label2)
    }
}
export default portfolio