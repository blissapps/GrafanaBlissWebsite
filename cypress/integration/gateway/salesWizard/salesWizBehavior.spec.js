/*  Info:
    This class covers the tests related to EGv3 Sales Wizard right now only applicable or soon to be applicable test cases are covered.
    May be Subject to change.
    Link: https://bitbucket.org/globalshares/gscypressautomationframeworkcodeduiport/src/master/cypress/integration/gateway/SalesWizard/salesWizardTests.spec.js
 */

import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Sales Wizard Behavior Tests (Legacy)', () => {
    /**
     * Tests Related to Sales Wizard Section
     * https://globalshares.testrail.net/index.php?/suites/view/684&group_by=cases:section_id&group_order=asc&display_deleted_cases=0&group_id=100373
     */
    context('Validate Complex Behavior and Calculus Scenarios', () => {
        /**
         * Referred URL: https://globalshares.testrail.net/index.php?/cases/view/66802
         */
        it('C66802 - LimitOrder', () => {
            equityGateway.LoginPage.login(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER3_AUTH'))
            equityGateway.SalesWizBase.gotoAmount2Sell(true, false)
            equityGateway.SalesWizAmount2SellPage.inputFieldShares('type', '2')
            equityGateway.SalesWizTopBar.btnNext('click')
            equityGateway.SalesWizOrderTypePage.selectOrderTypeByName('Day limit order').click()
            equityGateway.SalesWizOrderTypePage.fillDayLimitInput('Day Limit', '7')
            equityGateway.SalesWizTopBar.btnNext('click')
            equityGateway.SalesWizDistributionPage.validateWireElements()
            equityGateway.SalesWizTopBar.btnNext('click')
            equityGateway.SalesWizReviewOrderPage.validateSubmitButton()
            equityGateway.SalesWizReviewOrderPage.clickCheckBoxByName('Approvals & payments')
            equityGateway.SalesWizReviewOrderPage.clickCheckBoxByName('Trading terms & conditions')
            equityGateway.SalesWizReviewOrderPage.validateModalSubmitButton()
            equityGateway.SalesWizReviewOrderPage.validateSuccessTransactionId()
            /**
             * OLD TEST INFORMATION:
             equityGateway.loginPage.initaliseGateway('haswizardsale')
             equityGateway.loginPage.login('salewiz', Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
             equityGateway.applicationHeader.navigateSalesWizard()
             equityGateway.salesWizardPage.sharesToBeSold(2, 'Newest')
             equityGateway.salesWizardPage.limitOrderAndClickNext(7)
             equityGateway.salesWizardPage.distributionPreferences('EUR', 'Lowest Cost Available')
             equityGateway.salesWizardPage.clickReviewSubmit()
             equityGateway.salesWizardPage.clickFinished()
             equityGateway.landingPage.assertPageContainsExactText('Confirmation Number')
             */
        })

        /**
         * https://globalshares.testrail.net/index.php?/cases/view/66801
         * Test to login and traverse the sales wizard
         */
        //TODO - Not Covered Yet, the limit order good til canceled selection is covered but not a full cycle scenario ORDER TYPE TESTS
        it('C66801 - GoodTillCancelled', () => {
            equityGateway.LoginPage.login(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER3_AUTH'))
            equityGateway.SalesWizBase.gotoAmount2Sell(true, false)
            equityGateway.SalesWizAmount2SellPage.inputFieldShares('type', '2')
            equityGateway.SalesWizTopBar.btnNext('click')
            equityGateway.SalesWizOrderTypePage.selectOrderTypeByName('Limit Order - Good\' til cancelled').click()
            equityGateway.SalesWizOrderTypePage.fillDayLimitInput('Limit Day Order', '7')
            equityGateway.SalesWizTopBar.btnNext('click')
            equityGateway.SalesWizDistributionPage.validateWireElements()
            equityGateway.SalesWizTopBar.btnNext('click')
            equityGateway.SalesWizReviewOrderPage.validateSubmitButton()
            equityGateway.SalesWizReviewOrderPage.clickCheckBoxByName('Approvals & payments')
            equityGateway.SalesWizReviewOrderPage.clickCheckBoxByName('Trading terms & conditions')
            equityGateway.SalesWizReviewOrderPage.validateModalSubmitButton()
            equityGateway.SalesWizReviewOrderPage.validateSuccessTransactionId()
            /**
             * OLD TEST INFORMATION:
             equityGateway.loginPage.initaliseGateway('haswizardsale')
             equityGateway.loginPage.login('salewiz', Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
             equityGateway.applicationHeader.navigateSalesWizard()
             equityGateway.salesWizardPage.sharesToBeSold(2, 'Newest', true)
             equityGateway.salesWizardPage.goodTillCancelledAmount(7)
             equityGateway.salesWizardPage.distributionPreferences('EUR', 'Check - sent to Resident Address (Default)')
             equityGateway.salesWizardPage.click_Yes()
             equityGateway.salesWizardPage.clickReviewSubmit()
             equityGateway.salesWizardPage.clickFinished()
             equityGateway.landingPage.assertPageContainsExactText('Confirmation Number')
             */
        })

        /**
         * https://globalshares.testrail.net/index.php?/cases/view/66803
         * Test to login and traverse the sales wizard
         */
        //TODO - Not Covered Yet, the market order selection is covered but not and full cycle scenario - ORDER TYPE TESTS
        it('C66803 - MarketOrder', () => {
            equityGateway.LoginPage.login(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER3_AUTH'))
            equityGateway.SalesWizBase.gotoAmount2Sell(true, false)
            equityGateway.SalesWizAmount2SellPage.inputFieldShares('type', '2')
            equityGateway.SalesWizTopBar.btnNext('click')
            equityGateway.SalesWizOrderTypePage.selectOrderTypeByName('Market Order').click()
            equityGateway.SalesWizTopBar.btnNext('click')
            equityGateway.SalesWizDistributionPage.validateWireElements()
            equityGateway.SalesWizTopBar.btnNext('click')
            equityGateway.SalesWizReviewOrderPage.validateSubmitButton()
            equityGateway.SalesWizReviewOrderPage.clickCheckBoxByName('Approvals & payments')
            equityGateway.SalesWizReviewOrderPage.clickCheckBoxByName('Trading terms & conditions')
            equityGateway.SalesWizReviewOrderPage.validateModalSubmitButton()
            equityGateway.SalesWizReviewOrderPage.validateSuccessTransactionId()
            /**
             * OLD TEST INFORMATION:
             equityGateway.loginPage.initaliseGateway('haswizardsale')
             equityGateway.loginPage.login('salewiz', Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
             equityGateway.applicationHeader.navigateSalesWizard()
             equityGateway.salesWizardPage.sharesToBeSold(2, 'Manually Select')
             equityGateway.salesWizardPage.marketOrder()
             equityGateway.salesWizardPage.distributionPreferences('EUR', 'Lowest Cost Available')
             equityGateway.salesWizardPage.clickReviewSubmit()
             equityGateway.salesWizardPage.clickFinished()
             */
        })

        /**
         * https://globalshares.testrail.net/index.php?/cases/view/1109831
         * Check sale wizard picks up distribution currency from client level when "Use default fund distribution currency" = YES AND the participant has a "Preferred sale distribution currency
         */
        //TODO - Test Case not covered yet, may be implemented after developed
        it.skip('C1109831 - SaleWizard DistributionCurrency Preferred SaleDistributionCurrency', () => {
            /*
            equityGateway.loginPage.initaliseGateway('cashgen033')
            equityGateway.loginPage.login('cashgen033_2', Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
            equityGateway.applicationHeader.navigateSalesWizard()
            equityGateway.salesWizardPage.sharesToBeSold(100, 'Manually Select')
            equityGateway.salesWizardPage.marketOrder()
            equityGateway.salesWizardPage.clickNext()
            equityGateway.salesWizardPage.clickReviewSubmit()
            equityGateway.salesWizardPage.saleProceedsCurrency('Estimated Net Proceeds in chosen currency:', 'FKP')
             */
        })

        /**
         * https://globalshares.testrail.net/index.php?/cases/view/1109833
         * Check sale wizard picks up distribution currency from client level when "Use default fund distribution currency" = YES AND the participant has NO "Preferred sale distribution currency
         */
        //TODO - Test Case not covered yet, may be implemented after developed
        it.skip('C1109833 - SaleWizard DistributionCurrency No PreferredSaleDistributionCurrency', () => {
            /*
            equityGateway.loginPage.initaliseGateway('cashgen034')
            equityGateway.loginPage.login('cashgen034', Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
            equityGateway.applicationHeader.navigateSalesWizard()
            equityGateway.salesWizardPage.sharesToBeSold(100, 'Manually Select')
            equityGateway.salesWizardPage.marketOrder()
            equityGateway.salesWizardPage.clickNext()
            equityGateway.salesWizardPage.clickReviewSubmit()
            equityGateway.salesWizardPage.saleProceedsCurrency('Estimated Net Proceeds in chosen currency:', 'USD')
             */
        })

        /**
         * Test to check that when shares are sold via the sale wizard that the shares are no longer available to sell
         *
         * @update_required It looks like the test case needs to be updated on Test Rail with proper data. There is a data dependency in these tests
         */
        //TODO - Test Case not covered yet, may be implemented after development ends
        it.skip('C8914 - SalesWizard EnsureSharesSoldAreAccuratelyDeductedFromTotalShares', () => {
            /*
            equityGateway.loginPage.initaliseGateway('haswizardsale')
            equityGateway.loginPage.login('salewiz', Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))

            // ROUND 1 - SELL 1 SHARE
            equityGateway.applicationHeader.navigateSalesWizard()
            equityGateway.salesWizardPage.getSharesAvailableToSellTotal1()
            equityGateway.salesWizardPage.sharesToBeSold(1, 'Manually Select')
            equityGateway.salesWizardPage.marketOrder()
            equityGateway.salesWizardPage.distributionPreferences('EUR', 'Lowest Cost Available')
            equityGateway.salesWizardPage.clickReviewSubmit()
            equityGateway.salesWizardPage.clickFinished()
            equityGateway.applicationHeader.navigateSalesWizard()
            equityGateway.salesWizardPage.getSharesAvailableToSellTotal2()
            equityGateway.salesWizardPage.verifyActionableShares(1)

            // ROUND 2 - SELL 2 SHARES
            equityGateway.salesWizardPage.sharesToBeSold(2, 'Manually Select')
            equityGateway.salesWizardPage.marketOrder()
            equityGateway.salesWizardPage.distributionPreferences('EUR', 'Lowest Cost Available')
            equityGateway.salesWizardPage.clickReviewSubmit()
            equityGateway.salesWizardPage.clickFinished()
            equityGateway.applicationHeader.navigateSalesWizard()
            equityGateway.salesWizardPage.getSharesAvailableToSellTotal2()
            equityGateway.salesWizardPage.verifyActionableShares(2)

            // ROUND 3 - DON'T COMPLETE THE WIZARD & ENSURE SHARES ARE NOT REDUCED
            equityGateway.salesWizardPage.sharesToBeSold(3, 'Manually Select')
            equityGateway.salesWizardPage.marketOrder()
            equityGateway.salesWizardPage.distributionPreferences('EUR', 'Lowest Cost Available')
            equityGateway.salesWizardPage.clickReviewSubmit()

            // This time we won't press the confirm button
            // Navigate back to the sale wizard instead
            equityGateway.applicationHeader.navigateSalesWizard()
            equityGateway.salesWizardPage.getSharesAvailableToSellTotal2()
            equityGateway.salesWizardPage.verifyActionableShares(0)
            equityGateway.applicationHeader.navigateLogOut()
             */
        })
    })
})