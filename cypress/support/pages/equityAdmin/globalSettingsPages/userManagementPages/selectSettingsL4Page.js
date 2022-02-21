import BaseManagementPage from './baseManagementPage'

const properties = {
  pageURL: /.?settings\/.*[0-9]\/select\/.*[a-z]$/
}

const selectors = {
  headerTitle: 'gs-container-l4 h4[data-test-id=title]',
  searchInput: 'gs-container-l4 input',
  entityCardId: 'gs-container-l4 gs-card[data-test-id=entity-',
  confirmBtn: 'gs-container-l4 gs-button[data-test-id=confirm-button]',
  dismissBtn: 'gs-container-l4 gs-button[data-test-id=dismiss-button]'
}

/**
 * This class is built to implement the page of the USER DETAIL page that is displayed as a container/"popup" in the right side of the page when the user click in an user to get details
 */
class SelectSettingsL4Page extends BaseManagementPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrlByRegex(properties.pageURL)
  }

  // -------------------------------------------------------------------------- OTHERS --------------------------------------------------------------------------------- //

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
