import BaseManagementPage from './baseManagementPage'

const properties = {
  pageURL: '/settings/dap-management'
}

const selectors = {
  activeDapList: 'gs-tab[data-test-id=activeTab] #dapList gs-list',
  inactiveDapList: 'gs-tab[data-test-id=inactiveTab] #dapList gs-list',
  noDapExistsMessage: '#emptyList',
  addGroupsBtn: '*[data-test-id=section-group] *[data-test-id=add-entity]',
  dapId: 'a[data-test-id=dap-',
  groupsCardId: '*[data-test-id=section-group] gs-card[data-test-id=entity-',
  removeIconButton: 'gs-button[data-test-id=remove-entity]',
  conditionsContainer: 'div.condition-container'
}

class DapManagementPage extends BaseManagementPage {
  /**
   * Checks if the current page is Data Access Profile management URL
   */
  checkDapManagementUrl() {
    this.checkUrl(properties.pageURL)
  }

  // ----------------------------------------------- GETS --------------------------------------------- //

  /**
   * Get a DAP by sending the DAP ID.
   *
   * @param {Number} dapId DAP id number.
   *
   * @returns The DAP element
   */
  getDapById(dapId) {
    return cy.get(selectors.dapId + dapId).scrollIntoView()
  }

  // ----------------------------------------------- CLICKS --------------------------------------------- //

  /**
   * Click in a DAP by sending the DAP ID.
   *
   * @param {Number} dapId DAP id number.
   */
  clickDapById(dapId) {
    this.getDapById(dapId).click()
  }

  // ----------------------------------------------- ASSERTS --------------------------------------------- //

  /**
   * Assert a list of daps is displayed under the correlated Active tab.
   *
   * @param {Boolean} displayed True to validate if the list is displayed. False otherwise
   */
  assertActiveDapsAreDisplayed(displayed = true) {
    displayed ? cy.get(selectors.activeDapList).should('be.visible') : cy.get(selectors.activeDapList).should('not.exist')
  }

  /**
   * Assert a list of daps is displayed under the correlated Inactive tab.
   *
   * @param {Boolean} displayed True to validate if the list is displayed. False otherwise
   */
  assertInactiveDapsAreDisplayed(displayed = true) {
    displayed ? cy.get(selectors.inactiveDapList).should('be.visible') : cy.get(selectors.inactiveDapList).should('not.exist')
  }

  /**
   * Assert the message "There are no data access profiles" is displayed when there is no data displayed
   */
  assertNoDapExistsMessageIsDisplayed() {
    cy.get(selectors.noDapExistsMessage).should('be.visible')
  }

  /**
   * Assert if an group is associated with the selected dap
   *
   * @param {Number} groupId Group Id
   * @param {Boolean} displayed True if you want to assert the group is associated with the dap, false otherwise
   * @param {Boolean} showAll True to click in the showAll buttons for the case where we have lots of groups associated
   */
  assertGroupAssociatedWithDap(groupId, displayed = true, showAll = false) {
    if (showAll) {
      this.clickShowAll('groups')
    }

    if (displayed) {
      cy.get(selectors.groupsCardId + groupId)
        .scrollIntoView()
        .should('be.visible')
    } else {
      cy.get(selectors.groupsCardId + groupId).should('not.exist')
    }
  }

  /**
   * Assert the container with all Conditions is displayed
   */
  assertConditionsContainerDisplayed() {
    cy.get(selectors.conditionsContainer)
      .scrollIntoView()
      .should('be.visible')
  }

  // ----------------------------------------------- OTHERS --------------------------------------------- //

  /**
   * Add Groups to a selected DAP
   *
   * @param {Array} groupNames Array of name of groups that are going to be added into this dap.
   * @param {Array} groupIds Array of id of groups that are going to be added into this dap.
   *
   * @example
   * All dapNames and dapIds need to be placed in order.
   * For example: dapNames=['dap1', 'dap2'] needs to match the exactly order in dapIds=[1, 2]
   */
  addGroupsToDap(groupNames, groupIds) {
    cy.get(selectors.addGroupsBtn).click()
    this.addEntitiesInTheRightNavBar('group', groupNames, groupIds)
  }

  /**
   * Remove groups from a selected dap
   *
   * @param {Array} groupsIds Array of ids of groups that are going to be removed of the selected DAP.
   * @param {Boolean} showAll True to click in the showAll buttons for the case where we have lots of groups associated
   */
  removeDapsFromGroup(groupsIds, showAll = false) {
    if (showAll) {
      this.clickShowAll('groups')
    }

    for (let i = 0; i < groupsIds.length; i++) {
      cy.get(selectors.groupsCardId + groupsIds[i] + '] ' + selectors.removeIconButton)
        .scrollIntoView()
        .click()
    }
  }
}

export default DapManagementPage
