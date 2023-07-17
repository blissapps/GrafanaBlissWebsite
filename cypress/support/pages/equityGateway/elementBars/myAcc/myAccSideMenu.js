import BasePage from '../../../basePage'

const selectors = {
  sideLmenu: '.eg-my-account-sidebar'
}

class MyAccSideMenu extends BasePage {
  sideMenuValidation(expectedItems) {
    expectedItems.forEach((item) => {
      cy.get(selectors.sideLmenu).contains(item).should('exist')
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

export default MyAccSideMenu