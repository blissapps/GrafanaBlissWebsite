import BasePage from '../../../../basePage'

const selectors = {
  sideRmenu: '.eg-my-account-content-sidebar',
  sideRinfo: '.align-items-start',
  close: 'gs-button.eg-my-account-sidebar__close',
  sideMenuElements: 'nav.eg-my-account-sidebar__navigation a'
}

const sideMenuElementPositions = {
  'Personal Information': 0,
  'Bank Account': 1,
  Payments: 2,
  'Password & Security': 3,
  Language: 4,
  'Tax Documents': 5,
  Help: 6,
  Logout: 7
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

  clickSideMenuButton(buttonToClick) {~
    cy.log(`### Result for ${buttonToClick} - ${sideMenuElementPositions[buttonToClick]}nth element`)
    cy.get(selectors.sideMenuElements).eq(sideMenuElementPositions[buttonToClick]).click()
  }

}
export default PersonalInfoRMenu
