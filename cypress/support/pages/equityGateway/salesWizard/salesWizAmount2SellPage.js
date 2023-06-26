import BasePage from '../../basePage'
import Utils from '../../../utils'

const utils = new Utils()

const selectors = {
    title: 'header > h2',
    description: 'header > .text-color-cool80',
    checkbox: '.eg-amount__checkbox-container > .mr-3',
    inputField: 'input[placeholder="0"]',
    btnTotalShares: 'gs-button[type="default"]',
    sharesLabels: '.eg-amount__total',
    sharesLabelsValues: '.eg-amount__total > ',
    certificateSector: '.eg-amount > :nth-child(6)',
    certificateTitle: '.eg-amount > :nth-child(6) > .font-bold',
    certificateTable: 'div.eg-amount__table',
    certificateTableElementColo: '> .square > .eg-amount__table-body-row > .flex > .eg-amount__status-icon',
    sharesModal: '.eg-modal__modal',
    sharesModalAgreeBtn: 'gs-button[data-test-id="sw-restricted-shares-btn-agree"]',
    sharesModalHeader: '.eg-modal__modal-header',
    sharesModalInputField: '.mt-5 > .input > .ng-untouched',
    sharesModalCloseBtn: '.border-none'
}

class salesWizAmount2SellPage extends BasePage {
    titleAndDescription(title, description){
        cy.get(selectors.title).should('have.text', title)
        cy.get(selectors.description).should('contain.text', description)
    }

    interactiveElementsCheck(){
        utils.checkClickable(selectors.checkbox)
        utils.checkClickable(selectors.btnTotalShares)
        cy.get(selectors.inputField).should('be.visible').should('not.have.attr', 'readonly')
    }

    checkBoxClick () {
        cy.get(selectors.checkbox).click()
    }

    btnTotalAmountClick(){
        cy.get(selectors.btnTotalShares).click()
    }

    inputFieldShares (checkORetype, sharesAmount) {
        switch (checkORetype) {
            case 'type':
                cy.get(selectors.inputField).clear().type(sharesAmount, { force: true }).then(() => {
                    cy.get('input').should('not.have.value', /[0-9]+/)
                })
                break
            case 'check':
                cy.get(selectors.inputField).should('contain.value', sharesAmount)
                break
            default:
                throw new Error('Passed "checkORetype" statement was not expected')
        }
    }

    sharesLabelValue(available, availableWithRestrictions, estimatedProceeds, estimatedGainLoss){
        cy.get(`${selectors.sharesLabelsValues}:nth-child(${1}) > .text-h4`).should('contain.text', available)
        cy.get(`${selectors.sharesLabelsValues}:nth-child(${2}) > .text-h4`).should('contain.text', availableWithRestrictions)
        cy.get(`${selectors.sharesLabelsValues}:nth-child(${3}) > .text-h4`).should('contain.text', estimatedProceeds)
        cy.get(`${selectors.sharesLabelsValues}:nth-child(${4}) > .text-h4`).should('contain.text', estimatedGainLoss)

        const positiveRgx = /€ ([0-9]+(\.[0-9]+)+)/
        const negativeRgx = /€ -([0-9]+(\.[0-9]+)+)/

        if (positiveRgx.test(estimatedGainLoss)) {
            cy.get(`${selectors.sharesLabelsValues}:nth-child(${4}) > .text-h4`).should('have.css', 'color', 'rgb(0, 153, 0)')
        } else if (negativeRgx.test(estimatedGainLoss)) {
            cy.get(`${selectors.sharesLabelsValues}:nth-child(${4}) > .text-h4`).should('have.css', 'color', 'rgb(223, 7, 7)')
        } else {
            throw new Error('Unexpected estimatedGainLoss value')
        }
    }

    certificateSectorValidation(){
        const certificates = [
            'Certificates',
            'Please enter the number of shares that you wish to sell below',
            'Available',
            'Available with restrictions',
            'Certificates',
            'SHARES',
            'AMOUNT SELECTED',
            'EST. GROSS SALE PROCEEDS',
            'EST. GAIN/LOSS'
        ]
        certificates.forEach((item) => {
            cy.get(selectors.certificateSector).contains(item).should('exist')
        })
    }

    certificatesValidation (numberCertificates, certificateNames) {
        cy.get(selectors.certificateTitle).should('contain.text', numberCertificates)

        certificateNames.forEach((item) => {
            cy.get(selectors.certificateTable).contains(item).should('exist')
        })
    }

    certificatesModalValidation (certificateName, availability) {
        const elements = [
            'Edit shares selection',
            'Available',
            'Estimated Proceeds',
            'Estimated Gain/Loss',
            'Dismiss',
            'Save'
        ]

        if (availability === 'Available') {
            //FIXME it will change, to implement trough ID
            cy.contains(certificateName).get(selectors.certificateTable+' > :nth-child(2)'+selectors.certificateTableElementColo).should('have.css', 'background-color', 'rgb(0, 153, 0)').click()
        } else if (availability === 'Available with restrictions') {
            //FIXME it will change, to implement trough ID
            cy.contains(certificateName).get(selectors.certificateTable+' > :nth-child(3)'+selectors.certificateTableElementColo).should('have.css', 'background-color', 'rgb(255, 202, 95)').click()
        } else {
            throw new Error('Availability error')
        }

        cy.get(selectors.sharesModalHeader).then(($element) => {
            if ($element.length > 0) {
                elements.forEach((item) => {
                    cy.get(selectors.sharesModal).contains(item).should('exist')
                })
                cy.get(selectors.sharesModalInputField).should('be.visible')
            } else {
                throw new Error('Modal elements missing')
            }
        })
    }

    certificatesModalEdit (certificateName, ShareAvailability, sharesAmount, checkORetype, dismissORsaveORclose) {
        if (ShareAvailability !== 'null') {
            this.certificatesModalValidation (certificateName, ShareAvailability)
        }

        switch (checkORetype) {
            case 'type':
                cy.get(selectors.sharesModalInputField).clear().type(sharesAmount, { force: true }).then(() => {
                    cy.get(selectors.sharesModalInputField).should('not.have.value', /[0-9]+/)
                })
                break
            case 'check':
                cy.get(selectors.sharesModalInputField).should('have.value', sharesAmount)
                break
            default:
                throw new Error('Passed "checkORetype" statement was not expected')
        }

        switch (dismissORsaveORclose) {
            case 'dismiss':
                cy.get(selectors.sharesModalInputField).clear().type(sharesAmount, { force: true }).then(() => {
                    cy.get(selectors.sharesModal).contains('Dismiss').click( { force: true })
                })
                break
            case 'save':
                cy.get(selectors.sharesModal).contains('Save').click( { force: true })
                break

            case 'close':
                cy.get(selectors.sharesModalCloseBtn).click( { force: true })
                break

            case undefined :
                cy.log('Option "dismissORsave" undefined, shares selection will keep open')
                break
            default:
                throw new Error('Passed "dismissORsave" statement was not expected')
        }
    }

    sharesModalValidation (restrictedShareContentElements) {
        const elements = [
            'Restricted shares',
            'You have selected to sell some restricted shares.',
            'Retention date',
            'Restriction type',
            'Issuance type',
            'Number of shares',
            'Restriction type',
            'Impact',
            'Dismiss',
            'I agree'
        ]
        elements.forEach((item) => {
            cy.get(selectors.sharesModal).contains(item).should('exist')
        })
        restrictedShareContentElements.forEach((item) => {
            cy.get(selectors.sharesModal).contains(item).should('exist')
        })
    }

    btnSharesModalClickAgree () {
        cy.get(selectors.sharesModalAgreeBtn).click({ force: true })
    }
}
export default salesWizAmount2SellPage