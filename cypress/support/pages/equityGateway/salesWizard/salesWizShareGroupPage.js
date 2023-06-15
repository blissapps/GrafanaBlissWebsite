import BasePage from '../../basePage'

const selectors = {
    nextBtn: 'gs-button[size="large"]',
    closeBtn: ''
}

class salesWizShareGroupPage extends BasePage {
    methodsHere(){
        //FIXME Example
        cy.get(selectors.nextBtn).contains('Next')
    }
}
export default salesWizShareGroupPage