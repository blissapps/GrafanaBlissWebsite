import BasePage from '../../basePage'

// @ts-ignore
const selectors = {
    sideLmenu: '.eg-my-account-sidebar',
    sideRbar: '.eg-my-account-content-sidebar',
    sideLbar: '.eg-my-account-sidebar__navigation'
}

class accBase extends BasePage {
    sideMenu(expectedItems){
        expectedItems.forEach((item) => {
        cy.get(selectors.sideLmenu).contains(item).should('exist');
        })
    }
    //FIXME TO BE REPLACED BY PAGENAVI TESTS
    sideMenuGotoPage(pageName, href){
        cy.get(selectors.sideLbar).contains(pageName).click({ force: true })
        cy.get(selectors.sideLbar).contains(pageName)
            .should('exist')
            .should('have.attr', 'href', href);
    }
}
export default accBase