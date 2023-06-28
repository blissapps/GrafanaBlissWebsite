import BasePage from '../../basePage'
import SalesWizTopBar from '../elementBars/salesWizard/salesWizTopBar'
import SalesWizSecurityPage from './salesWizSecurityPage'
import SalesWizShareGroupPage from './salesWizShareGroupPage'
import SalesWizAmount2SellPage from './salesWizAmount2SellPage'
import SalesWizOrderTypePage from './salesWizOrderTypePage'
import salesWizDistributionPage from './salesWizDistributionPage'

const salesWizTopBar = new SalesWizTopBar()
const salesWizSecurity = new SalesWizSecurityPage()
const salesWizShareGroup = new SalesWizShareGroupPage()
const salesWizAmount2Sell = new SalesWizAmount2SellPage()
const salesWizOrderType = new SalesWizOrderTypePage()
const salesWizDistribution = new salesWizDistributionPage()

class salesWizBase extends BasePage {
    gotoSalesWiz(){
        cy.window().then((win) => {
            // @ts-ignore
            win.location.href = Cypress.env('EQUITY_GATEWAY_BASE_URL')+'/sale-wizard/overview'
        })
    }

    gotoSecurity(){
        this.gotoSalesWiz()
        salesWizTopBar.nextBtn('click')
        cy.url().should('include', '/security')
    }

    gotoShareGroup(){
        this.gotoSecurity()
        salesWizSecurity.cardClick('St James Place')
        salesWizTopBar.nextBtn('click')
        cy.url().should('include', '/share-group')
    }

    gotoAmount2Sell(){
        this.gotoShareGroup()
        salesWizShareGroup.selectShareGroupByName('Purchase plan issuances')
        salesWizTopBar.nextBtn('click')
        cy.url().should('include', '/amount-to-sell')
    }

    goToOrderType() {
        this.gotoAmount2Sell()
        salesWizAmount2Sell.inputFieldShares('type', '100')
        salesWizTopBar.nextBtn('click')
        cy.url().should('include', '/order-type')
    }

    goToDistribution() {
        this.goToOrderType()
        salesWizOrderType.selectOrderTypeByName('Market Order').click()
        salesWizTopBar.nextBtn('click')
        cy.url().should('include', '/distribution')
    }

    goToReviewOrder() {
        this.goToDistribution()
        salesWizDistribution.selectElementByOption('method', 'Wire')
        salesWizDistribution.selectElementByOption('bankAccount', 'Santander - G78NORTH 1234 5698 7267 45')
        salesWizDistribution.selectElementByOption('currency', 'Dollar ・ USD')
        salesWizTopBar.nextBtn('click')
        cy.url().should('include', '/review-order')
    }
}
export default salesWizBase