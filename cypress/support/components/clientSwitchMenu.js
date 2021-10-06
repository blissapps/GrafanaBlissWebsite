import BasePage from '../pages/basePage'

const clientSwitchSelectors = {
  clientSwitchButton: '#clientSwitchClick',
  switchClientHeader: 'hearth-client-switch-navigation-bar h2 > span',
  closeXButton: 'hearth-client-switch-navigation-bar gs-svg-icon',
  viewAllClientsButton: 'hearth-client-switch-navigation-bar gs-button',
  searchClientsInput: 'hearth-client-switch-navigation-bar input',
  clientsListed: 'hearth-client-switch-navigation-bar gs-list *[id*=client_',
  noClientsFoundMsg: '#noClientsFound',
  favoriteIcon: '.favorite-icon',
  favoriteClient: '#favoriteClient_'
}

class ClientSwitchMenu extends BasePage {
  // --------------------------------------- CLICKS  --------------------------------------------- //

  /**
   * Click in View All Clients in the Switch Client area
   */
  clickViewAllClients() {
    cy.get(clientSwitchSelectors.viewAllClientsButton).click()
  }

  /**
   * Click in a client in the Switch Client list
   *
   * @param {Number} clientId Client id number to be searched
   */
  clickInClientInSwitchClientMenu(clientId) {
    cy.get(clientSwitchSelectors.clientsListed + clientId).click()
  }

  /**
   * Click to favorite a client in the Switch Client list
   *
   * @param {Number} clientId Client id number to be favorite
   */
  clickToFavoriteClientInSwitchClientMenu(clientId) {
    cy.get(clientSwitchSelectors.clientsListed + clientId + ']+' + clientSwitchSelectors.favoriteIcon)
      .invoke('hover')
      .click({ force: true })
  }

  // --------------------------------------- ASSERTIONS  --------------------------------------------- //

  /**
   * Assert if a client is favorite in Client Switch
   *
   * @param {Number} clientId Client add to be verified
   * @param {Boolean} favorite True to validate if the client is favorite, false otherwise.
   */
  assertClientIsFavorite(clientId, favorite = true) {
    favorite ? cy.get(clientSwitchSelectors.favoriteClient + clientId).should('be.visible') : cy.get(clientSwitchSelectors.favoriteClient + clientId).should('not.exist')
  }

  /**
   * Validate the "No clients found" message is displayed after the user searches for a client that does not exists
   *
   * @param {Boolean} displayed True to validate the 'No Clients found' message is displayed. False, otherwise.
   */
  assertNoClientsFoundInClientSwitch(displayed = true) {
    displayed ? cy.get(clientSwitchSelectors.noClientsFoundMsg).should('be.visible') : cy.get(clientSwitchSelectors.noClientsFoundMsg).should('not.exist')
  }

  // --------------------------------------- OTHERS  --------------------------------------------- //

  /**
   * Search for a client in the Switch Client menu bar
   *
   * @param {String} clientName Client name to be searched
   */
  searchClientInSwitchClient(clientName) {
    cy.get(clientSwitchSelectors.searchClientsInput)
      .clear()
      .type(clientName)
  }

  /**
   * Close the Switch Client menu bar by clicking on the X button
   */
  closeSwitchClientMenuBar() {
    cy.get(clientSwitchSelectors.closeXButton)
      .eq(0)
      .click()
  }
}

export default ClientSwitchMenu
