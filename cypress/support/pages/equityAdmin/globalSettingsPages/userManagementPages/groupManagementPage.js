import BaseManagementPage from './baseManagementPage'
import SelectSettingsL4Page from './selectSettingsL4Page'

// Pages used
const selectSettingsL4Page = new SelectSettingsL4Page()

const properties = {
  pageURL: '/settings/group-management'
}

const selectors = {
  noGroupSelectedMsg: '#noGroupSelectedContainer div.content',
  activeGroupsList: 'gs-tab[data-test-id=activeTab] #groupList gs-list',
  inactiveGroupsList: 'gs-tab[data-test-id=inactiveTab] #groupList gs-list',
  noGroupsExistMessage: '#emptyContainer',
  groupId: '#group_',
  activateGroupBtn: 'gs-button[data-test-id=activateBtn]',
  groupNameInput: 'gs-input-inline[data-test-id=name-input]',
  newGroupBtn: 'gs-button[data-test-id=create-group]',
  selectRoleBtn: '*[data-test-id=section-role] *[data-test-id=add-entity]',
  addDAPBtn: '*[data-test-id=section-dap] *[data-test-id=add-entity]',
  addUsersBtn: '*[data-test-id=section-user] *[data-test-id=add-entity]',
  addCompaniesBtn: '*[data-test-id=section-client] *[data-test-id=add-entity]',
  changeRoleBtn: '*[data-test-id=section-role] a',
  removeIconButton: 'gs-button[data-test-id=remove-entity]',
  groupPageHeader: '#groupMgmtHeader'
}

// These selectors are the ones from the cards
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
  companiesRecordsCounter: '*[data-test-id=section-client] span.record-count',
  rolesSearchResultsCounter: '*[data-test-id=section-role] .search-label',
  dapsSearchResultsCounter: '*[data-test-id=section-dap] .search-label',
  usersSearchResultsCounter: '*[data-test-id=section-user] .search-label',
  companiesSearchResultsCounter: '*[data-test-id=section-client] .search-label'
}

class GroupManagementPage extends BaseManagementPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }

  // --------------------------------------------------------------------------------------- GETS ---------------------------------------------------------------------------- //

  /**
   * Get a group by sending the group ID.
   *
   * @param {number} groupId Group id number.
   *
   * @returns The group element
   */
  getGroupById(groupId) {
    return cy.get(selectors.groupId + groupId)
  }

  /**
   * Get a specific card of a selected group
   *
   * @param {string} sectionName Choose one of these: roles, daps, users, or companies
   * @param {number} entityId Id number of the entity
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

  // ----------------------------------------------------------------------------- CLICKS --------------------------------------------------------------------------------- //

  /**
   * Click in a group by sending the group ID.
   *
   * @param {number} groupId Group id number.
   *
   * @returns The group element
   */
  clickGroupById(groupId) {
    this.getGroupById(groupId).click()
    this.scrollToEntityTop()
  }

  /**
   * Click in the Add groups button and nothing else. You may be looking for the addGroupsToDap method that does everything in a single method
   */
  clickAddDapsToGroup() {
    cy.get(selectors.addDAPBtn).scrollIntoView().click()
  }

  // --------------------------------------------------------------------------- ASSERTIONS ------------------------------------------------------------------------------ //

  /**
   * Assert the page header 'Groups' is displayed. It may be useful to guarantee the Groups page is the correct one being displayed.
   *
   * @param {string} headerText Send a text if you want to validate the text in the header. Send '' to skip the text validation.
   * @param {boolean} displayed True is the default value to assert the header is displayed. Send false to validate the otherwise
   */
  assertGroupPageHeaderIsDisplayed(headerText = '', displayed = true) {
    if (displayed) {
      cy.get(selectors.groupPageHeader).should('be.visible')

      if (headerText !== '') {
        cy.get(selectors.groupPageHeader).should('have.text', headerText)
      }
    } else {
      cy.get(selectors.groupPageHeader).should('not.exist')
    }
  }

  /**
   * Assert if the msg about no groups selected is displayed or not
   *
   * @param {boolean} displayed True to check if the message is visible, false otherwise
   */
  assertNoGroupSelectedMessageDisplayed(displayed = true) {
    if (displayed) {
      cy.get(selectors.noGroupSelectedMsg).should('be.visible')
    } else {
      cy.get(selectors.noGroupSelectedMsg).should('not.exist')
    }
  }

  /**
   * Assert a list of groups is displayed under the correlated Active tab.
   *
   * @param {boolean} displayed True to check if there is one or more groups being displayed in the Active Tab, false otherwise
   */
  assertActiveGroupsAreDisplayed(displayed = true) {
    displayed ? cy.get(selectors.activeGroupsList).should('be.visible') : cy.get(selectors.activeGroupsList).should('not.exist')
  }

  /**
   * Assert a list of groups is displayed under the correlated Inactive tab.
   *
   * @param {boolean} displayed True to check if there is one or more groups being displayed in the Inactive Tab, false otherwise
   */
  assertInactiveGroupsAreDisplayed(displayed = true) {
    displayed ? cy.get(selectors.inactiveGroupsList).should('be.visible') : cy.get(selectors.inactiveGroupsList).should('not.exist')
  }

  /**
   * Assert the role is associated with the selected group
   *
   * @param {number} roleId Role id number to assert the association with a selected group
   * @param {boolean} displayed true to validate if the role is associated with the group, false otherwise
   */
  assertRoleAssociatedWithGroup(roleId, displayed = true) {
    if (displayed) {
      this.getCardByEntityAndId('roles', roleId).scrollIntoView().should('be.visible')
    } else {
      this.getCardByEntityAndId('roles', roleId).should('not.exist')
    }
  }

  /**
   * Assert if an DAP is associated with the selected group
   *
   * @param {number} dapId DAP Id
   * @param {boolean} displayed True if you want to assert the dap is associated with the group, false otherwise
   * @param {boolean} showAll True to click in the showAll buttons for the case where we have lots of users associated
   */
  assertDapAssociatedWithGroup(dapId, displayed = true, showAll = false) {
    if (showAll) {
      this.clickShowAll('users')
    }

    if (displayed) {
      this.getCardByEntityAndId('daps', dapId).scrollIntoView().should('be.visible')
    } else {
      this.getCardByEntityAndId('daps', dapId).should('not.exist')
    }
  }

  /**
   * Assert if an user is associated with the selected group
   *
   * @param {number} userId User Id
   * @param {boolean} displayed True if you want to assert the user is associated with the group, false otherwise
   * @param {boolean} showAll True to click in the showAll buttons for the case where we have lots of users associated
   */
  assertUserAssociatedWithGroup(userId, displayed = true, showAll = false) {
    if (showAll) {
      this.clickShowAll('users')
    }

    if (displayed) {
      this.getCardByEntityAndId('users', userId).scrollIntoView().should('be.visible')
    } else {
      this.getCardByEntityAndId('users', userId).should('not.exist')
    }
  }

  /**
   * Assert if an client/company is associated with the selected group
   *
   * @param {number} companyId Company/client id
   * @param {boolean} displayed True if you want to assert the client is associated with the group, false otherwise
   * @param {boolean} showAll True to click in the showAll buttons for the case where we have lots of clients associated
   */
  assertCompanyAssociatedWithGroup(companyId, displayed = true, showAll = false) {
    if (showAll) {
      this.clickShowAll('companies')
    }

    if (displayed) {
      this.getCardByEntityAndId('companies', companyId).scrollIntoView().should('be.visible')
    } else {
      this.getCardByEntityAndId('companies', companyId).should('not.exist')
    }
  }

  /**
   * Assert if the amount of cards displayed in a section (roles, daps, users, or companies) is corrected
   *
   * @param {string} sectionName Choose one of these: roles, daps, users, or companies
   * @param {number} amountOfCards Amount of cards supposed to be displayed in a group section
   * @param {boolean} showAll False to not click in the showAll in case it is not displayed. True otherwise
   */
  assertNumberOfCardsDisplayedInASection(sectionName, amountOfCards, showAll = false) {
    // clicks in show all in case we have lots of cards
    if (showAll) {
      this.clickShowAll(sectionName)
    }

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
   * Assert the number of records displayed in the group sections (roles, daps, users, or companies) is correct
   *
   * @param {string} sectionName Choose one of these: roles, daps, users, or companies
   * @param {number} numberOrRecords Amount of records supposed to be displayed in a group section
   */
  assertNumberOfRecordsInASection(sectionName, numberOrRecords) {
    switch (sectionName) {
      case 'roles':
        this.assertNumberOfRecordsDisplayed(groupsCardsSelectors.rolesRecordsCounter, numberOrRecords)
        break

      case 'daps':
        this.assertNumberOfRecordsDisplayed(groupsCardsSelectors.dapsRecordsCounter, numberOrRecords)
        break

      case 'users':
        this.assertNumberOfRecordsDisplayed(groupsCardsSelectors.usersRecordsCounter, numberOrRecords)
        break

      case 'companies':
        this.assertNumberOfRecordsDisplayed(groupsCardsSelectors.companiesRecordsCounter, numberOrRecords)
        break

      default:
        throw new Error('This section does not exists, choose among the following: roles, daps, users, or companies')
    }
  }

  /**
   * Assert the number of search results displayed in the group sections (roles, daps, users, or companies) is correct.
   * This number is shown right after a searching over the search engine. The result follows this format: "X SEARCH RESULT(S)"
   *
   * @param {string} sectionName Choose one of these: roles, daps, users, or companies.
   * @param {any} numberOfSearchResults Amount of search results supposed to be displayed in a group section. For "NO MATCHING USERS FOUND", send 'No'.
   *
   * @example
   * assertNumberOfSearchResultsInASection('roles', 1) => Assert "1 SEARCH RESULT(S)" is being displayed in Roles
   * assertNumberOfSearchResultsInASection('daps', 2) Assert "2 SEARCH RESULT(S)" is being displayed in Data Access Profiles
   * assertNumberOfSearchResultsInASection('users', 'No') Assert "NO MATCHING USERS FOUND" is being displayed in Users
   * assertNumberOfSearchResultsInASection('users', 'No') Assert "NO MATCHING CLIENTS FOUND" is being displayed in Companies
   */
  assertNumberOfSearchResultsInASection(sectionName, numberOfSearchResults) {
    switch (sectionName) {
      case 'roles':
        this.assertNumberOfRecordsDisplayed(groupsCardsSelectors.rolesSearchResultsCounter, numberOfSearchResults)
        break

      case 'daps':
        this.assertNumberOfRecordsDisplayed(groupsCardsSelectors.dapsSearchResultsCounter, numberOfSearchResults)
        break

      case 'users':
        this.assertNumberOfRecordsDisplayed(groupsCardsSelectors.usersSearchResultsCounter, numberOfSearchResults)
        break

      case 'companies':
        this.assertNumberOfRecordsDisplayed(groupsCardsSelectors.companiesSearchResultsCounter, numberOfSearchResults)
        break

      default:
        throw new Error('This section does not exists, choose among the following: roles, daps, users, or companies')
    }
  }

  /**
   * Assert if the button "change role" is available
   *
   * @param {boolean} displayed True if you want to assert the button is displayed, false otherwise
   */
  assertChangeRoleButtonDisplayed(displayed = true) {
    displayed ? cy.get(selectors.changeRoleBtn).should('be.visible') : cy.get(selectors.changeRoleBtn).should('not.exist')
  }

  /**
   * Assert if the button "Add data access profiles" is available
   *
   * @param {boolean} displayed True if you want to assert the button is displayed, false otherwise
   */
  assertAddDapsButtonDisplayed(displayed = true) {
    displayed ? cy.get(selectors.addDAPBtn).should('be.visible') : cy.get(selectors.addDAPBtn).should('not.exist')
  }

  /**
   * Assert if the button "Add Users" is available
   *
   * @param {boolean} displayed True if you want to assert the button is displayed, false otherwise
   */
  assertAddUsersButtonDisplayed(displayed = true) {
    displayed ? cy.get(selectors.addUsersBtn).should('be.visible') : cy.get(selectors.addUsersBtn).should('not.exist')
  }

  /**
   * Assert if the button "Add companies" is available
   *
   * @param {boolean} displayed True if you want to assert the button is displayed, false otherwise
   */
  assertAddCompaniesButtonDisplayed(displayed = true) {
    displayed ? cy.get(selectors.addCompaniesBtn).should('be.visible') : cy.get(selectors.addCompaniesBtn).should('not.exist')
  }

  /**
   * Assert if the option to remove a role is available by checking if the remove role button is displayed or not
   *
   * @param {number} roleId Role id number to verify if the remove button appears on it
   * @param {boolean} displayed True if you want to assert the button is displayed, false otherwise
   */
  assertRemoveRoleOptionIsDisplayed(roleId, displayed = true) {
    displayed
      ? cy.get(groupsCardsSelectors.roleCardId + roleId + '] ' + selectors.removeIconButton).should('exist')
      : cy.get(groupsCardsSelectors.roleCardId + roleId + '] ' + selectors.removeIconButton).should('not.exist')
  }

  /**
   * Assert if the option to remove a dap is available by checking if the remove dap button is displayed or not
   *
   * @param {number} dapId DAP id number to verify if the remove button appears on it
   * @param {boolean} displayed True if you want to assert the button is displayed, false otherwise
   */
  assertRemoveDapOptionIsDisplayed(dapId, displayed = true) {
    displayed
      ? cy.get(groupsCardsSelectors.dapsCardId + dapId + '] ' + selectors.removeIconButton).should('exist')
      : cy.get(groupsCardsSelectors.dapsCardId + dapId + '] ' + selectors.removeIconButton).should('not.exist')
  }

  /**
   * Assert if the option to remove a user is available by checking if the remove user button is displayed or not
   *
   * @param {number} userId User id number to verify if the remove button appears on it
   * @param {boolean} displayed True if you want to assert the button is displayed, false otherwise
   */
  assertRemoveUserOptionIsDisplayed(userId, displayed = true) {
    displayed
      ? cy.get(groupsCardsSelectors.usersCardId + userId + '] ' + selectors.removeIconButton).should('exist')
      : cy.get(groupsCardsSelectors.usersCardId + userId + '] ' + selectors.removeIconButton).should('not.exist')
  }

  /**
   * Assert if the option to remove a company is available by checking if the remove company button is displayed or not
   *
   * @param {number} companyId Company id number to verify if the remove button appears on it
   * @param {boolean} displayed True if you want to assert the button is displayed, false otherwise
   */
  assertRemoveCompanyOptionIsDisplayed(companyId, displayed = true) {
    displayed
      ? cy.get(groupsCardsSelectors.companiesCardId + companyId + '] ' + selectors.removeIconButton).should('exist')
      : cy.get(groupsCardsSelectors.companiesCardId + companyId + '] ' + selectors.removeIconButton).should('not.exist')
  }

  /**
   * Assert the message "There are no groups" is displayed when there is no data displayed
   */
  assertNoGroupExistMessageIsDisplayed() {
    cy.get(selectors.noGroupsExistMessage).should('be.visible')
  }

  /**
   * Assert the 'New group' button is displayed or not
   *
   * @param {boolean} displayed True is the default value to assert the button is displayed. False otherwise
   */
  assertCreateNewGroupButtonDisplayed(displayed = true) {
    displayed ? cy.get(selectors.newGroupBtn).should('be.visible') : cy.get(selectors.newGroupBtn).should('not.exist')
  }

  // -------------------------------------------------------------------------------------- OTHERS ---------------------------------------------------------------------------- //

  /**
   * Activate the selected group
   */
  activateGroup() {
    cy.get(selectors.activateGroupBtn).click()
  }

  /**
   * Select a role to a selected group
   *
   * @param {string} roleName Role name that is going to be added into this group.
   * @param {number} roleId Role id number that is going to be added into this group.
   */
  selectRoleToGroup(roleName, roleId) {
    cy.get(selectors.selectRoleBtn).click()
    selectSettingsL4Page.selectSettings('role', [roleName], [roleId])
    selectSettingsL4Page.clickToConfirmTheSelections()
  }

  /**
   * Add Daps to a selected group
   *
   * @param {string[]} dapNames Array of name of data access profiles that are going to be added into this group.
   * @param {number[]} dapIds Array of id of data access profiles that are going to be added into this group.
   *
   * @example
   * All dapNames and dapIds need to be placed in order.
   * For example: dapNames=['dap1', 'dap2'] needs to match the exactly order in dapIds=[1, 2]
   */
  addDapsToGroup(dapNames, dapIds) {
    this.clickAddDapsToGroup()
    selectSettingsL4Page.selectSettings('dap', dapNames, dapIds)
    selectSettingsL4Page.clickToConfirmTheSelections()
  }

  /**
   * Add Users to a selected group
   *
   * @param {string[]} userNames Array of names of users that are going to be added into this group.
   * @param {number[]} userIds Array of ids of users that are going to be added into this group.
   *
   * @example
   * All userNames and userIds need to be placed in order.
   * For example: userNames=['user1', 'user2'] needs to match the exactly order in userIds=[1, 2]
   */
  addUsersToGroup(userNames, userIds) {
    cy.get(selectors.addUsersBtn).click()
    selectSettingsL4Page.selectSettings('user', userNames, userIds)
    selectSettingsL4Page.clickToConfirmTheSelections()
  }

  /**
   * Add Companies to a selected group
   *
   * @param {string[]} companyNames Array of names of companies that are going to be added into this group.
   * @param {number[]} companyIds Array of ids of companies  that are going to be added into this group.
   *
   * @example
   * All companyNames and companyIds need to be placed in order.
   * For example: companyNames=['company1', 'company2'] needs to match the exactly order in companyIds=[1, 2]
   */
  addCompaniesToGroup(companyNames, companyIds) {
    cy.get(selectors.addCompaniesBtn).click()
    selectSettingsL4Page.selectSettings('client', companyNames, companyIds)
    selectSettingsL4Page.clickToConfirmTheSelections()
  }

  /**
   * Given you are in the groups main page, create a group by calling this method
   *
   * @param {string} groupName Name of the group that is going to be created.
   * @param {string} roleName Role name that is going to be added into this group.
   * @param {number} roleId Role id number that is going to be added into this group.
   * @param {string[]} dapNames Array of name of data access profiles that are going to be added into this group.
   * @param {number[]} dapIds Array of if of data access profiles that are going to be added into this group.
   * @param {string[]} userNames Array of names of users that are going to be added into this group.
   * @param {number[]} userIds Array of ids of users that are going to be added into this group.
   * @param {string[]} companyNames Array of names of companies that are going to be added into this group.
   * @param {number[]} companyIds Array of ids of companies  that are going to be added into this group.
   * @param {boolean} saveChanges In case you send false, the new group information will be filled out but it will not be saved
   *
   * @example
   * All names and ids need to be placed in order for all parameters that it is applied.
   * For example: dapNames=['dap1', 'dap2'] needs to match the exactly order in dapIds=[1, 2]
   *
   */
  createGroup(groupName, roleName = '', roleId = 0, dapNames = [], dapIds = [], userNames = [], userIds = [], companyNames = [], companyIds = [], saveChanges = true) {
    // ********* Validating if the data is consistent *********** //
    // DAPs
    if (dapNames.length === dapIds.length) {
      cy.log('Daps are valid, moving on...')
    } else {
      throw new Error('Dap names and Dap ids need to have the same length')
    }
    // Users
    if (userNames.length === userIds.length) {
      cy.log('Users are valid, moving on...')
    } else {
      throw new Error('User names and User ids need to have the same length')
    }
    // Companies
    if (companyNames.length === companyIds.length) {
      cy.log('Companies are valid, moving on...')
    } else {
      throw new Error('Company names and Company ids need to have the same length')
    }

    cy.log('All necessary data looks good, moving forward to group creation')
    cy.get(selectors.newGroupBtn).click()

    // Make sure the default value is 'New Group' before renaming it
    this.assertEntityHeaderIsDisplayedAsExpected('New Group')
    this.modifyEntityName(groupName)

    if (roleName !== '' && roleId !== 0) {
      this.selectRoleToGroup(roleName, roleId)
    }

    if (dapNames.length > 0 && dapIds.length > 0) {
      this.addDapsToGroup(dapNames, dapIds)
    }

    if (userNames.length > 0 && userIds.length > 0) {
      this.addUsersToGroup(userNames, userIds)
    }

    if (companyNames.length > 0 && companyIds.length > 0) {
      this.addCompaniesToGroup(companyNames, companyIds)
    }

    saveChanges ? this.saveEntityInformation() : null
  }

  /**
   * Remove a role from a selected group
   *
   * @param {number} roleId Role Id number that is going to be removed of the selected group.
   */
  removeRoleFromGroup(roleId) {
    cy.get(groupsCardsSelectors.roleCardId + roleId + '] ' + selectors.removeIconButton)
      .scrollIntoView()
      .click()
  }

  /**
   * Remove DAPs from a selected group
   *
   * @param {number[]} dapIds Array of ids of daps that are going to be removed of the selected group.
   * @param {boolean} showAll True to click in the showAll buttons for the case where we have lots of daps associated
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
   * @param {number[]} userIds Array of ids of users that are going to be removed of the selected group.
   * @param {boolean} showAll True to click in the showAll buttons for the case where we have lots of users associated
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
   * @param {number[]} companyIds Array of ids of companies that are going to be removed of the selected group.
   * @param {boolean} showAll True to click in the showAll buttons for the case where we have lots of clients associated
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
}

export default GroupManagementPage
