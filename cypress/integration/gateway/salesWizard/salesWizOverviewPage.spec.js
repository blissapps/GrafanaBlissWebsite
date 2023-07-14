import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

/**
 * https://globalshares.testrail.net/index.php?/suites/view/18820&group_by=cases:section_id&group_order=asc&display_deleted_cases=0&group_id=1026238
 * Sales Wizard Overview Test Suite
 */
describe('Sales Wizard Overview Page Tests', () => {
    context('General Page Validations', () => {
        /** Related to User Stories
         * EGVFOUR-139
         **/
        beforeEach(() => {
            equityGateway.LoginPage.login()
            equityGateway.SalesWizBase.gotoSalesWiz()
        })

        it('C30639291 - Validate Header Components', () => {
            const elements = [
                'Sell your shares',
                'The term sell refers to the process of liquidating an asset in exchange for cash.',
                'The money from the sale of the stock, including your principal investment and any gains if you sold it for more.'
            ]
            equityGateway.SalesWizOverviewPage.pageHeaderValidation(elements)
        })

        //TODO In later phases this test needs to reiceive data from shares to sell values
        it('C30639291 - Validate Shares to Sell Components', () => {
            const elements = [
                'Shares to sell',
                'Available',
                'Available with restrictions',
                'Unavailable',
                'In progress'
            ]
            equityGateway.SalesWizOverviewPage.pageSharesValidation(
                elements,
                '25',
                '25',
                '25',
                '25')
        })

        it('C30639291 - Validate Shares to Sell Components', () => {
            const elements = [
                'Process overview',
                'Submit your sale order',
                'Sale order will be processed',
                'Your holdings are reflected on Gateway',
                'Selling shares explanation'
            ]
            equityGateway.SalesWizOverviewPage.pageProcessValidation(elements)
        })
    })
})
