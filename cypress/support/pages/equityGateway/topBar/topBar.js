import BasePage from '../../basePage'

const selectors = {
    accDetails: '.w-3 > .medium',
    accMenuDetails: '.eg-header__dropdown'
}

class TopBar extends BasePage {
    accDetails(acc_name){
        cy.get(selectors.accDetails).contains(acc_name).click()
    }

    accMenu(label1, label2, label3, label4){
        cy.get(selectors.accMenuDetails).should('be.visible').contains(label1)
        cy.get(selectors.accMenuDetails).should('be.visible').contains(label2)
        cy.get(selectors.accMenuDetails).should('be.visible').contains(label3)
        cy.get(selectors.accMenuDetails).should('be.visible').contains(label4)
    }

}
export default TopBar