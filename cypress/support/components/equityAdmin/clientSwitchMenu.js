import BasePage from '../../pages/basePage'

const selectors = {
  clientSwitchButton: '#clientSwitchClick',
  switchClientHeader: 'hearth-client-switch-navigation-bar h2 > span',
  closeXButton: 'hearth-client-switch-navigation-bar gs-svg-icon',
  viewAllClientsButton: 'hearth-client-switch-navigation-bar gs-button',
  searchClientsInput: 'hearth-client-switch-navigation-bar input',
  clientsListed: 'hearth-client-switch-navigation-bar gs-list *[id*=client_',
  noClientsFoundMsg: '#noClientsFound',
  favoriteIcon: '.favorite-icon',
  favoriteClient: '#favoriteClient_',
  clientsFullList: 'gs-list ,navigation'
}

class ClientSwitchMenu extends BasePage {
  // ----------------------------------------------------------------------------------- CLICKS  ---------------------------------------------------------------------------- //

  /**
   * Click in View All Clients in the Switch Client area
   */
  clickViewAllClients() {
    cy.get(selectors.viewAllClientsButton).click()
  }

  /**
   * Click in a client in the Switch Client list
   *
   * @param {number} clientId Client id number to be searched
   */
  clickInClientInSwitchClientMenu(clientId) {
    cy.get(selectors.clientsListed + clientId).click()
  }

  /**
   * Click to favorite a client in the Switch Client list
   *
   * @param {number} clientId Client id number to be favorite
   */
  clickToFavoriteClientInSwitchClientMenu(clientId) {
    cy.get(selectors.clientsListed + clientId + ']+' + selectors.favoriteIcon)
      .invoke('hover')
      .click({ force: true })
  }

  // ------------------------------------------------------------------------------------- ASSERTIONS  ---------------------------------------------------------------------------- //

  /**
   * Assert the list of clients is displayed bellow the ALL header
   *
   * @param {boolean} displayed True to validate the list is displayed, false otherwise
   */
  assertClientListDisplayed(displayed = true) {
    displayed ? cy.get(selectors.clientsFullList).should('be.visible') : cy.get(selectors.clientsFullList).should('not.exist')
  }

  /**
   * Assert if a client is favorite in Client Switch
   *
   * @param {number} clientId Client add to be verified
   * @param {boolean} favorite True to validate if the client is favorite, false otherwise.
   */
  assertClientIsFavorite(clientId, favorite = true) {
    favorite ? cy.get(selectors.favoriteClient + clientId).should('be.visible') : cy.get(selectors.favoriteClient + clientId).should('not.exist')
  }

  /**
   * Validate the "No clients found" message is displayed after the user searches for a client that does not exists
   *
   * @param {boolean} displayed True to validate the 'No Clients found' message is displayed. False, otherwise.
   */
  assertNoClientsFoundInClientSwitch(displayed = true) {
    displayed ? cy.get(selectors.noClientsFoundMsg).should('be.visible') : cy.get(selectors.noClientsFoundMsg).should('not.exist')
  }

  // ------------------------------------------------------------------------------------- OTHERS  --------------------------------------------------------------------------------- //

  clearSearchClientsContent() {
    cy.get(selectors.searchClientsInput).clear()
  }

  /**
   * Search for a client in the Switch Client menu bar
   *
   * @param {string} clientName Client name to be searched
   */
  searchClientInSwitchClient(clientName) {
    cy.get(selectors.searchClientsInput).clear().type(clientName)
  }

  /**
   * Close the Switch Client menu bar by clicking on the X button
   */
  closeSwitchClientMenuBar() {
    cy.get(selectors.closeXButton).eq(0).click()
  }
}

export default ClientSwitchMenu
