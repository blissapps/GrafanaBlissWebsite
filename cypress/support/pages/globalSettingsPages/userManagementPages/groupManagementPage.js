import BaseManagementPage from './baseManagementPage'

const properties = {
  pageURL: '/settings/group-management'
}

const selectors = {
  noGroupSelectedMsg: '#noGroupSelectedContainer div.content',
  activeGroupsList: 'gs-tab[data-test-id=activeTab] #groupList gs-list',
  inactiveGroupsList: 'gs-tab[data-test-id=inactiveTab] #groupList gs-list',
  groupId: '#group_',
  activateGroupBtn: 'gs-button[data-test-id=activateBtn]',
  threeDotBtn: 'gs-button[data-test-id=detailsActionPanelBtn]',
  threeDotDuplicateBtn: 'gs-action-panel-option[data-test-id=action-duplicate]',
  threeDotDeactivateBtn: 'gs-action-panel-option[data-test-id=action-deactivate]',
  groupNameInput: 'gs-input-inline[data-test-id=name-input]',
  newGroupBtn: 'gs-button[data-test-id=create-group]',
  selectRoleBtn: '*[data-test-id=section-role] *[data-test-id=add-entity]',
  AddDAPBtn: '*[data-test-id=section-dap] *[data-test-id=add-entity]',
  AddUsersBtn: '*[data-test-id=section-user] *[data-test-id=add-entity]',
  AddCompaniesBtn: '*[data-test-id=section-client] *[data-test-id=add-entity]',
  changeRoleBtn: '*[data-test-id=section-role] a',
  removeIconButton: 'gs-button[data-test-id=remove-entity]'
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
  dapsCardId: '*[data-test-id=section-dap] gs-card[data-test-id=entity-',
  usersCardId: '*[data-test-id=section-user] gs-card[data-test-id=entity-',
  companiesCardId: '*[data-test-id=section-client] gs-card[data-test-id=entity-',
  rolesAllCards: '*[data-test-id=section-role] gs-card',
  dapsAllCards: '*[data-test-id=section-dap] gs-card',
  usersAllCards: '*[data-test-id=section-user] gs-card',
  companiesAllCards: '*[data-test-id=section-client] gs-card',
  rolesRecordsCounter: '*[data-test-id=section-role] span.record-count',
  dapsRecordsCounter: '*[data-test-id=section-dap] span.record-count',
  usersRecordsCounter: '*[data-test-id=section-user] span.record-count',
  companiesRecordsCounter: '*[data-test-id=section-client] span.record-count'
}

const apiInterceptions = {
  groupsReloaded: '/api/Groups**/Clients'
}

class GroupManagementPage extends BaseManagementPage {
  /**
   * Checks if the current page is Group management URL
   */
  checkGroupManagementUrl() {
    this.checkUrl(properties.pageURL)
  }

  // --------------------------------------- GETS --------------------------------------------- //

  /**
   * Get a group by sending the group ID.
   *
   * @param {Number} groupId Group id number.
   *
   * @returns The group element
   */
  getGroupById(groupId) {
    return cy.get(selectors.groupId + groupId)
  }

  /**
   * Get a specific card of a selected group
   *
   * @param {String} sectionName Choose one of these: roles, daps, users, or companies
   * @param {Number} entityId Id number of the entity
   *
   * @returns The relative card of a role, dap, user, or client
   */
  getCardByEntityAndId(sectionName, entityId) {
    switch (sectionName) {
      case 'roles':
        return cy.get(groupsCardsSelectors.roleCardId + entityId)

      case 'daps':
        return cy.get(groupsCardsSelectors.dapsCardId + entityId)

      case 'users':
        return cy.get(groupsCardsSelectors.usersCardId + entityId)

      case 'companies':
        return cy.get(groupsCardsSelectors.companiesCardId + entityId)

      default:
        throw new Error('This section does not exists, choose among the following: roles, daps, users, or companies')
    }
  }

  // --------------------------------------- CLICKS --------------------------------------------- //

  /**
   * Click in a group by sending the group ID.
   *
   * @param {Number} groupId Group id number.
   *
   * @returns The group element
   */
  clickGroup(groupId) {
    this.getGroupById(groupId).click()
  }

  // --------------------------------------- ASSERTIONS --------------------------------------------- //
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
      this.getCardByEntityAndId('roles', roleId)
        .scrollIntoView()
        .should('be.visible')
    } else {
      this.getCardByEntityAndId('roles', roleId).should('not.exist')
    }
  }

  /**
   * Assert if an DAP is associated with the selected group
   *
   * @param {Number} dapId DAP Id
   * @param {Boolean} displayed True if you wants to assert the dap is associated with the group, false otherwise
   * @param {Boolean} showAll True to click in the showAll buttons for the case where we have lots of users associated
   */
  assertDapAssociatedWithGroup(dapId, displayed = true, showAll = false) {
    if (showAll) {
      this.clickShowAll('users')
    }

    if (displayed) {
      this.getCardByEntityAndId('daps', dapId)
        .scrollIntoView()
        .should('be.visible')
    } else {
      this.getCardByEntityAndId('daps', dapId).should('not.exist')
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
      this.clickShowAll('users')
    }

    if (displayed) {
      this.getCardByEntityAndId('users', userId)
        .scrollIntoView()
        .should('be.visible')
    } else {
      this.getCardByEntityAndId('users', userId).should('not.exist')
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
      this.clickShowAll('companies')
    }

    if (displayed) {
      this.getCardByEntityAndId('companies', companyId)
        .scrollIntoView()
        .should('be.visible')
    } else {
      this.getCardByEntityAndId('companies', companyId).should('not.exist')
    }
  }

  /**
   * Assert the amount of cards displayed in the group sections (roles, daps, users, or companies) is corrected
   *
   * @param {String} sectionName Choose one of these: roles, daps, users, or companies
   * @param {Number} amountOfCards Amount of cards supposed to be displayed in a group section
   */
  assertNumberOfCardsDisplayedInASection(sectionName, amountOfCards) {
    switch (sectionName) {
      case 'roles':
        cy.get(groupsCardsSelectors.rolesAllCards).should('have.length', amountOfCards)
        break

      case 'daps':
        cy.get(groupsCardsSelectors.dapsAllCards).should('have.length', amountOfCards)
        break

      case 'users':
        cy.get(groupsCardsSelectors.usersAllCards).should('have.length', amountOfCards)
        break

      case 'companies':
        cy.get(groupsCardsSelectors.companiesAllCards).should('have.length', amountOfCards)
        break

      default:
        throw new Error('This section does not exists, choose among the following: roles, daps, users, or companies')
    }
  }

  /**
   * Assert the number of records displayed in the group sections (roles, daps, users, or companies) is corrected
   *
   * @param {String} sectionName Choose one of these: roles, daps, users, or companies
   * @param {Number} numberOrRecords Amount of records supposed to be displayed in a group section
   */
  assertNumberOfRecordsInASection(sectionName, numberOrRecords) {
    switch (sectionName) {
      case 'roles':
        this.assertNumberOfRecordsTable(groupsCardsSelectors.rolesRecordsCounter, numberOrRecords)
        break

      case 'daps':
        this.assertNumberOfRecordsTable(groupsCardsSelectors.dapsRecordsCounter, numberOrRecords)
        break

      case 'users':
        this.assertNumberOfRecordsTable(groupsCardsSelectors.usersRecordsCounter, numberOrRecords)
        break

      case 'companies':
        this.assertNumberOfRecordsTable(groupsCardsSelectors.companiesRecordsCounter, numberOrRecords)
        break

      default:
        throw new Error('This section does not exists, choose among the following: roles, daps, users, or companies')
    }
  }

  // ----------------------------------------------- OTHERS --------------------------------------------- //

  /**
   * Inactive the selected group
   *
   */
  deactivateGroup() {
    cy.get(selectors.threeDotBtn).click()
    cy.get(selectors.threeDotDeactivateBtn).click()
  }

  /**
   * Active the selected group
   */
  activateGroup() {
    cy.get(selectors.activateGroupBtn).click()
  }

  /**
   * Duplicate the selected group and insert a new name on it.
   * Also, verify if the name of the group is 'Copy of ... ' as soon as it is duplicated
   *
   * @param {String} groupName Group name that is going to be duplicated
   * @param {String} newNameForDuplicatedGroup Group name to the new duplicated group
   */
  duplicateGroupAndAssertDefaultName(groupName, newNameForDuplicatedGroup) {
    cy.get(selectors.threeDotBtn).click()
    cy.get(selectors.threeDotDuplicateBtn).click()

    this.getEntityHeader().as('groupNameInput')
    cy.get('@groupNameInput').should('have.text', 'Copy of ' + groupName)
    cy.get('@groupNameInput').type(newNameForDuplicatedGroup)
    this.saveEntityInformation()

    this.waitTableReloads()
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

    this.modifyEntityName(groupName, 'New Group')

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

    this.saveEntityInformation()
    this.assertToastNotificationMessageIsDisplayed(groupName + ' Saved')
  }

  /**
   * Remove a role from a selected group
   *
   * @param {Number} roleId Role Id number that is going to be removed of the selected group.
   */
  removeRoleFromGroup(roleId) {
    cy.get(groupsCardsSelectors.roleCardId + roleId + '] ' + selectors.removeIconButton)
      .scrollIntoView()
      .click()
  }

  /**
   * Remove DAPs from a selected group
   *
   * @param {Array} dapIds Array of ids of daps that are going to be removed of the selected group.
   * @param {Boolean} showAll True to click in the showAll buttons for the case where we have lots of clients associated
   */
  removeDapsFromGroup(dapIds, showAll = false) {
    if (showAll) {
      this.clickShowAll('daps')
    }

    for (let i = 0; i < dapIds.length; i++) {
      cy.get(groupsCardsSelectors.dapsCardId + dapIds[i] + '] ' + selectors.removeIconButton)
        .scrollIntoView()
        .click()
    }
  }

  /**
   * Remove Users from a selected group
   *
   * @param {Array} userIds Array of ids of users that are going to be removed of the selected group.
   * @param {Boolean} showAll True to click in the showAll buttons for the case where we have lots of clients associated
   */
  removeUsersFromGroup(userIds, showAll = false) {
    if (showAll) {
      this.clickShowAll('users')
    }

    for (let i = 0; i < userIds.length; i++) {
      cy.get(groupsCardsSelectors.usersCardId + userIds[i] + '] ' + selectors.removeIconButton)
        .scrollIntoView()
        .click()
    }
  }

  /**
   * Remove Companies from a selected group
   *
   * @param {Array} companyIds Array of ids of companies that are going to be removed of the selected group.
   * @param {Boolean} showAll True to click in the showAll buttons for the case where we have lots of clients associated
   */
  removeCompaniesFromGroup(companyIds, showAll = false) {
    if (showAll) {
      this.clickShowAll('companies')
    }

    for (let i = 0; i < companyIds.length; i++) {
      cy.get(groupsCardsSelectors.companiesCardId + companyIds[i] + '] ' + selectors.removeIconButton)
        .scrollIntoView()
        .click()
    }
  }

  // ---------------------------------------  INTERCEPTIONS --------------------------------------------- //
  waitTableReloads() {
    cy.intercept('GET', apiInterceptions.groupsReloaded).as('waitsTableReloads')
    cy.wait('@waitsTableReloads', { timeout: 10000 })
  }
}

export default GroupManagementPage
