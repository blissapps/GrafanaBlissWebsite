import BasePage from '../../../basePage'

const selectors = {
    nextBtn: 'gs-button[size="large"]',
    backBtn: 'gs-button[size="large"]'
}

class salesWizTopBar extends BasePage {
    nextBtn(click){
        if (click === 'click') {
            cy.get(selectors.nextBtn).contains('Next').click()
        } else if (click === 'undefined' || click === null) {
            cy.get(selectors.backBtn).contains('Next').should('be.visible')
        } else {
            throw new Error('Passed "nextBtn(click)" statement was not expected')
        }

    }

    backBtn(click){
        if (click === 'click') {
            cy.get(selectors.backBtn).contains('Back').click()
        } else if (click === 'undefined' || click === null) {
            cy.get(selectors.backBtn).contains('Back').should('be.visible')
        } else {
            throw new Error('Passed "backBtn(click)" statement was not expected')
        }
    }
}
export default salesWizTopBar