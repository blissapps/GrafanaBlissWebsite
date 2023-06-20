import BasePage from '../../basePage'
//import Utils from '../../../utils'

//const utils = new Utils()

const selectors = {
    nextBtn: 'gs-button[size="large"]',
    closeBtn: ''
}

class salesWizAmount2SellPage extends BasePage {
    methodsHere(){
        //FIXME Example
        cy.get(selectors.nextBtn).contains('Next')
    }
}
export default salesWizAmount2SellPage