import BasePage from '../basePage'

const selectors = {
    pages: 'ul > :nth-child',
    shareInfo: '.pb-8 > eg-price-card',
    support: '.eg-sidebar > .flex-column > .flex'
}

class Sidebar extends BasePage {
    pages(){
        cy.get(selectors.pages+'(1)').contains('Dashboard')
        cy.get(selectors.pages+'(2)').contains('Portfolio')
        cy.get(selectors.pages+'(3)').contains('Plans')
        cy.get(selectors.pages+'(4)').contains('Transactions')
        cy.get(selectors.pages+'(5)').contains('Statements')
        cy.get(selectors.pages+'(6)').contains('Resources')
    }

    shareInfo(){
        cy.get(selectors.shareInfo).contains('Big Yellow Group PLC')
    }

    support(href){
        cy.get(selectors.support).click()
        cy.get(selectors.support)
            .should(($element) => {
                expect($element).to.have.attr('href', '/help');
            });
        cy.url().should('contain', href);

    }
}
export default Sidebar