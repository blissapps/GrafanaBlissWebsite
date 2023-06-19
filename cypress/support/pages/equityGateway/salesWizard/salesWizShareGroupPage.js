import BasePage from '../../basePage'

const selectors = {
  nextBtn: 'gs-button[size="large"]',
  closeBtn: '',
  shareGroupBody: 'gs-radio-button-group',
  shareGroupsAvailable: 'gs-radio-button-option'
}

//#0065ff rgb(0, 101, 255) color HEX [.border-color-accent (border-color)]

class salesWizShareGroupPage extends BasePage {
  validateMainBody() {
    this.isShareGroupOptionsBodyVisible()
    this.areAnyShareGroupOptionsVisible()
    this.selectShareGroupByName('Purchase plan issuances')
    //cy.get(selectors.shareGroupsAvailable).eq(0).click().should('have.attr', 'border-color', 'rgb(0, 101, 255)')
  }

  isShareGroupOptionsBodyVisible() {
    cy.get(selectors.shareGroupBody).should('be.visible')
  }

  areAnyShareGroupOptionsVisible() {
    cy.get(selectors.shareGroupsAvailable).its('length').should('be.greaterThan', 0)
  }

  selectShareGroupByName(shareGroupName){
    cy.get(selectors.shareGroupBody).contains(shareGroupName).click()
  }
}
export default salesWizShareGroupPage
