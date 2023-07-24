import BasePage from '../../basePage'
import SalesWizTopBar from '../elementBars/salesWizard/salesWizTopBar'
import SalesWizSecurityPage from './salesWizSecurityPage'
import SalesWizShareGroupPage from './salesWizShareGroupPage'
import SalesWizAmount2SellPage from './salesWizAmount2SellPage'
import SalesWizOrderTypePage from './salesWizOrderTypePage'
import SalesWizDistributionPage from './salesWizDistributionPage'

const salesWizTopBar = new SalesWizTopBar()
const salesWizSecurity = new SalesWizSecurityPage()
const salesWizShareGroup = new SalesWizShareGroupPage()
const salesWizAmount2Sell = new SalesWizAmount2SellPage()
const salesWizOrderType = new SalesWizOrderTypePage()
const salesWizDistribution = new SalesWizDistributionPage()

class salesWizBase extends BasePage {
  gotoSalesWiz() {
    cy.window().then((win) => {
      // @ts-ignore
      win.location.href = Cypress.env('EQUITY_GATEWAY_BASE_URL') + '/sale-wizard/overview'
    })
  }

  gotoSecurity() {
    this.gotoSalesWiz()
    salesWizTopBar.btnNext('click')
    //FIXME - URL Issues FIX cy.url().should('include', '/security')
  }

  gotoShareGroup(hasSecurityStep = true) {
    if (hasSecurityStep) {
      this.gotoSecurity()
      salesWizSecurity.cardClick(304)
      salesWizTopBar.btnNext('click')
      //FIXME - URL Issues FIX  cy.url().should('include', '/share-group')
    }
  }

  gotoAmount2Sell(hasSecurityStep = true, hasShareGroupStep=true) {
    this.gotoShareGroup(hasSecurityStep)
    if (hasShareGroupStep){
      salesWizShareGroup.selectShareGroupByName('Purchase plan issuances')
      salesWizTopBar.btnNext('click')
    }
    //FIXME - URL Issues FIX cy.url().should('include', '/amount-to-sell')
  }

  goToOrderType(hasSecurityStep = true, hasShareGroupStep=true) {
    this.gotoAmount2Sell(hasSecurityStep, hasShareGroupStep)
    salesWizAmount2Sell.inputFieldShares('type', '100')
    salesWizTopBar.btnNext('click')
    //FIXME - URL Issues FIX cy.url().should('include', '/order-type')
  }

  goToDistribution(hasSecurityStep = true, hasShareGroupStep=true) {
    this.goToOrderType(hasSecurityStep, hasShareGroupStep)
    salesWizOrderType.selectOrderTypeByName('Market Order').click()
    salesWizTopBar.btnNext('click')
    //FIXME - URL Issues FIX cy.url().should('include', '/distribution')
  }

  goToReviewOrder(hasSecurityStep = true, hasShareGroupStep=true) {
    this.goToDistribution(hasSecurityStep, hasShareGroupStep)
    salesWizDistribution.selectElementByOption('method', 'Wire')
    salesWizDistribution.selectElementByOption('bankAccount', 'Santander - G78NORTH 1234 5698 7267 45')
    salesWizDistribution.selectElementByOption('currency', 'Dollar ・ USD')
    salesWizTopBar.btnNext('click')
    //FIXME - URL Issues FIX cy.url().should('include', '/review-order')
  }
}

export default salesWizBase