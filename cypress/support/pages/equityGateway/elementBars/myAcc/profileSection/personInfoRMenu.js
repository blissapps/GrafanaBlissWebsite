import BasePage from '../../../../basePage'

const selectors = {
    sideRmenu: '.eg-my-account-content-sidebar',
    sideRinfo: '.align-items-start'
}

class PersonalInfoRMenu extends BasePage {
    sideMenuValidation(expectedItems){
        expectedItems.forEach((item) => {
            cy.get(selectors.sideRmenu).contains(item).should('exist');
        })
    }

    sideInfoSector(expectedItems){
        expectedItems.forEach((item) => {
            cy.get(selectors.sideRmenu).contains(item).should('exist');
        })
    }
    /*
    sideMenuValidationHref(pageName, href){
        cy.get(selectors.sideLbar).contains(pageName)
            .should('exist')
            .should('have.attr', 'href', href);
    }
     */
}
export default PersonalInfoRMenu