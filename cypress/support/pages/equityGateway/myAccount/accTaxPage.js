import BasePage from '../../basePage'

// @ts-ignore
const selectors = {
    header: '.text-h2',
    infoSector: 'gs-card.p-4.mb-4.hover',
    yearMenu: 'input[placeholder="Select year"]',
    yearMenuOptions: '#option',
    typeMenu: 'input[placeholder="Select type"]',
    typeMenuOptions: '#option',
    reportsContent: '.eg-tax > .p-5'
}

class accTaxPage extends BasePage {
    header(title){
        cy.get(selectors.header).should('contain.text', title)
    }
    infoSector(info){
        info.forEach((item) => {
            cy.get(selectors.infoSector).contains(item).should('exist')
        })
    }
    yearMenuSelect(position, positionName) {
        cy.get(selectors.yearMenu)
            .click()
            .get(selectors.yearMenuOptions + (position - 1).toString()) // Convert position to string
            .should('have.text', positionName)
            .click()
    }
    typeMenuSelect(position, positionName) {
        cy.get(selectors.typeMenu)
            .click()
            .get(selectors.typeMenuOptions + (position - 1).toString()) // Convert position to string
            .should('have.text', positionName)
            .click()
    }
    reportsElements(elements, exist){
        elements.forEach((item) => {
            cy.get(selectors.reportsContent).contains(item).should(exist)
        });
    }

}
export default accTaxPage