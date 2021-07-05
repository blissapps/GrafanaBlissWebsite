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
  saveGroupBtn: 'gs-button[data-test-id=save-button]'
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

    cy.get(selectors.saveGroupBtn).click() // bug in here

    // this.assertInactiveGroupsAreDisplayed() // bug in here

    cy.intercept('GET', apiInterceptions.groupsReloaded).as('waitsTableReloads')
    cy.wait('@waitsTableReloads', { timeout: 10000 })

    this.assertToastNotificationMessageIsDisplayed(newNameForDuplicatedGroup + ' Saved')
    this.getGroupByName(newNameForDuplicatedGroup).should('be.visible')
  }
}

export default GroupManagementPage
