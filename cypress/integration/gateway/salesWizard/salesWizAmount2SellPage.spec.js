import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

let sharesAvailable
let sharesAvailableRestrictions
let estimatedProceeds
let estimatedGainLoss
let hasContextFailed

before(() => {
    /**
     * Later phases will receive data from logged ACC
     */
    sharesAvailable = '6000'
    sharesAvailableRestrictions = '3 788'
    estimatedProceeds = '€ 16.660.00'
    estimatedGainLoss = '€ 16.660.00'
})

beforeEach(() => {
    //NOT NECESSARY YET  - equityGateway.LoginPage.login()
    equityGateway.SalesWizBase.gotoAmount2Sell()
})

describe('Sales Wizard - Amount to Sell Page Tests', () => {
    context('General Page Validations', () => {
        /** Related to User Stories
         * EGVFOUR-142
         **/
        it('C30639310 - Title and Description Verification', () => {
            equityGateway.SalesWizAmount2SellPage.titleAndDescription('Amount to sell', 'Please enter the number of shares')
            equityGateway.SalesWizAmount2SellPage.interactiveElementsCheck()
        })

        /** TODO
         * This Test will suffer changes at later DEV PHASES
         * Will retrieve data from logged ACC
         */
        it('C30639310/..19/..20 - Shares Verification', () => {
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
        it('C30639310/..32 - Certificates Sector Verification', () => {
            equityGateway.SalesWizAmount2SellPage.certificateSectorValidation()
        })
    })

    context('Shares Restrictions - CheckBox Validations', () => {
        /** Related to User Stories
         * EGVFOUR-142
         **/
        it('C30639311 - Checkbox Enabled Turns Certificates with Restrictions Dimmed Out', () => {
            equityGateway.SalesWizAmount2SellPage.checkBoxClick()
            //Select certificates to be Dimmed Out and not Clickable
            equityGateway.SalesWizAmount2SellPage.certificatesDisable('DRIP_14466', 2)
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

            //TODO @sum needs to be adjusted later because we are not receiving real value yet, @sharesAvailableRestrictions contains white spaces
            const sum = parseInt(sharesAvailable.replace(/\s/g, ''), 10) + parseInt(sharesAvailableRestrictions.replace(/\s/g, ''), 10)
            equityGateway.SalesWizAmount2SellPage.inputFieldShares('check', sum)
        })

        it('C30639315 - Error display when input amount is higher than the Total Available', () => {
            //TODO not implemented yet
        })

        it('C30639316/..18 - Checkbox ticked, clicks Total Amount button, value should be equal to Sum of total Available value', () => {
            equityGateway.SalesWizAmount2SellPage.checkBoxClick()
            equityGateway.SalesWizAmount2SellPage.btnTotalAmountClick()
            equityGateway.SalesWizAmount2SellPage.inputFieldShares('check', sharesAvailable)
        })

        //TODO @sum needs to be adjusted later because we are not receiving real value yet, @sharesAvailableRestrictions contains white spaces
        it('C30639317/..18 - Checkbox unticked, clicks Total Amount button, value should be equal to Sum of total Available plus Available with Restrictions shares', () => {
            equityGateway.SalesWizAmount2SellPage.btnTotalAmountClick()
            const sum = parseInt(sharesAvailable.replace(/\s/g, ''), 10) + parseInt(sharesAvailableRestrictions.replace(/\s/g, ''), 10)
            equityGateway.SalesWizAmount2SellPage.inputFieldShares('check', sum)
        })
    })

    context('Certificates - General Validations', () => {
        /** Related to User Stories
         * EGVFOUR-142
         **/
        // eslint-disable-next-line func-names
        afterEach(function (){
            // @ts-ignore
            cy.log('TEST: '+this.currentTest.state)
            // @ts-ignore
            hasContextFailed = this.currentTest.state
        })

        it('C30639321 - Certificates counter updates according to the number of certificates', () => {
            const certificates = ['DRIP_14466', 'DRIP_14466']
            equityGateway.SalesWizAmount2SellPage.certificatesCounterValidation(2, certificates)
        })

        it('C30639323 - Clicking a certificate (Available) triggers a modal', () => {
            equityGateway.SalesWizAmount2SellPage.certificatesModalValidation('DRIP_14466', 'Available', 1)
        })

        it('C30639324/..31 - Clicking a certificate (Available with restrictions) triggers a modal', () => {
            equityGateway.SalesWizAmount2SellPage.certificatesModalValidation('DRIP_14466', 'Available with restrictions', 2)
        })
    })

    context('Certificates - Modal Validations', () => {
        /** Related to User Stories
         * EGVFOUR-142
         * TODO this tests will suffer changes
         **/
        before(() => {
            // @ts-ignore
            if (hasContextFailed === 'failed'){
                throw new Error('Test Suite skipped Because Suite: "Certificates - General Validations" Status: FAIL')
            }
        })

        it('C30639326 - Certificate modal amount input field accepts only numeric characters', () => {
            //Automatically checks the value typed if does not contain nay other CHARs than 0-9
            equityGateway.SalesWizAmount2SellPage.certificatesModalEdit('DRIP_14466', 2, 'Available with restrictions', '999 AA', 'type')
        })

        it('C30639327 - Certificate modal amount input field is prepopulated with the previous amount to sell value defined in the Amount to Sell Page', () => {
            const sharesValueToPass = Math.floor(Math.random() * 490) + 10
            equityGateway.SalesWizAmount2SellPage.inputFieldShares('type', sharesValueToPass)
            equityGateway.SalesWizAmount2SellPage.certificatesModalEdit('DRIP_14466', 1, 'Available', sharesValueToPass, 'check')
        })

        it('C30639328 - Clicking the close button of certificate modal without new changes', () => {
            equityGateway.SalesWizAmount2SellPage.certificatesModalEdit('DRIP_14466', 1, 'Available', 'null', 'type', 'close')
            equityGateway.SalesWizAmount2SellPage.certificatesModalEdit('DRIP_14466', 1, 'Available', '100', 'check')
        })

        it('C30639329 -  Clicking the close button of certificate modal with new changes', () => {
            const sharesValueToPass = Math.floor(Math.random() * 490) + 10
            equityGateway.SalesWizAmount2SellPage.certificatesModalEdit('DRIP_14466', 2, 'Available with restrictions', sharesValueToPass, 'type', 'close')
            //this test is waiting for new DEVS
        })

        it('C30639330 -  Clicking the save changes button when user closes the certificate modal', () => {
            const sharesValueToPass = Math.floor(Math.random() * 490) + 10
            equityGateway.SalesWizAmount2SellPage.certificatesModalEdit('DRIP_14466', 2, 'Available with restrictions', sharesValueToPass, 'type', 'close')
            //this test is waiting for new DEVS
        })

        it('C30639333 -   Select "Save" button when user is on the modal', () => {
            const sharesValueToPass = Math.floor(Math.random() * 490) + 10
            equityGateway.SalesWizAmount2SellPage.certificatesModalEdit('DRIP_14466', 1, 'Available', sharesValueToPass, 'type', 'save')
            equityGateway.SalesWizAmount2SellPage.certificatesModalEdit('DRIP_14466', 1, 'Available', sharesValueToPass, 'check')
        })

        it('C30639334 -   Select "Dismiss" button when user is on the modal', () => {
            const sharesValueToPass = Math.floor(Math.random() * 490) + 10
            equityGateway.SalesWizAmount2SellPage.certificatesModalEdit('DRIP_14466', 1, 'Available', sharesValueToPass, 'type', 'dismiss')
            equityGateway.SalesWizAmount2SellPage.certificatesModalEdit('DRIP_14466', 1, 'Available', '100', 'check')
        })

        it('C30639335 - Verify if the input field is accepting 0 as min value', () => {
            const sharesValueToPass = 0
            equityGateway.SalesWizAmount2SellPage.certificatesModalEdit('DRIP_14466', 1, 'Available', sharesValueToPass, 'type', 'save')
            equityGateway.SalesWizAmount2SellPage.certificatesModalEdit('DRIP_14466', 1, 'Available', sharesValueToPass, 'check')
        })

        it('C30988138 - Use total amount shares will trigger an info modal when moving to next page', () => {
            const restrictedShareContentElements = [
                '29/03/2023',
                'Retention',
                'Match',
                '2,000',
                '11,00000',
                'Matching shares to be cancelled'
            ]
            equityGateway.SalesWizAmount2SellPage.btnTotalAmountClick()
            equityGateway.SalesWizTopBar.nextBtn('click')
            equityGateway.SalesWizAmount2SellPage.sharesModalValidation(restrictedShareContentElements)
            equityGateway.SalesWizAmount2SellPage.btnSharesModalClickAgree()
            equityGateway.SalesWizOrderTypePage.validatePageStructure()
        })
    })
})