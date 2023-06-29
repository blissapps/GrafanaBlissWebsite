import EquityGateway from '../../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

describe('Sales Wizard Element Bars Tests', () => {
    let securityName, securityPosition, shareName, shares2sell, availableShares, availableWihRestrictions, orderName, stockName, sumShares

    before(() => {
        cy.fixture('gateway/salesWizard/summaryFlow').then((jsonObject) => {
            const {
                security: { securityName: sName, securityPosition: sPosition, stockName: sStockName },
                shareGroup: { shareName: sShareName },
                amountShares2sell: { shares2sell: s2sell, availableShares: sAvailableShares, availableWithRestrictionsShares: sAvailableWihRestrictions  },
                orderType: { orderName: oName }
            } = jsonObject

            securityName = sName
            stockName = sStockName
            securityPosition = sPosition
            shareName = sShareName
            shares2sell = s2sell
            availableShares = sAvailableShares
            availableWihRestrictions = sAvailableWihRestrictions
            orderName = oName
            sumShares = parseInt(availableShares) + parseInt(availableWihRestrictions)
            cy.log(securityName, securityPosition, shareName, shares2sell, availableShares, availableWihRestrictions, orderName)
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
            const menuSimpleElements= [
                'summary',
                'Need Help',
                'Your summary will be displayed here'
            ]
            equityGateway.SalesWizSideRmenu.elementsValidation(menuSimpleElements)
        })

        it('C30639277 - Clicking the helpdesk hyperlink of the summary sidebar redirects users to the help page', () => {
            equityGateway.SalesWizSideRmenu.helpUrlValidation()
        })
    })

    context('Summary Side Menu Element Stepper Individual Validations', () => {
        it('C30639272 - Validate sidebar in Step 2 - Security', () => {
            equityGateway.SalesWizSecurityPage.cardClick(securityPosition)
            equityGateway.SalesWizTopBar.btnNext('click')

            equityGateway.SalesWizSideRmenu.securitySummary([securityName, stockName])
        })

        it('C30639273 - Validate sidebar in Step 3 - Share Group', () => {
            equityGateway.SalesWizSecurityPage.cardClick(securityPosition)
            equityGateway.SalesWizTopBar.btnNext('click')

            equityGateway.SalesWizShareGroupPage.selectShareGroupByName(shareName)
            equityGateway.SalesWizTopBar.btnNext('click')

            equityGateway.SalesWizSideRmenu.shareGroupShareGroupSummary(shareName)

        })

        it('C30639274 - Validate sidebar in Step 4 - Amount to Sell', () => {
            equityGateway.SalesWizSecurityPage.cardClick(securityPosition)
            equityGateway.SalesWizTopBar.btnNext('click')

            equityGateway.SalesWizShareGroupPage.selectShareGroupByName(shareName)
            equityGateway.SalesWizTopBar.btnNext('click')

            equityGateway.SalesWizAmount2SellPage.inputFieldShares('type', shares2sell)
            equityGateway.SalesWizTopBar.btnNext('click')

            equityGateway.SalesWizSideRmenu.amount2SellShareGroupSummary([shares2sell, sumShares])
        })

        it('C30639275 - Validate sidebar in Step 5 - Order Type', () => {
            equityGateway.SalesWizSecurityPage.cardClick(securityPosition)
            equityGateway.SalesWizTopBar.btnNext('click')

            equityGateway.SalesWizShareGroupPage.selectShareGroupByName(shareName)
            equityGateway.SalesWizTopBar.btnNext('click')

            equityGateway.SalesWizAmount2SellPage.inputFieldShares('type', shares2sell)
            equityGateway.SalesWizTopBar.btnNext('click')

            equityGateway.SalesWizOrderTypePage.selectOrderTypeByName(orderName).click()
            equityGateway.SalesWizTopBar.btnNext('click')

            equityGateway.SalesWizSideRmenu.oderTypeShareGroupSummary(orderName)
        })
    })

    context( 'Summary Side Menu Element Stepper Complex Validations', () => {
        it('C30639278/..279 - Changes in the summary sidebar are displayed when user clicks the next button', () => {
            equityGateway.SalesWizSecurityPage.cardClick(securityPosition)
            equityGateway.SalesWizTopBar.btnNext('click')
            equityGateway.SalesWizSideRmenu.securitySummary()

            equityGateway.SalesWizShareGroupPage.selectShareGroupByName(shareName)
            equityGateway.SalesWizTopBar.btnNext('click')
            equityGateway.SalesWizSideRmenu.shareGroupShareGroupSummary()

            equityGateway.SalesWizAmount2SellPage.inputFieldShares('type', shares2sell)
            equityGateway.SalesWizTopBar.btnNext('click')
            equityGateway.SalesWizSideRmenu.amount2SellShareGroupSummary()

            equityGateway.SalesWizOrderTypePage.selectOrderTypeByName(orderName).click()
            equityGateway.SalesWizTopBar.btnNext('click')
            equityGateway.SalesWizSideRmenu.oderTypeShareGroupSummary()

            equityGateway.SalesWizSideRmenu.elementsValidation([securityName, shareName, shares2sell, sumShares.toString(), orderName])
        })
    })
})
