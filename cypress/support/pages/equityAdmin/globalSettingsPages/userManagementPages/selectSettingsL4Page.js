import BaseManagementPage from './baseManagementPage'

const properties = {
  pageURL: /.?settings\/.*[0-9]\/select\/.*[a-z]$/
}

const selectors = {
  headerTitle: 'gs-container-l4 h4[data-test-id=title]',
  searchInput: 'gs-container-l4 input',
  entityCardId: 'gs-container-l4 gs-card[data-test-id=entity-',
  confirmBtn: 'gs-container-l4 gs-button[data-test-id=confirm-button]',
  dismissBtn: 'gs-container-l4 gs-button[data-test-id=dismiss-button]',
  noEntityFound: 'gs-empty-container#noAvailableEntitiesFound'
}

/**
 * This class represents the L4 right page responsible to add some setting in a Group or DAP
 */
class SelectSettingsL4Page extends BaseManagementPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrlByRegex(properties.pageURL)
  }

  // -------------------------------------------------------------------------- ASSERTIONS ----------------------------------------------------------------------------- //

  /**
   * Assert the message 'No $entity available to add were found'
   *
   * @param {string} text Text to be validated in case you want to validate the content of the 'not found' message
   * @param {boolean} displayed True is the default value to validate the message id displayed. Send false to validate the otherwise
   */
  assertNoEntityToAddWereFoundIsDisplayed(text = '', displayed = true) {
    if (displayed) {
      cy.get(selectors.noEntityFound).should('be.visible')
      text != '' ? cy.get(selectors.noEntityFound).should('contain', text) : null
    } else {
      cy.get(selectors.noEntityFound).should('not.exist')
    }
  }

  // -------------------------------------------------------------------------- OTHERS --------------------------------------------------------------------------------- //

  /**
   * Search for a specific text in the search input and nothing else. You may be looking for the method selectSettings that does the searching and adding in a single method
   *
   * @param {string} textToSearch Text to be searched in the search input
   */
  searchEntity(textToSearch) {
    cy.get(selectors.searchInput).clear()
    cy.get(selectors.searchInput).type(textToSearch)
  }

  /**
   * Add entities in the nav right bar After clicking the "+ Add entity" button.
   * This is valid for adding groups, daps, users, clients and roles
   *
   * @param {string} entityType Type of the entity that is going to be added. It can be = group, role, dap, user, client
   * @param {array} entityNames Array containing the names of the entities that are going to be added into this entity.
   * @param {array} entityIds Array containing the ids of the entities that are going to be added into this entity.
   *
   * @example
   * All entityNames and entityIds need to be placed in order.
   * For example: entityNames=['user1', 'user2'] needs to match the exactly order in entityIds=[1, 2]
   *
   * @example
   * call the method like this : selectSettings('group', ['groupName1', 'groupName2'], [idGroup1, idGroup2]])
   * call the method like this : selectSettings('user', ['userName1', 'userName2'], [idUser1, idUser2]])
   */
  selectSettings(entityType, entityNames, entityIds) {
    this.checkUrl('/select/' + entityType) // Make sure we are adding the correct entity

    for (let i = 0; i < entityNames.length; i++) {
      cy.get(selectors.searchInput).type(entityNames[i])
      cy.get(selectors.entityCardId + entityIds[i]).click()
      cy.get(selectors.searchInput).clear()
    }
  }

  /**
   * Click to confirm the selection of the chosen settings
   */
  clickToConfirmTheSelections() {
    cy.get(selectors.confirmBtn).click()
  }

  /**
   * Click to dismiss the selection of the chosen settings
   */
  clickToDismissTheSelections() {
    cy.get(selectors.dismissBtn).click()
  }
}

export default SelectSettingsL4Page
