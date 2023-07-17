import BasePage from '../../basePage'

const selectors = {
  nextBtn: 'gs-button[size="large"]',
  closeBtn: '',
  shareGroupBody: 'gs-radio-button-group',
  shareGroupsAvailable: 'gs-radio-button-option'
}

class salesWizShareGroupPage extends BasePage {
  validateMainBody() {
    this.isShareGroupOptionsBodyVisible()
    this.areAnyShareGroupOptionsVisible()
    cy.get(selectors.shareGroupsAvailable).eq(0).dblclick().should('have.css', 'border-color', 'rgb(0, 101, 255)')
  }

  isShareGroupOptionsBodyVisible() {
    cy.get(selectors.shareGroupBody).should('be.visible')
  }

  areAnyShareGroupOptionsVisible() {
    cy.get(selectors.shareGroupsAvailable).its('length').should('be.greaterThan', 0)
  }

  isSharesGroupClickable(availableButtons) {
    for (let i = 0; i < availableButtons; i++) {
      cy.get(selectors.shareGroupsAvailable).eq(i).should('be.enabled')
    }
  }

  setSharesGroupAvailableButtons() {
    let availableSharesGroupButtons = 0
    cy.get(selectors.shareGroupsAvailable)
      .its('length')
      .then((number) => (availableSharesGroupButtons = number))

    return availableSharesGroupButtons
  }

  selectShareGroupByName(shareGroupName) {
    cy.get(selectors.shareGroupBody).contains(shareGroupName).click()
  }
}

export default salesWizShareGroupPage
