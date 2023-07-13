import BasePage from '../../../../basePage'

const selectors = {
  sideRmenu: '.eg-my-account-content-sidebar',
  sideRinfo: '.align-items-start',
  close: 'gs-button[type="default"][appearance="flat"]',
  sideMenuElements: 'nav.eg-my-account-sidebar__navigation'
}

class PersonalInfoRMenu extends BasePage {
  sideMenuValidation(expectedItems) {
    expectedItems.forEach((item) => {
      cy.get(selectors.sideRmenu).contains(item).should('exist')
    })
  }

  sideInfoSector(expectedItems) {
    expectedItems.forEach((item) => {
      cy.get(selectors.sideRmenu).contains(item).should('exist')
    })
  }

  /*
    sideMenuValidationHref(pageName, href){
        cy.get(selectors.sideLbar).contains(pageName)
            .should('exist')
            .should('have.attr', 'href', href);
    }
     */

  clickCloseButton() {
    cy.get(selectors.close).click()
  }

  clickSideMenuButton(buttonToClick) {
    cy.get(selectors.sideMenuElements).contains(buttonToClick).click({ force: true })
  }
}

export default PersonalInfoRMenu
