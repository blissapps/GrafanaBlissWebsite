import BasePage from '../../basePage'
//import Utils from '../../../utils'

//const utils = new Utils()

const selectors = {
    title: 'header > h2',
    description: 'header > .text-color-cool80',
    checkbox: '.eg-amount__checkbox-container > .mr-3',
    inputField: 'input[placeholder="0"]',
    btnTotalShares: 'gs-button[type="default"]'

}

class salesWizAmount2SellPage extends BasePage {
    titleAndDescription(title, description){
        cy.get(selectors.title).should('have.text', title)
        cy.get(selectors.description).should('contain.text', description)
    }

    interactiveElementsCheck(){
        //utils.checkClickable(selectors.checkbox)
        cy.get(selectors.inputField).type('1919')
        //cy.wait(10000)
        cy.get(selectors.btnTotalShares).click()
    }
}
export default salesWizAmount2SellPage