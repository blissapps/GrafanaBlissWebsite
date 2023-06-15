import BasePage from '../../../basePage'

const selectors = {
    nextBtn: 'gs-button[size="large"]',
    closeBtn: ''
}

class salesWizSideLmenu extends BasePage {
    //FIXME Method here...
    nextClick(){
        cy.get(selectors.nextBtn).contains('Next').click()
    }
}
export default salesWizSideLmenu