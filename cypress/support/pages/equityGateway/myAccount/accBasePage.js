import BasePage from '../../basePage'

// @ts-ignore
const selectors = {
    sideLmenu: '.eg-my-account-sidebar',
    sideRbar: '.eg-my-account-content-sidebar',
    sideLbar: '.eg-my-account-sidebar__navigation'
}

class accBasePage extends BasePage {
    sideMenu(expectedItems){
        expectedItems.forEach((item) => {
        cy.get(selectors.sideLmenu).contains(item).should('exist');
        })
    }
    gotoPage(pageName, href){
        cy.get(selectors.sideLbar).contains(pageName).click({ force: true })
        cy.url().should('include', href)
    }
}
export default accBasePage