import EquityGateway from '../../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

/**
 * https://globalshares.testrail.net/index.php?/suites/view/18820&group_by=cases:section_id&group_order=asc&display_deleted_cases=0&group_id=1026234
 * Sales Wizard Summary Sidebar Test Suite
 */

describe('Sales Wizard Element Bars Tests', () => {
  let accInfo

  before(() => {
    equityGateway.LoginPage.getAccInfo().then((result) => {
      accInfo = result
      // Use the returned values
      // @ts-ignore
      const { securityName, securityPosition, stockName, shareName, totalShares, availableShares, availableWihRestrictions, orderName, shares2sell } = accInfo
      cy.log('Account Info: ' + securityName, securityPosition, stockName, shareName, availableShares, availableWihRestrictions, totalShares, orderName, shares2sell)
    })
  })

  beforeEach(() => {
    //NOT NECESSARY YET  - equityGateway.LoginPage.login()
    equityGateway.SalesWizBase.gotoSecurity()
  })

  context('General Summary Menu Validations', () => {
    /** Related to User Stories
     * EGVFOUR-138, EGVFOUR-261
     **/
    it('C30639270/..271 - Menu Elements Validation', () => {
      const menuSimpleElements = ['summary', 'Need Help', 'Your summary will be displayed here']
      equityGateway.SalesWizSideRmenu.elementsValidation(menuSimpleElements)
    })

    it('C30639277 - Clicking the helpdesk hyperlink of the summary sidebar redirects users to the help page', () => {
      equityGateway.SalesWizSideRmenu.helpUrlValidation()
    })
  })

  context('Summary Side Menu Element Stepper Individual Validations', () => {
    it('C30639272 - Validate sidebar in Step 2 - Security', () => {
      equityGateway.SalesWizSecurityPage.cardClick(accInfo.securityPosition)
      equityGateway.SalesWizTopBar.btnNext('click')

      equityGateway.SalesWizSideRmenu.securitySummary([accInfo.securityName, accInfo.stockName])
    })

    it('C30639273 - Validate sidebar in Step 3 - Share Group', () => {
      equityGateway.SalesWizSecurityPage.cardClick(accInfo.securityPosition)
      equityGateway.SalesWizTopBar.btnNext('click')

      equityGateway.SalesWizShareGroupPage.selectShareGroupByName(accInfo.shareName)
      equityGateway.SalesWizTopBar.btnNext('click')

      equityGateway.SalesWizSideRmenu.shareGroupShareGroupSummary(accInfo.shareName)
    })

    it('C30639274 - Validate sidebar in Step 4 - Amount to Sell', () => {
      equityGateway.SalesWizSecurityPage.cardClick(accInfo.securityPosition)
      equityGateway.SalesWizTopBar.btnNext('click')

      equityGateway.SalesWizShareGroupPage.selectShareGroupByName(accInfo.shareName)
      equityGateway.SalesWizTopBar.btnNext('click')

      equityGateway.SalesWizAmount2SellPage.inputFieldShares('type', accInfo.shares2sell)
      equityGateway.SalesWizTopBar.btnNext('click')

      equityGateway.SalesWizSideRmenu.amount2SellShareGroupSummary([accInfo.shares2sell, accInfo.totalShares])
    })

    it('C30639275 - Validate sidebar in Step 5 - Order Type', () => {
      equityGateway.SalesWizSecurityPage.cardClick(accInfo.securityPosition)
      equityGateway.SalesWizTopBar.btnNext('click')

      equityGateway.SalesWizShareGroupPage.selectShareGroupByName(accInfo.shareName)
      equityGateway.SalesWizTopBar.btnNext('click')

      equityGateway.SalesWizAmount2SellPage.inputFieldShares('type', accInfo.shares2sell)
      equityGateway.SalesWizTopBar.btnNext('click')

      equityGateway.SalesWizOrderTypePage.selectOrderTypeByName(accInfo.orderName).click()
      equityGateway.SalesWizTopBar.btnNext('click')

      equityGateway.SalesWizSideRmenu.oderTypeShareGroupSummary(accInfo.orderName)
    })
  })

  context('Summary Side Menu Element Stepper Complex Validations', () => {
    it('C30639278/..279 - Changes in the summary sidebar are displayed when user clicks the next button', () => {
      equityGateway.SalesWizSecurityPage.cardClick(accInfo.securityPosition)
      equityGateway.SalesWizTopBar.btnNext('click')
      equityGateway.SalesWizSideRmenu.securitySummary()

      equityGateway.SalesWizShareGroupPage.selectShareGroupByName(accInfo.shareName)
      equityGateway.SalesWizTopBar.btnNext('click')
      equityGateway.SalesWizSideRmenu.shareGroupShareGroupSummary()

      equityGateway.SalesWizAmount2SellPage.inputFieldShares('type', accInfo.shares2sell)
      equityGateway.SalesWizTopBar.btnNext('click')
      equityGateway.SalesWizSideRmenu.amount2SellShareGroupSummary()

      equityGateway.SalesWizOrderTypePage.selectOrderTypeByName(accInfo.orderName).click()
      equityGateway.SalesWizTopBar.btnNext('click')
      equityGateway.SalesWizSideRmenu.oderTypeShareGroupSummary()

      equityGateway.SalesWizSideRmenu.elementsValidation([accInfo.securityName, accInfo.shareName, accInfo.shares2sell, accInfo.totalShares, accInfo.orderName])
    })
  })
})
