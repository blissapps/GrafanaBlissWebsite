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
    certificateTable: 'div.eg-amount__table-body-row'

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

    sharesLabelValue(available, availableWithRestrictions, EstimatedProceeds, EstimatedGainLoss){
        cy.get(`${selectors.sharesLabelsValues}:nth-child(${1}) > .text-h4`).should('contain.text', available)
        cy.get(`${selectors.sharesLabelsValues}:nth-child(${2}) > .text-h4`).should('contain.text', availableWithRestrictions)
        cy.get(`${selectors.sharesLabelsValues}:nth-child(${3}) > .text-h4`).should('contain.text', EstimatedProceeds)
        cy.get(`${selectors.sharesLabelsValues}:nth-child(${4}) > .text-h4`).should('contain.text', EstimatedGainLoss)
    }

    certificateSectorValidation(){
        const certeficates = [
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
        certeficates.forEach((item) => {
            cy.get(selectors.certificateSector).contains(item).should('exist')
        })
    }

    certificatesValidation (numberCertificates, certificateNames) {
        cy.get(selectors.certificateTitle).should('contain.text', numberCertificates)

        certificateNames.forEach((item) => {
            cy.get(selectors.certificateTable).contains(item).should('exist')
        })
    }
}
export default salesWizAmount2SellPage