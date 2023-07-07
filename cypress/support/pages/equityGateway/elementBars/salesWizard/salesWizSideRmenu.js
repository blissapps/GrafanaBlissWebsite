import BasePage from '../../../basePage'

const selectors = {
    sideMenuSector: 'div[data-test-id="sw-right-bar"]',
    btnHelp: 'a[data-test-id="sw-right-bar-link-need-help"]',
    securitySummaryStepper: 'gs-card[data-test-id="sw-right-bar-summary-security"]',
    shareGroupSummaryStepper: 'gs-card[data-test-id="sw-right-bar-summary-shares-group"]',
    amount2SellSummaryStepper: 'gs-card[data-test-id="sw-right-bar-summary-amount-to-sell"]',
    orderTypeSummaryStepper: 'gs-card[data-test-id="sw-right-bar-summary-order-type"]'
}

class salesWizSideRmenu extends BasePage {
    elementsValidation(menuElements){
        menuElements.forEach((item) => {
            cy.get(selectors.sideMenuSector).contains(item).should('exist')
        })
    }

    helpUrlValidation(){
        cy.get('a[data-test-id="sw-right-bar-link-need-help"]')
            .should('have.attr', 'href')
            .and('include', '/help')
        cy.get(selectors.btnHelp).click()
        cy.url().should('contain', '/help')
    }

    securitySummary(elements) {
        cy.get(selectors.securitySummaryStepper)
            .should('be.visible')

        if (elements !== undefined){
            elements.forEach((item) => {
                cy.get(selectors.securitySummaryStepper).contains(item).should('exist')
            })
        }
    }

    shareGroupShareGroupSummary(element) {
        cy.get(selectors.shareGroupSummaryStepper)
            .should('be.visible')

        if (element !== undefined){
            cy.get(selectors.shareGroupSummaryStepper).should('contain.text', element)
        }
    }

    amount2SellShareGroupSummary(elements) {
        cy.get(selectors.amount2SellSummaryStepper)
            .should('be.visible')

        if (elements !== undefined){
            elements.forEach((item) => {
                cy.get(selectors.amount2SellSummaryStepper).contains(item).should('exist')
            })
        }
    }

    oderTypeShareGroupSummary(element) {
        cy.get(selectors.orderTypeSummaryStepper)
            .should('be.visible')

        if (element !== undefined){
            cy.get(selectors.orderTypeSummaryStepper).should('contain.text', element)
        }
    }
}
export default salesWizSideRmenu