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
            equityGateway.LoginPage.login(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER3_AUTH'), Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
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
            equityGateway.LoginPage.login(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER3_AUTH'), Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
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
            equityGateway.LoginPage.login(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER3_AUTH'), Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
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
         * https://globalshares.testrail.net/index.php?/cases/view/66804
         * Test to login and traverse the sales wizard and check url
         *
         * @update_required It looks like the test case needs to be updated on Test Rail with proper data. There is a data dependency in these tests
         */
        //TODO - This test will be implemented in Page Navigation Test Cases
        it.skip('C66804 - Sales Wizard LinkCheck', () => {
            /*
            equityGateway.loginPage.initaliseGateway('haswizardsale')
            equityGateway.loginPage.login('salewiz', Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
            equityGateway.applicationHeader.navigateSalesWizard()
            equityGateway.landingPage.checkUrl('Share')
            equityGateway.landingPage.assertPageContainsExactText('Sell Shares Online')
            equityGateway.landingPage.assertPageDoesNotContainsExactText('An Error Occurred')
            equityGateway.applicationHeader.navigateLogOut()
             */
        })

        /**
         * https://globalshares.testrail.net/index.php?/cases/view/1109831
         * Check sale wizard picks up distribution currency from client level when "Use default fund distribution currency" = YES AND the participant has a "Preferred sale distribution currency
         */
        //TODO - Test Case not covered yet, may be implemented
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
        //TODO - Test Case not covered yet, may be implemented
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
         * https://globalshares.testrail.net/index.php?/cases/view/4267056
         * Test Method: Check sale wizard fund distribution selection behavior - ABA only - lowest cost available
         */
        //TODO - Test Case not covered yet, need further information on business side
        it.skip('C4267056 - Check SaleWizardFundDistribution SelectionBehavior ABAOnly LowestCostAvailable', () => {
            /*
            equityGateway.loginPage.initaliseGateway('cashgen053')
            equityGateway.loginPage.login('cashgen053_01', Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
            equityGateway.applicationHeader.navigateSalesWizard()
            equityGateway.salesWizardPage.selectAssert_SaleProcess('All')
            equityGateway.salesWizardPage.clickNext()
            equityGateway.salesWizardPage.clickNext('Distribution Type')
            equityGateway.salesWizardPage.clickNext('Review')
            equityGateway.salesWizardPage.clickReviewSubmit('Confirmation')
            equityGateway.salesWizardPage.assert_DistributionMethod('Lowest Cost Available')
             */
        })

        /**
         * https://globalshares.testrail.net/index.php?/cases/view/4267057
         * Test Method: Check sale wizard fund distribution selection behavior - ABA only - high value
         */
        //TODO - Test Case not covered yet, need further information on business side
        it.skip('C4267057 - Check SaleWizardFundDistribution SelectionBehavior ABAOnly HighValue', () => {
            /*
            equityGateway.loginPage.initaliseGateway('cashgen053')
            equityGateway.loginPage.login('cashgen053_01', Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
            equityGateway.applicationHeader.navigateSalesWizard()
            equityGateway.salesWizardPage.selectAssert_SaleProcess('All')
            equityGateway.salesWizardPage.clickNext()
            equityGateway.salesWizardPage.clickNext('Distribution Type')
            equityGateway.salesWizardPage.selectAssert_DistributionMethod_Dropdown('High Value Wire')
            equityGateway.salesWizardPage.clickNext()
            equityGateway.landingPage.assertPageContainsExactText('Wizards.DistributionMethodRequiresBankSWIFT')
             */
        })

        /**
         *  https://globalshares.testrail.net/index.php?/cases/view/4267058
         *  Test Method: Check sale wizard fund distribution selection behavior - ABA only - low value
         */
        //TODO - Test Case not covered yet, need further information on business side
        it.skip('C4267058 - Check SaleWizardFundDistribution SelectionBehavior ABAOnly LowValue', () => {
            /*
            equityGateway.loginPage.initaliseGateway('cashgen053')
            equityGateway.loginPage.login('cashgen053_01', Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
            equityGateway.applicationHeader.navigateSalesWizard()
            equityGateway.salesWizardPage.selectAssert_SaleProcess('All')
            equityGateway.salesWizardPage.clickNext()
            equityGateway.salesWizardPage.clickNext('Distribution Type')
            equityGateway.salesWizardPage.selectAssert_DistributionMethod_Dropdown('Low Value ACH')
            equityGateway.salesWizardPage.clickNext()
            equityGateway.landingPage.assertPageContainsExactText('ConfirmDistribution.LowValueACH')
            equityGateway.salesWizardPage.click_Yes()
            equityGateway.salesWizardPage.clickReviewSubmit('Confirmation')
            equityGateway.salesWizardPage.assert_DistributionMethod('Low Value ACH')
             */
        })

        /**
         *  https://globalshares.testrail.net/index.php?/cases/view/4267059
         *  Test Method: Check sale wizard fund distribution selection behavior - SWIFT only - lowest cost available
         */
        //TODO - Test Case not covered yet, need further information on business side
        it.skip('C4267059 - Check SaleWizardFundDistribution SelectionBehavior SWIFTOnly LowestCostAvailable', () => {
            /*
            equityGateway.loginPage.initaliseGateway('cashgen053')
            equityGateway.loginPage.login('cashgen053_02', Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
            equityGateway.applicationHeader.navigateSalesWizard()
            equityGateway.salesWizardPage.selectAssert_SaleProcess('All')
            equityGateway.salesWizardPage.clickNext()
            equityGateway.salesWizardPage.clickNext('Distribution Type')
            equityGateway.salesWizardPage.clickNext('Review')
            equityGateway.salesWizardPage.clickReviewSubmit('Confirmation')
            equityGateway.salesWizardPage.assert_DistributionMethod('Lowest Cost Available')
             */
        })

        /**
         * https://globalshares.testrail.net/index.php?/cases/view/4267060
         * Test Method: Check sale wizard fund distribution selection behavior - SWIFT only - high value
         */
        //TODO - Test Case not covered yet, need further information on business side
        it.skip('C4267060 - Check SaleWizardFundDistribution SelectionBehavior SWIFTOnly HighValue', () => {
            /*
            equityGateway.loginPage.initaliseGateway('cashgen053')
            equityGateway.loginPage.login('cashgen053_02', Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
            equityGateway.applicationHeader.navigateSalesWizard()
            equityGateway.salesWizardPage.selectAssert_SaleProcess('All')
            equityGateway.salesWizardPage.clickNext()
            equityGateway.salesWizardPage.clickNext('Distribution Type')
            equityGateway.salesWizardPage.selectAssert_DistributionMethod_Dropdown('High Value Wire')
            equityGateway.salesWizardPage.clickNext()
            equityGateway.landingPage.assertPageContainsExactText('ConfirmDistribution.HighValueWire')
            equityGateway.salesWizardPage.click_Yes()
            equityGateway.salesWizardPage.clickReviewSubmit('Confirmation')
            equityGateway.salesWizardPage.assert_DistributionMethod('High Value Wire')
             */
        })

        /**
         * https://globalshares.testrail.net/index.php?/cases/view/4267061
         * Test Method: Check sale wizard fund distribution selection behavior - SWIFT only - low value
         */
        //TODO - Test Case not covered yet, need further information on business side
        it.skip('C4267061 - Check SaleWizardFundDistribution SelectionBehavior SWIFTOnly LowValue', () => {
            /*
            equityGateway.loginPage.initaliseGateway('cashgen053')
            equityGateway.loginPage.login('cashgen053_02', Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
            equityGateway.applicationHeader.navigateSalesWizard()
            equityGateway.salesWizardPage.selectAssert_SaleProcess('All')
            equityGateway.salesWizardPage.clickNext()
            equityGateway.salesWizardPage.clickNext('Distribution Type')
            equityGateway.salesWizardPage.selectAssert_DistributionMethod_Dropdown('Low Value ACH')
            equityGateway.salesWizardPage.clickNext()
            equityGateway.landingPage.assertPageContainsExactText('Wizards.DistributionMethodRequiresBankABA')
             */
        })

        /**
         * https://globalshares.testrail.net/index.php?/cases/view/4267062
         *  Test Method: Check sale wizard fund distribution selection behavior - ABA AND SWIFT - lowest cost available
         */
        //TODO - Test Case not covered yet, need further information on business side
        it.skip('C4267062 - Check SaleWizardFundDistribution SelectionBehavior ABAANDSWIFT LowestCostAvailable', () => {
            /*
            equityGateway.loginPage.initaliseGateway('cashgen053')
            equityGateway.loginPage.login('cashgen053_03', Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
            equityGateway.applicationHeader.navigateSalesWizard()
            equityGateway.salesWizardPage.selectAssert_SaleProcess('All')
            equityGateway.salesWizardPage.clickNext()
            equityGateway.salesWizardPage.clickNext('Distribution Type')
            equityGateway.salesWizardPage.clickNext('Review')
            equityGateway.salesWizardPage.clickReviewSubmit('Confirmation')
            equityGateway.salesWizardPage.assert_DistributionMethod('Lowest Cost Available')
             */
        })

        /**
         * https://globalshares.testrail.net/index.php?/cases/view/4267063
         *  Test Method: Check sale wizard fund distribution selection behavior - ABA AND SWIFT - high value + ABA
         */
        //TODO - Test Case not covered yet, need further information on business side
        it.skip('C4267063 - Check SaleWizardFundDistribution SelectionBehavior ABA AND SWIFT HighValue ABA', () => {
            /*
            equityGateway.loginPage.initaliseGateway('cashgen053')
            equityGateway.loginPage.login('cashgen053_03', Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
            equityGateway.applicationHeader.navigateSalesWizard()
            equityGateway.salesWizardPage.selectAssert_SaleProcess('All')
            equityGateway.salesWizardPage.clickNext()
            equityGateway.salesWizardPage.clickNext('Distribution Type')
            equityGateway.salesWizardPage.selectAssert_DistributionMethod_Dropdown('High Value Wire')
            equityGateway.salesWizardPage.selectAssert_BankAccountForPayment('ABA - 1 (Default)', true)
            equityGateway.salesWizardPage.clickNext()
            equityGateway.landingPage.assertPageContainsExactText('Wizards.DistributionMethodRequiresBankSWIFT')
             */
        })

        /**
         * https://globalshares.testrail.net/index.php?/cases/view/4267064
         * Test Method: Check sale wizard fund distribution selection behavior - ABA AND SWIFT - high value + SWIFT
         */
        //TODO - Test Case not covered yet, need further information on business side
        it.skip('C4267064 - Check SaleWizardFundDistribution SelectionBehavior ABA AND SWIFT HighValue SWIFT', () => {
            /*
            equityGateway.loginPage.initaliseGateway('cashgen053')
            equityGateway.loginPage.login('cashgen053_03', Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
            equityGateway.applicationHeader.navigateSalesWizard()
            equityGateway.salesWizardPage.selectAssert_SaleProcess('All')
            equityGateway.salesWizardPage.clickNext()
            equityGateway.salesWizardPage.clickNext('Distribution Type')
            equityGateway.salesWizardPage.selectAssert_DistributionMethod_Dropdown('High Value Wire')
            equityGateway.salesWizardPage.selectAssert_BankAccountForPayment('SWIFT - 1')
            equityGateway.salesWizardPage.clickNext()
            equityGateway.landingPage.assertPageContainsExactText('ConfirmDistribution.HighValueWire')
            equityGateway.salesWizardPage.click_Yes()
            equityGateway.salesWizardPage.clickReviewSubmit('Confirmation')
            equityGateway.salesWizardPage.assert_DistributionMethod('High Value Wire')
            equityGateway.salesWizardPage.assert_BankAccountForPayment('SWIFT - 1')
             */
        })

        /**
         * https://globalshares.testrail.net/index.php?/cases/view/4267065
         * Test Method: Check sale wizard fund distribution selection behavior - ABA AND SWIFT - Low value + ABA
         */
        //TODO - Test Case not covered yet, need further information on business side
        it.skip('C4267065 - Check SaleWizardFundDistribution SelectionBehavior ABA AND SWIFT LowValue ABA', () => {
            /*
            equityGateway.loginPage.initaliseGateway('cashgen053')
            equityGateway.loginPage.login('cashgen053_03', Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
            equityGateway.applicationHeader.navigateSalesWizard()
            equityGateway.salesWizardPage.selectAssert_SaleProcess('All')
            equityGateway.salesWizardPage.clickNext()
            equityGateway.salesWizardPage.clickNext('Distribution Type')
            equityGateway.salesWizardPage.selectAssert_DistributionMethod_Dropdown('Low Value ACH')
            equityGateway.salesWizardPage.selectAssert_BankAccountForPayment('ABA - 1 (Default)', true)
            equityGateway.salesWizardPage.clickNext()
            equityGateway.landingPage.assertPageContainsExactText('ConfirmDistribution.LowValueACH')
            equityGateway.salesWizardPage.click_Yes()
            equityGateway.salesWizardPage.clickReviewSubmit('Confirmation')
            equityGateway.salesWizardPage.assert_DistributionMethod('Low Value ACH')
            equityGateway.salesWizardPage.assert_BankAccountForPayment('ABA - 1')
             */
        })

        /**
         * https://globalshares.testrail.net/index.php?/cases/view/4267066
         * Test Method: Check sale wizard fund distribution selection behavior - ABA AND SWIFT - low value + SWIFT
         */
        //TODO - Test Case not covered yet, need further information on business side
        it.skip('C4267066 - Check SaleWizardFundDistribution SelectionBehavior ABA AND SWIFT HighValue ABA', () => {
            /*
            equityGateway.loginPage.initaliseGateway('cashgen053')
            equityGateway.loginPage.login('cashgen053_03', Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
            equityGateway.applicationHeader.navigateSalesWizard()
            equityGateway.salesWizardPage.selectAssert_SaleProcess('All')
            equityGateway.salesWizardPage.clickNext()
            equityGateway.salesWizardPage.clickNext('Distribution Type')
            equityGateway.salesWizardPage.selectAssert_DistributionMethod_Dropdown('Low Value ACH')
            equityGateway.salesWizardPage.selectAssert_BankAccountForPayment('SWIFT - 1')
            equityGateway.salesWizardPage.clickNext()
            equityGateway.landingPage.assertPageContainsExactText('Wizards.DistributionMethodRequiresBankABA')
             */
        })

        /**
         * Test to check that when shares are sold via the sale wizard that the shares are no longer available to sell
         *
         * @update_required It looks like the test case needs to be updated on Test Rail with proper data. There is a data dependency in these tests
         */
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

        /**
         * https://globalshares.testrail.net/index.php?/cases/view/14979617
         * Check Sale Proceeds and Capital Gain are calculated correctly when the client only has Limit Order type
         */
        it.skip('C14979617 - Check Sale Proceeds and Capital Gain are calculated correctly when the client only has Limit Order type', { tags: 'V3' }, () => {
            /*
            equityGateway.loginPage.initaliseGateway('jessietestclient4limitonlyordermodenone')
            equityGateway.loginPage.login('TestClient4PptOne', 'GShares1234')
            equityGateway.applicationHeader.navigateSalesWizard()
            equityGateway.salesWizardPage.acceptSaleTerms()
            equityGateway.salesWizardPage.sharesToBeSoldAR(100, false)
            equityGateway.salesWizardPage.assertCalculateEstimatedGrossSalesProceeds(100)
            equityGateway.salesWizardPage.assertCalculateEstimatedGainLoss(100)
             */
        })

        /**
         * https://globalshares.testrail.net/index.php?/cases/view/14979618
         * Check Sale Proceeds and Capital Gain are calculated correctly when the client only has GTD Order type
         */
        it.skip('C14979618 - Check Sale Proceeds and Capital Gain are calculated correctly when the client only has GTD Order type', { tags: 'V3' }, () => {
            /*
            equityGateway.loginPage.initaliseGateway('jessietestclient5gtconlyordermodenone')
            equityGateway.loginPage.login('TestClient5PptOne', 'GShares1234')
            equityGateway.applicationHeader.navigateSalesWizard()
            equityGateway.salesWizardPage.acceptSaleTerms()
            equityGateway.salesWizardPage.sharesToBeSoldAR(100, false)
            equityGateway.salesWizardPage.assertCalculateEstimatedGrossSalesProceeds(100)
            equityGateway.salesWizardPage.assertCalculateEstimatedGainLoss(100)
             */
        })

        /**
         * https://globalshares.testrail.net/index.php?/cases/view/15255993
         * Bank Details Collection = No - No Bank Details on Participant - Sale
         */
        it.skip('C15255993 - Verify Bank Details Collection No Bank Details on Participant', { tags: 'V3' }, () => {
            /*
            equityGateway.loginPage.initaliseGateway('bankDetailscollectionno')
            equityGateway.loginPage.login('Mark H Coffee', 'GShares1234')
            equityGateway.applicationHeader.sellShares()
            equityGateway.salesWizardPage.sharesToBeSold(10, 'Manually Select', false)
            equityGateway.salesWizardPage.clickNext()
            equityGateway.salesWizardPage.clickNext('Distribution Type')
            equityGateway.salesWizardPage.clickNext('Review')
            equityGateway.salesWizardPage.clickReviewSubmit('Confirmation')
            equityGateway.salesWizardPage.clickFinished()
             */
        })

        /**
         * https://globalshares.testrail.net/index.php?/cases/view/15255994
         * Bank Details Collection = No - Bank Details Present on Participant - Sale
         */
        it.skip('C15255994 - Verify Bank Details Collection No Bank Details Present on Participant', { tags: 'V3' }, () => {
            /*
            equityGateway.loginPage.initaliseGateway('bankDetailscollectionno')
            equityGateway.loginPage.login('Ken J Laugh', 'GShares1234')
            equityGateway.applicationHeader.sellShares()
            equityGateway.salesWizardPage.sharesToBeSold(10, 'Manually Select', false)
            equityGateway.salesWizardPage.clickNext()
            equityGateway.salesWizardPage.clickNext('Distribution Type')
            equityGateway.salesWizardPage.clickNext('Review')
            equityGateway.salesWizardPage.clickReviewSubmit('Confirmation')
            equityGateway.salesWizardPage.clickFinished()
             */
        })

        /**
         * https://globalshares.testrail.net/index.php?/cases/view/15255999
         * Bank Details Collection = Yes - No Bank Details on Participant - Sale
         */
        it.skip('C15255999 - Verify Bank Details Collection Yes No Bank Details on Participant Sale', { tags: 'V3' }, () => {
            /*
            equityGateway.loginPage.initaliseGateway('bankDetailscollectionyes')
            equityGateway.loginPage.login('Mark H', 'GShares1234')
            equityGateway.applicationHeader.sellShares()
            equityGateway.landingPage.assertPageContainsExactText(
              'To sell shares you must have a bank account on record so that proceeds can be distributed. Please ensure that you have entered your bank details under your participant profile.'
            )
             */
        })

        /**
         * https://globalshares.testrail.net/index.php?/cases/view/15256000
         * Bank Details Collection = Yes - Bank Details Present on Participant - Sale
         */
        it.skip('C15256000 - Verify Bank Details Collection Yes Bank Details Present on Participant Sale', { tags: 'V3' }, () => {
            /*
            equityGateway.loginPage.initaliseGateway('bankDetailscollectionyes')
            equityGateway.loginPage.login('Ken J', 'GShares1234')
            equityGateway.applicationHeader.sellShares()
            equityGateway.salesWizardPage.sharesToBeSold(10, 'Manually Select', false)
            equityGateway.salesWizardPage.clickNext()
            equityGateway.salesWizardPage.clickNext('Distribution Type')
            equityGateway.salesWizardPage.clickNext('Review')
            equityGateway.salesWizardPage.clickReviewSubmit('Confirmation')
            equityGateway.salesWizardPage.clickFinished()
             */
        })

        /**
         * https://globalshares.testrail.net/index.php?/cases/view/17344553
         * Process a sale from the wizard which has issuances from both issuance types and ensure the split occurs
         */
        it.skip('C17344553 - Process A Sale From Wizard Which Has Issuances From Both Issuance Types', { tags: 'V3' }, () => {
            /*
            equityGateway.loginPage.initaliseGateway('splittingorders')
            equityGateway.loginPage.login('Tom M Murphy', 'GShares1234')
            equityGateway.applicationHeader.navigateSaleWizard_Transact()
            equityGateway.salesWizardPage.sharesToBeSoldByRow2(5, 7, false)
            equityGateway.salesWizardPage.sharesToBeSoldByRow(7, 5)
            equityGateway.salesWizardPage.clickNext()
            equityGateway.salesWizardPage.clickNext('Distribution Type')
            equityGateway.salesWizardPage.clickNext('Review')
            equityGateway.salesWizardPage.clickReviewSubmit('Confirmation')
            equityGateway.salesWizardPage.clickFinished()
            equityGateway.salesWizardPage.assert_ConfirmationNumberDigits(31)
             */
        })

        /**
         * //// Issue with Database
         * https://globalshares.testrail.net/index.php?/cases/view/17344555
         * Check the correct information message shown when a ppt have 0 outstanding shares after selling all shares
         * @update_required It is being skipped in the C# solution.
         */
        it.skip('C17344555 - Process A Sale From Wizard Which Has Issuances From Both Issuance Types', { tags: 'V3' }, () => {
            /*
            equityGateway.exerciseWizardPage.navigateExerciseOptions()
            // issue with database starts from this point
            equityGateway.exerciseWizardPage.exerciseOptionsByRow(1, 10)
            equityGateway.exerciseWizardPage.exerciseOptionsByRow(1, 11)
            equityGateway.salesWizardPage.clickNext()
            equityGateway.exerciseWizardPage.exerciseMethod('Sell All Shares', '')
            equityGateway.exerciseWizardPage.clickNext()
            equityGateway.exerciseWizardPage.orderType('Market Order')
            equityGateway.exerciseWizardPage.clickNext()
            equityGateway.exerciseWizardPage.confirm()
            equityGateway.exerciseWizardPage.goBackOrForwardInBrowser('back', 2)
             */
        })
    })
})
