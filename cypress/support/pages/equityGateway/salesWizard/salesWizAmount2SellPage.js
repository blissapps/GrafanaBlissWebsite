import BasePage from '../../basePage'
import Utils from '../../../utils'

const utils = new Utils()

const selectors = {
    title: 'header > h2',
    description: 'header > .text-color-cool80',
    checkbox: 'gs-checkbox[data-test-id="sw-amount-to-sell-shares-checkbox"]',
    inputField: 'gs-input-field[data-test-id="sw-amount-to-sell-shares-input"] input',
    btnTotalShares: 'gs-button[data-test-id="sw-amount-to-sell-shares-btn"]',
    sharesLabelAvail: 'div[data-test-id="sw-amount-to-sell-shares-available"]',
    sharesLabelAvailWithRestri: 'div[data-test-id="sw-amount-to-sell-shares-available-w-restrictions"]',
    sharesLabelEstimatedProcee: 'div[data-test-id="sw-amount-to-sell-shares-estimated-proceeds"]',
    sharesLabelEstimatedGainLoss: 'div[data-test-id="sw-amount-to-sell-shares-estimated-gain-loss"]',
    certificateSector: 'div[data-test-id="sw-amount-to-sell-certificates"]',
    certificateTitle: 'h4[data-test-id="sw-amount-to-sell-certificates-title"]',
    certificateTable: 'div[data-test-id="sw-amount-to-sell-certificates-card"]',
    certificateName: 'div[data-test-id="sw-amount-to-sell-certificates-card-0"]',
    sharesModalEdit: 'section[data-test-id="sw-edit-shares"]',
    sharesModalInfo: 'section[data-test-id="sw-restricted-shares"]',
    btnSharesModalAgree: 'gs-button[data-test-id="sw-restricted-shares-btn-agree"]',
    btnSharesModalDismiss: 'gs-button[data-test-id="sw-edit-shares-btn-dismiss"]',
    btnSharesModalSave: 'gs-button[data-test-id="sw-edit-shares-btn-save"]',
    sharesModalHeader: '.eg-modal__modal-header',
    sharesModalInputField: 'gs-input-field[data-test-id="sw-edit-shares-input"] > div > input',
    sharesModalCloseBtn: 'gs-button[type="icon"]'
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
        cy.get(selectors.sharesLabelAvail).should('contain.text', available)
        cy.get(selectors.sharesLabelAvailWithRestri).should('contain.text', availableWithRestrictions)
        cy.get(selectors.sharesLabelEstimatedProcee).should('contain.text', estimatedProceeds)
        cy.get(selectors.sharesLabelEstimatedGainLoss).should('contain.text', estimatedGainLoss)

        const positiveRgx = /€ ([0-9]+(\.[0-9]+)+)/
        const negativeRgx = /€ -([0-9]+(\.[0-9]+)+)/

        if (positiveRgx.test(estimatedGainLoss)) {
            cy.get(`${selectors.sharesLabelEstimatedGainLoss} > .text-h4`).should('have.css', 'color', 'rgb(0, 153, 0)')
        } else if (negativeRgx.test(estimatedGainLoss)) {
            cy.get(`${selectors.sharesLabelEstimatedGainLoss} > .text-h4`).should('have.css', 'color', 'rgb(223, 7, 7)')
        } else {
            throw new Error('Unexpected "estimatedGainLoss" value')
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
            cy.get(selectors.sharesModalInfo).contains(item).should('exist')
        })
        restrictedShareContentElements.forEach((item) => {
            cy.get(selectors.sharesModalInfo).contains(item).should('exist')
        })
    }

    btnSharesModalClickAgree () {
        cy.get(selectors.btnSharesModalAgree).click({ force: true })
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

    certificatesCounterValidation (numberCertificates, certificateNames) {
        cy.get(selectors.certificateTitle).should('contain.text', numberCertificates)

        certificateNames.forEach((item) => {
            cy.get(selectors.certificateTable).contains(item).should('exist')
        })
    }

    certificatesDisable (certificateName, certificatePosition) {
        selectors.certificateName = `div[data-test-id="sw-amount-to-sell-certificates-card-${certificatePosition}"]`
        cy.get(selectors.certificateName).should('have.class', 'disabled-item')
        cy.contains(certificateName).get(selectors.certificateName+' > div > div > div > div').should('have.css', 'background-color', 'rgb(255, 202, 95)').click()
        cy.get(selectors.sharesModalEdit).should('not.exist')
    }

    certificatesModalValidation (certificateName, availability, certificatePosition) {
        const elements = [
            'Edit shares selection',
            'Available',
            'Estimated Proceeds',
            'Estimated Gain/Loss',
            'Dismiss',
            'Save'
        ]

        if (certificatePosition !== undefined){
            selectors.certificateName = `div[data-test-id="sw-amount-to-sell-certificates-card-${certificatePosition}"]`

            if (availability === 'Available') {
                cy.contains(certificateName).get(selectors.certificateName+' > div > div > div > div').should('have.css', 'background-color', 'rgb(0, 153, 0)').click()
            } else if (availability === 'Available with restrictions') {
                cy.contains(certificateName).get(selectors.certificateName+' > div > div > div > div').should('have.css', 'background-color', 'rgb(255, 202, 95)').click()
            } else {
                throw new Error('Unexpected "availability" value')
            }
        } else {
            throw new Error('Missing "certificatePosition" value')
        }

        cy.get(selectors.sharesModalHeader).then(($element) => {
            if ($element.length > 0) {
                elements.forEach((item) => {
                    cy.get(selectors.sharesModalEdit).contains(item).should('exist')
                })
                cy.get(selectors.sharesModalInputField).should('be.visible')
            } else {
                throw new Error('Modal elements missing')
            }
        })
    }

    certificatesModalEdit (certificateName, certificatePosition, ShareAvailability, sharesAmount, checkORetype, dismissORsaveORclose) {
        if (ShareAvailability !== 'null') {
            this.certificatesModalValidation (certificateName, ShareAvailability, certificatePosition)
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
                    cy.get(selectors.btnSharesModalDismiss).click( { force: true })
                })
                break
            case 'save':
                cy.get(selectors.btnSharesModalSave).click( { force: true })
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
}
export default salesWizAmount2SellPage