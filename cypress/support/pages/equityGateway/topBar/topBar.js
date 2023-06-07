import BasePage from '../../basePage'

const selectors = {
    accDetails: '.w-3 > .medium',
    accDetailsIcn: '.initials',
    accMenuDetails: '.eg-header__dropdown'
}

class TopBar extends BasePage {
    accDetails(acc_name){
        if (acc_name === undefined) {
            cy.get(selectors.accDetailsIcn).click()
        } else {
            cy.get(selectors.accDetails).contains(acc_name).click()
        }
    }

    accMenuValidation(expectedItems){
        expectedItems.forEach((item) => {
            cy.get(selectors.accMenuDetails).contains(item).should('exist')
        })
    }

    accMenuClick(accName, itemToClick){
        this.accDetails(accName)
        cy.get(selectors.accMenuDetails).contains(itemToClick).should('exist').click()
    }
}
export default TopBar