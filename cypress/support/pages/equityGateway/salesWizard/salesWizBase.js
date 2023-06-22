import BasePage from '../../basePage'

class salesWizBase extends BasePage {
    gotoSalesWiz(){
        cy.window().then((win) => {
            // @ts-ignore
            win.location.href = Cypress.env('EQUITY_GATEWAY_BASE_URL')+'/sale-wizard/overview'
        })
    }
}
export default salesWizBase