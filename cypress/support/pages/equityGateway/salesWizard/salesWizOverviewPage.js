import BasePage from '../../basePage'

const selectors = {
    pageHeader: 'header',
    sectionShares2Sell: 'gs-card[data-test-id="sw-overview-graph-container"]',
    sectionShares2SellGraph: '.eg-graph > ',
    sectionProcessOverview: 'gs-card[data-test-id="sw-overview-process"]'
}

class salesWizOverviewPage extends BasePage {
    pageHeaderValidation(elements){
        elements.forEach((item) => {
            cy.get(selectors.pageHeader).contains(item).should('exist')
        })
    }

    pageSharesValidation(elements, percentAvailable, percentAvailableWithRestrict, percentUnavailable, percentInProgress){
        elements.forEach((item) => {
            cy.get(selectors.sectionShares2Sell).contains(item).should('exist')
        })

        cy.get(selectors.sectionShares2SellGraph+'.eg-graph--green').invoke('attr', 'style').should('contain', `width: ${percentAvailable}%`)
        cy.get(selectors.sectionShares2SellGraph+'.eg-graph--yellow').invoke('attr', 'style').should('contain', `width: ${percentAvailableWithRestrict}%`)
        cy.get(selectors.sectionShares2SellGraph+'.eg-graph--orange').invoke('attr', 'style').should('contain', `width: ${percentUnavailable}%`)
        cy.get(selectors.sectionShares2SellGraph+'.eg-graph--blue').invoke('attr', 'style').should('contain', `width: ${percentInProgress}%`)
    }

    pageProcessValidation(elements){
        elements.forEach((item) => {
            cy.get(selectors.sectionProcessOverview).contains(item).should('exist')
        })
    }
}
export default salesWizOverviewPage