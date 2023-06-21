import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

let sharesAvailable
let sharesAvailableRestrictions
let estimatedProceeds
let estimatedGainLoss

describe('Sales Wizard Amount to Sell Page Tests', () => {
    before(() => {
        //TODO Later phases will receive data from logged ACC
        sharesAvailable = '6000'
        sharesAvailableRestrictions = '3 788'
        estimatedProceeds = '16.660.00'
        estimatedGainLoss = '16.660.00'
    })

    beforeEach(() => {
        //NOT NECESSARY YET  - equityGateway.LoginPage.login()
        equityGateway.SalesWizBase.gotoSalesWiz()
        equityGateway.SalesWizTopBar.nextBtn('click')
        equityGateway.SalesWizSecurityPage.cardClick('St James Place')
        equityGateway.SalesWizTopBar.nextBtn('click')
        //FIXME Substitute by Shares Group Method when created
        cy.get('gs-radio-button-option').contains('Purchase plan issuances').click()
        //****************************************************
        equityGateway.SalesWizTopBar.nextBtn('click')
        cy.url().should('include', '/amount-to-sell')
    })

    context('General Page Validations', () => {
        /** Related to User Stories
         * EGVFOUR-142, EGVFOUR-295
         **/
        it('C30639310 - Title and Description Verification', () => {
            equityGateway.SalesWizAmount2SellPage.titleAndDescription('Amount to sell', 'Please enter the number of shares')
            equityGateway.SalesWizAmount2SellPage.interactiveElementsCheck()
        })

        /** TODO
         * This Test will suffer changes at later DEV PHASES
         * Will retrieve data from logged ACC
         */
        it('C30639310 - Shares Verification', () => {
            equityGateway.SalesWizAmount2SellPage.sharesLabelValue(
                sharesAvailable,
                sharesAvailableRestrictions,
                estimatedProceeds,
                estimatedGainLoss
            )
        })

        /** TODO
         * This Test will suffer changes at later DEV PHASES
         * Will retrieve data from logged ACC
         */
        it('C30639310 - Certificates Verification', () => {
            const certificates = ['DRIP_14466', 'DRIP_14466']
            equityGateway.SalesWizAmount2SellPage.certificateSectorValidation()
            equityGateway.SalesWizAmount2SellPage.certificatesValidation(2, certificates)
        })
    })

    context('Shares Restrictions - CheckBox Validations', () => {
        /** Related to User Stories
         * EGVFOUR-142, EGVFOUR-295
         **/
        it('C30639311 - Checkbox Enabled Turns Certificates with Restrictions Dimmed Out', () => {
            equityGateway.SalesWizAmount2SellPage.checkBoxClick()
            //TODO VERIFY Dimmed out elements
        })
    })

    context('Shares to Sell - Input Field Validations', () => {
        /** Related to User Stories
         * EGVFOUR-142, EGVFOUR-295
         **/
        it('C30639312 - Accepts only numeric characters', () => {
            equityGateway.SalesWizAmount2SellPage.inputFieldShares('type', '9999999 AAAA')
        })

        it('C30639313 - Checkbox ticked the maximum value is equal to the "Available" value', () => {
            equityGateway.SalesWizAmount2SellPage.inputFieldShares('type', '9999999')
            equityGateway.SalesWizAmount2SellPage.checkBoxClick()
            equityGateway.SalesWizAmount2SellPage.inputFieldShares('check', sharesAvailable)
        })

        it('C30639314 - Checkbox unticked the, maximum value is equal to sum of Total Available and Available w/Restrictions', () => {
            equityGateway.SalesWizAmount2SellPage.btnTotalAmountClick()

            //TODO @sum needs to be adjusted because we are not receiving real value yet, @sharesAvailableRestrictions contains white spaces
            const sum = parseInt(sharesAvailable.replace(/\s/g, ''), 10) + parseInt(sharesAvailableRestrictions.replace(/\s/g, ''), 10)
            equityGateway.SalesWizAmount2SellPage.inputFieldShares('check', sum)
        })

        it('C30639315 - Error display when input amount is higher than the Total Available', () => {
            //TODO not implemented yet
        })

        it('C30639316 - Checkbox ticked, clicks Total Amount button, value should be equal to Sum of total Available value', () => {
            equityGateway.SalesWizAmount2SellPage.checkBoxClick()
            equityGateway.SalesWizAmount2SellPage.btnTotalAmountClick()
            equityGateway.SalesWizAmount2SellPage.inputFieldShares('check', sharesAvailable)
        })

        it('C30639317 - Checkbox unticked, clicks Total Amount button, value should be equal to Sum of total Available value plus the Available w/Restrictions', () => {
            equityGateway.SalesWizAmount2SellPage.btnTotalAmountClick()
            const sum = parseInt(sharesAvailable.replace(/\s/g, ''), 10) + parseInt(sharesAvailableRestrictions.replace(/\s/g, ''), 10)
            equityGateway.SalesWizAmount2SellPage.inputFieldShares('check', sum)
        })
    })
})