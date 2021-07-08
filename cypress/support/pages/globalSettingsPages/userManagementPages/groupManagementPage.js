import BasePage from '../../basePage'

const properties = {
  pageURL: '/settings/group-management'
}

const selectors = {
  noGroupSelectedMsg: '#noGroupSelectedContainer div.content',
  numberOfSearchResultsInTable: 'div.search-label',
  searchResultList: 'gs-list[data-test-id=searchListing-found]',
  searchResultItem: '#searchResultItem_',
  otherGroupList: 'gs-list[data-test-id=searchListing-other]',
  otherItem: '#otherItem_',
  noGroupsFound: 'div.not-found',
  activeGroupsList: 'gs-tab[data-test-id=activeTab] #groupList gs-list',
  inactiveGroupsList: 'gs-tab[data-test-id=inactiveTab] #groupList gs-list',
  groupId: '#group_',
  groupNameList: 'gs-list a',
  activateGroupBtn: 'gs-button[data-test-id=activateBtn]',
  threeDotBtn: 'gs-button[data-test-id=detailsActionPanelBtn]',
  threeDotDuplicateBtn: 'gs-action-panel-option[data-test-id=action-duplicate]',
  threeDotDeactivateBtn: 'gs-action-panel-option[data-test-id=action-deactivate]',
  groupNameInput: 'gs-input-inline[data-test-id=name-input]',
  saveGroupBtn: 'gs-button[data-test-id=save-button]',
  discardGroupBtn: 'gs-button[data-test-id=discard-button]',
  newGroupBtn: 'gs-button[data-test-id=create-group]',
  selectRoleBtn: '*[data-test-id=section-role] *[data-test-id=add-entity]',
  AddDAPBtn: '*[data-test-id=section-dap] *[data-test-id=add-entity]',
  AddUsersBtn: '*[data-test-id=section-user] *[data-test-id=add-entity]',
  AddCompaniesBtn: '*[data-test-id=section-client] *[data-test-id=add-entity]',
  changeRoleBtn: '*[data-test-id=section-role] a',
  showAllUsersBtn: '*[data-test-id=section-user] gs-button[data-test-id=show-all]'
}

// These selectors are the ones from the l4 nav bar (right nav bar)
const groupsNavBarSelectors = {
  headerTitle: 'gs-container-l4 h4[data-test-id=title]',
  searchInput: 'gs-container-l4 input',
  entityCardId: 'gs-container-l4 gs-card[data-test-id=entity-',
  confirmBtn: 'gs-container-l4 gs-button[data-test-id=confirm-button]',
  dismissBtn: 'gs-container-l4 gs-button[data-test-id=dismiss-button]'
}

const groupsCardsSelectors = {
  roleCardId: '*[data-test-id=section-role] gs-card[data-test-id=entity-',
  DapCardId: '*[data-test-id=section-dap] gs-card[data-test-id=entity-',
  UsersCardId: '*[data-test-id=section-user] gs-card[data-test-id=entity-',
  CompaniesCardId: '*[data-test-id=section-client] gs-card[data-test-id=entity-'
}

const apiInterceptions = {
  groupsReloaded: '/api/Groups**/Clients'
}

class GroupManagementPage extends BasePage {
  /**
   * Checks if the current page is Group management URL
   */
  checkGroupManagementUrl() {
    this.checkUrl(properties.pageURL)
  }

  // --------------------------------------- GETS --------------------------------------------- //

  /**
   * Get a group by sending the group ID. It can be easily discovered in the Chrome/Firefox dev tools by accessing the elements tab
   *
   * @param {Number} groupId group id number
   *
   * @returns The group element
   */
  getGroupById(groupId) {
    return cy.get(selectors.groupId + groupId)
  }

  /**
   * Get a group by sending the group ID. It can be easily discovered in the Chrome/Firefox dev tools by accessing the elements tab
   *
   * @param {String} groupName group id number
   *
   * @returns The group element
   */
  getGroupByName(groupName) {
    cy.get(selectors.groupNameList).as('group')

    return cy.get('@group').filter(`:contains('${groupName}')`)
  }

  // --------------------------------------- CLICKS --------------------------------------------- //

  /**
   * Click in a group by sending the group ID. It can be easily discovered in the Chrome/Firefox dev tools by accessing the elements tab
   *
   * @param {Number} groupId group id number
   *
   * @returns The group element
   */
  clickGroup(groupId) {
    this.getGroupById(groupId).click()
  }

  /**
   * Click in the activate group button to activate a group
   */
  clickActivateGroupButton() {
    cy.get(selectors.activateGroupBtn).click()
  }

  // --------------------------------------- ASSERTIONS --------------------------------------------- //
  /**
   * Checks the amount of results displayed in the Users table after using the search engine
   *
   * @param {Number} results amount of people you want to check after a search
   *
   * @example 'results = 2 for '2 SEARCH RESULT(S)' being displayed in the table
   */
  assertAmountOfSearchResults(results) {
    this.assertNumberOfRecordsTable(selectors.numberOfSearchResultsInTable, results)
  }

  /**
   * Assert if the msg about no groups selected is displayed or not
   *
   * @param {Boolean} visible True to check if the state is visible, false otherwise
   */
  assertNoGroupSelectedMessageState(visible = true) {
    if (visible) {
      cy.get(selectors.noGroupSelectedMsg).should('be.visible')
    } else {
      cy.get(selectors.noGroupSelectedMsg).should('not.exist')
    }
  }

  /**
   * Assert the text saying "NO GROUPS FOUND" is visible when searching for a group that does not exist
   */
  assertNoGroupsFoundIsVisible() {
    cy.get(selectors.noGroupsFound).should('be.visible')
  }

  /**
   * Assert the search results list id displayed with the results highlighted. It also asserts that a Other Groups list is displayed
   *
   * @param {Array} groupsId Array containing the ids of the groups that are supposed to be displayed in the search result list.
   *
   * @example Send groupsId=[1] to assert if the group Global Admin Group was correctly found after using the search engine.
   */
  assertSearchResultGroups(groupsId) {
    cy.get(selectors.searchResultList).should('be.visible')

    for (let i = 0; i < groupsId.length; i++) {
      cy.get(selectors.searchResultList + ' ' + selectors.searchResultItem + groupsId[i])
        .should('be.visible')
        .invoke('attr', 'class')
        .should('contain', 'item-highlight ng-star-inserted') // assert it is highlighted
    }

    cy.get(selectors.otherGroupList).should('be.visible')
  }

  /**
   * Assert a list of groups is displayed under the correlated Active tab.
   */
  assertActiveGroupsAreDisplayed() {
    cy.get(selectors.activeGroupsList).should('be.visible')
  }

  /**
   * Assert a list of groups is displayed under the correlated Inactive tab.
   */
  assertInactiveGroupsAreDisplayed() {
    cy.get(selectors.inactiveGroupsList).should('be.visible')
  }

  /**
   * Assert the role is associated with the selected group
   *
   * @param {Number} roleId Role id number to assert the association with a selected group
   * @param {Boolean} displayed true to validate if the role is associated with the group, false otherwise
   */
  assertRoleAssociatedWithGroup(roleId, displayed = true) {
    if (displayed) {
      cy.get(groupsCardsSelectors.roleCardId + roleId).should('be.visible')
    } else {
      cy.get(groupsCardsSelectors.roleCardId + roleId).should('not.exist')
    }
  }

  /**
   * Assert if an user is associated with the selected group
   *
   * @param {Number} userId User Id
   * @param {Boolean} displayed True if you wants to assert the user is associated with the group, false otherwise
   * @param {Boolean} showAll True to click in the showAll buttons for the case where we have lots of users associated
   */
  assertUserAssociatedWithGroup(userId, displayed = true, showAll = false) {
    if (showAll) {
      cy.get(selectors.showAllUsersBtn).click()
    }

    if (displayed) {
      cy.get(groupsCardsSelectors.UsersCardId + userId)
        .scrollIntoView()
        .should('be.visible')
    } else {
      cy.get(groupsCardsSelectors.UsersCardId + userId).should('not.exist')
    }
  }

  /**
   * Assert if an client/company is associated with the selected group
   *
   * @param {Number} companyId Company/client id
   * @param {Boolean} displayed True if you wants to assert the client is associated with the group, false otherwise
   * @param {Boolean} showAll True to click in the showAll buttons for the case where we have lots of clients associated
   */
  assertCompanyAssociatedWithGroup(companyId, displayed = true, showAll = false) {
    if (showAll) {
      cy.get(selectors.showAllUsersBtn).click()
    }

    if (displayed) {
      cy.get(groupsCardsSelectors.CompaniesCardId + companyId)
        .scrollIntoView()
        .should('be.visible')
    } else {
      cy.get(groupsCardsSelectors.UsersCardId + companyId).should('not.exist')
    }
  }

  // ----------------------------------------------- OTHERS --------------------------------------------- //

  /**
   * Given I am in the main groups page over the Active tab, this method deactivates a group by sending the group id
   *
   * @param {Number} groupId group id number
   * @param {String} groupName group name
   */
  deactivateGroup(groupId, groupName) {
    this.selectTabByName('Active')
    this.clickGroup(groupId)
    cy.get(selectors.threeDotBtn).click()
    cy.get(selectors.threeDotDeactivateBtn).click()
    this.assertInactiveGroupsAreDisplayed()
    this.getGroupById(groupId).should('be.visible')
    this.assertToastNotificationMessageIsDisplayed(groupName + ' Deactivated')
  }

  /**
   * Given I am in the main groups page over the Active tab, this method actives a group by sending the group id
   *
   * @param {Number} groupId group id number
   * @param {String} groupName group name
   */
  activateGroup(groupId, groupName) {
    this.selectTabByName('Inactive')
    this.clickGroup(groupId)
    this.clickActivateGroupButton()
    this.assertActiveGroupsAreDisplayed()
    this.getGroupById(groupId).should('be.visible')
    this.assertToastNotificationMessageIsDisplayed(groupName + ' Activated')
  }

  /**
   * Given I am in the main groups page over the Active tab, this method duplicates a group by sending the group id
   *
   * @param {Number} groupId group id number
   * @param {String} groupName group name
   * @param {String} newNameForDuplicatedGroup group name to the new duplicated group
   */
  duplicateGroup(groupId, groupName, newNameForDuplicatedGroup) {
    this.selectTabByName('Active')
    this.clickGroup(groupId)
    cy.get(selectors.threeDotBtn).click()
    cy.get(selectors.threeDotDuplicateBtn).click()

    cy.get(selectors.groupNameInput).as('groupNameInput')
    cy.get('@groupNameInput').should('have.text', 'Copy of ' + groupName)
    cy.get('@groupNameInput').type(newNameForDuplicatedGroup)
    cy.get(selectors.saveGroupBtn).click()
    this.assertInactiveGroupsAreDisplayed()

    cy.intercept('GET', apiInterceptions.groupsReloaded).as('waitsTableReloads')
    cy.wait('@waitsTableReloads', { timeout: 10000 })

    this.assertToastNotificationMessageIsDisplayed(newNameForDuplicatedGroup + ' Saved')
    this.getGroupByName(newNameForDuplicatedGroup).should('be.visible')
  }

  /**
   * Modify a group name from a selected group
   *
   * @param {String} groupName Name of the group that is going to be created.
   */
  modifyGroupName(groupName) {
    cy.get(selectors.groupNameInput).as('groupNameInput')
    cy.get('@groupNameInput').should('have.text', 'New Group')
    cy.get('@groupNameInput').clear()
    cy.get('@groupNameInput').type(groupName)
  }

  /**
   * Select a role to a selected group
   *
   * @param {String} roleName Role name that is going to be added into this group.
   * @param {Number} roleId Role id number that is going to be added into this group.
   */
  selectRoleToGroup(roleName, roleId) {
    cy.get(selectors.selectRoleBtn).click()
    this.checkUrl('/select/role')

    cy.get(groupsNavBarSelectors.searchInput).type(roleName)
    cy.get(groupsNavBarSelectors.entityCardId + roleId).click()
    cy.get(groupsNavBarSelectors.confirmBtn).click()
  }

  /**
   * Add Daps to a selected group
   *
   * @param {Array} dapNames Array of name of data access profiles that are going to be added into this group.
   * @param {Array} dapIds Array of if of data access profiles that are going to be added into this group.
   *
   * @example
   * All dapNames and dapIds need to be placed in order.
   * For example: dapNames=['dap1', 'dap2'] needs to match the exactly order in dapIds=[1, 2]
   */
  addDapsToGroup(dapNames, dapIds) {
    cy.get(selectors.AddDAPBtn).click()
    this.checkUrl('/select/dap')

    for (let i = 0; i < dapNames.length; i++) {
      cy.get(groupsNavBarSelectors.searchInput).type(dapNames[i])
      cy.get(groupsNavBarSelectors.entityCardId + dapIds[i]).click()
      cy.get(groupsNavBarSelectors.searchInput).clear()
    }
    cy.get(groupsNavBarSelectors.confirmBtn).click()
  }

  /**
   * Add Users to a selected group
   *
   * @param {Array} userNames Array of names of users that are going to be added into this group.
   * @param {Array} userIds Array of ids of users that are going to be added into this group.
   *
   * @example
   * All userNames and userIds need to be placed in order.
   * For example: userNames=['user1', 'user2'] needs to match the exactly order in userIds=[1, 2]
   */
  addUsersToGroup(userNames, userIds) {
    cy.get(selectors.AddUsersBtn).click()
    this.checkUrl('/select/user')

    for (let i = 0; i < userNames.length; i++) {
      cy.get(groupsNavBarSelectors.searchInput).type(userNames[i])
      cy.get(groupsNavBarSelectors.entityCardId + userIds[i]).click()
      cy.get(groupsNavBarSelectors.searchInput).clear()
    }
    cy.get(groupsNavBarSelectors.confirmBtn).click()
  }

  /**
   * Add Companies to a selected group
   *
   * @param {Array} companyNames Array of names of companies that are going to be added into this group.
   * @param {Array} companyIds Array of ids of companies  that are going to be added into this group.
   *
   * @example
   * All companyNames and companyIds need to be placed in order.
   * For example: companyNames=['company1', 'company2'] needs to match the exactly order in companyIds=[1, 2]
   */
  addCompaniesToGroup(companyNames, companyIds) {
    cy.get(selectors.AddCompaniesBtn).click()
    this.checkUrl('/select/client')

    for (let i = 0; i < companyNames.length; i++) {
      cy.get(groupsNavBarSelectors.searchInput).type(companyNames[i])
      cy.get(groupsNavBarSelectors.entityCardId + companyIds[i]).click()
      cy.get(groupsNavBarSelectors.searchInput).clear()
    }
    cy.get(groupsNavBarSelectors.confirmBtn).click()
  }

  /**
   * Save all updates in the selected group by clicking in the Save button
   *
   * @param {String} toastNotificationMessage
   */
  saveGroupInformation(toastNotificationMessage) {
    cy.get(selectors.saveGroupBtn).click()
    this.assertToastNotificationMessageIsDisplayed(toastNotificationMessage)
  }

  /**
   * Discard all updates in the selected group by clicking in the Discard button
   */
  discardGroupInformation() {
    cy.get(selectors.discardGroupBtn).click()
    this.assertToastNotificationMessageIsDisplayed('', true)
  }

  /**
   * Given you are in the groups main page, create a group by calling this method
   *
   * @param {String} groupName Name of the group that is going to be created.
   * @param {String} roleName Role name that is going to be added into this group.
   * @param {Number} roleId Role id number that is going to be added into this group.
   * @param {Array} dapNames Array of name of data access profiles that are going to be added into this group.
   * @param {Array} dapIds Array of if of data access profiles that are going to be added into this group.
   * @param {Array} userNames Array of names of users that are going to be added into this group.
   * @param {Array} userIds Array of ids of users that are going to be added into this group.
   * @param {Array} companyNames Array of names of companies that are going to be added into this group.
   * @param {Array} companyIds Array of ids of companies  that are going to be added into this group.
   *
   * @example
   * All names and ids need to be placed in order for all parameters that it is applied.
   * For example: dapNames=['dap1', 'dap2'] needs to match the exactly order in dapIds=[1, 2]
   *
   */
  createGroup(groupName, roleName, roleId, dapNames, dapIds, userNames, userIds, companyNames, companyIds) {
    cy.get(selectors.newGroupBtn).click()

    this.modifyGroupName(groupName)

    if (roleName) {
      this.selectRoleToGroup(roleName, roleId)
    }

    if (dapNames.length > 0) {
      this.addDapsToGroup(dapNames, dapIds)
    }

    if (userNames.length > 0) {
      this.addUsersToGroup(userNames, userIds)
    }

    if (companyNames.length > 0) {
      this.addCompaniesToGroup(companyNames, companyIds)
    }

    this.saveGroupInformation(groupName + ' Saved')
  }
}

export default GroupManagementPage
