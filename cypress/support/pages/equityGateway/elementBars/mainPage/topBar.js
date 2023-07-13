import BasePage from '../../../basePage'

const selectors = {
  accDetails: '.w-3 > .medium',
  accDetailsIcn: '.initials',
  accMenuDetails: '.eg-header__dropdown'
}

class TopBar extends BasePage {
  accDetails(acc_name) {
    if (acc_name === undefined || acc_name === null || acc_name === '') {
      cy.get(selectors.accDetailsIcn).click()
    } else {
      cy.get(selectors.accDetails).contains(acc_name).click()
    }
  }

  accMenuHrefValidations(expectedItems, expectedHrefs) {
    this.accDetails()
    expectedItems.forEach((item, index) => {
      cy.get(selectors.accMenuDetails)
        .contains(item)
        .should('exist')
        .should('have.attr', 'href')
        .then((href) => {
          expect(href).to.equal(expectedHrefs[index])
        })
    })
  }

  accMenuClick(accName, itemToClick) {
    this.accDetails(accName)
    cy.get(selectors.accMenuDetails).contains(itemToClick).should('exist').click()
  }

  accMenuLogout() {
    this.accDetails()
    cy.get(selectors.accMenuDetails).contains('Logout').should('exist').click()
  }
}

export default TopBar