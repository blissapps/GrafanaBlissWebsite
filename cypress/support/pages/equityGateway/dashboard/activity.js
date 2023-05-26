import BasePage from '../../basePage'

const selectors = {
    filterSelector: 'gs-select[aria-label="graph type"]',
    portfolio: '.eg-portfolio',
    portfolioBasis: '.eg-portfolio > .flex-column'
}

class Activity extends BasePage {
    filter(type){
        cy.get(selectors.filterSelector).click()
        cy.get(`#option${type}`).click()
    }

    filterContent(label1, label2){
        cy.contains(selectors.portfolio, label1).contains(selectors.portfolio, label2)
    }

    portfolioBasis(label1){
        cy.contains(selectors.portfolioBasis, 'Estimated gross value')
        cy.get('p.text-color-cool80.mb-5').contains(`${label1} Units`);
    }
}
export default Activity