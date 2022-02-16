import BasePage from '../../../basePage'

const selectors = {
  numberOfSearchResultsInTable: '#recordCount',
  searchResultList: 'gs-list[data-test-id=searchListing-found]',
  searchResultItem: '#searchResultItem_',
  searchResultAllItemsHighlighted: '*[id*="searchResultItem_"] gs-highlighted-text mark:not(:empty)',
  otherGroupList: 'gs-list[data-test-id=searchListing-other]',
  otherItem: '#otherItem_',
  noResultsFound: '#emptyRecordCount',
  noRecordsFoundEmptyState: 'gs-empty-container .content > div',
  entityNameInput: 'gs-input-inline[data-test-id=name-input]',
  saveBtn: 'gs-button[data-test-id=save-button]',
  discardBtn: 'gs-button[data-test-id=discard-button]',
  showAllDapsBtn: '*[data-test-id=section-dap] gs-button[data-test-id=show-all]',
  showAllUsersBtn: '*[data-test-id=section-user] gs-button[data-test-id=show-all]',
  showAllCompaniesBtn: '*[data-test-id=section-client] gs-button[data-test-id=show-all]',
  showAllGroupsBtn: '*[data-test-id=section-group] gs-button[data-test-id=show-all]',
  hideDapsBtn: '*[data-test-id=section-dap] gs-button[data-test-id=hide]',
  hideUsersBtn: '*[data-test-id=section-user] gs-button[data-test-id=hide]',
  hideCompaniesBtn: '*[data-test-id=section-client] gs-button[data-test-id=hide]',
  hideGroupsBtn: '*[data-test-id=section-group] gs-button[data-test-id=hide]',
  entityNameInList: 'gs-list a',
  threeDotBtn: 'gs-button[data-test-id=detailsActionPanelBtn]',
  threeDotDuplicateBtn: 'gs-action-panel-option[data-test-id=action-duplicate]',
  threeDotDeactivateBtn: 'gs-action-panel-option[data-test-id=action-deactivate]',
  activeTab: '.tabs-bar #Active',
  inactiveTab: '.tabs-bar #Inactive',
  viewOnlyStatusBadge: 'div .status gs-badge'
}

// These selectors are the ones from the l4 nav bar (right nav bar)
const groupsNavBarSelectors = {
  headerTitle: 'gs-container-l4 h4[data-test-id=title]',
  searchInput: 'gs-container-l4 input',
  entityCardId: 'gs-container-l4 gs-card[data-test-id=entity-',
  confirmBtn: 'gs-container-l4 gs-button[data-test-id=confirm-button]',
  dismissBtn: 'gs-container-l4 gs-button[data-test-id=dismiss-button]'
}

/**
 *
 * This class is a common page for all common methods and/or locators over User Management, Group Management, Role Management, and Data Access Profiles.
 *
 */
class BaseManagementPage extends BasePage {
  // ------------------------------------------------------- GETS ---------------------------------------------------------------------- //
  /**
   * Get the entity (group role, or dap) header element of a selected entity
   *
   * @returns Entity header
   */
  getEntityHeader() {
    return cy.get(selectors.entityNameInput).scrollIntoView()
  }

  /**
   * Get a entity by its name while sending the entity name.
   *
   * @param {string} entityName Entity name.
   * @param {boolean} displayed True to assert the entity is displayed by name in the list of entities. False otherwise.
   *
   * @returns The entity element located in the entity list
   */
  getEntityByName(entityName, displayed = true) {
    if (displayed) {
      cy.get(selectors.entityNameInList).as('entity')

      return cy.get('@entity').filter(`:contains('${entityName}')`)
    } else {
      return cy.get(selectors.entityNameInList).filter(`:contains('${entityName}')`).should('not.exist')
    }
  }

  // ------------------------------------------------------- CLICKS ---------------------------------------------------------------------- //

  /**
   * Click in the Show All button of a given entity/section
   *
   * @param {string} entity It can be 'daps', 'users', 'companies', or 'groups'
   */
  clickShowAll(entity) {
    switch (entity) {
      case 'daps':
        cy.get(selectors.showAllDapsBtn).as('showAllButton')
        break

      case 'users':
        cy.get(selectors.showAllUsersBtn).as('showAllButton')
        break

      case 'companies':
        cy.get(selectors.showAllCompaniesBtn).as('showAllButton')
        break

      case 'groups':
        cy.get(selectors.showAllGroupsBtn).as('showAllButton')
        break

      default:
        throw new Error('This section does not exists, choose among the following: daps, users, or companies')
    }

    cy.get('@showAllButton').scrollIntoView().should('contain.text', 'Show all').click()
  }

  /**
   * Click in the Hide button of a given entity/section
   *
   * @param {string} entity It can be 'daps', 'users', 'companies', or 'groups'
   */
  clickHide(entity) {
    switch (entity) {
      case 'daps':
        cy.get(selectors.hideDapsBtn).as('hideButton')
        break

      case 'users':
        cy.get(selectors.hideUsersBtn).as('hideButton')
        break

      case 'companies':
        cy.get(selectors.hideCompaniesBtn).as('hideButton')
        break

      case 'groups':
        cy.get(selectors.hideGroupsBtn).as('hideButton')
        break

      default:
        throw new Error('This section does not exists, choose among the following: daps, users, or companies')
    }

    cy.get('@hideButton').scrollIntoView().should('contain.text', 'Hide').click()
  }

  /**
   * Click in a entity in the list of entities by sending the entity name
   *
   * @param {string} entityName name of the entity to be clicked
   */
  clickEntityByName(entityName) {
    this.getEntityByName(entityName).scrollIntoView().click()
  }

  /**
   * Click in the 3 dot button located in the right top of a selected entity
   */
  clickThreeDotOptionButton() {
    cy.get(selectors.threeDotBtn).click()
  }

  /**
   * Click to duplicate a selected entity
   */
  clickToDuplicateEntity() {
    this.clickThreeDotOptionButton()
    cy.get(selectors.threeDotDuplicateBtn).click()
  }

  /**
   * Click to deactivate a selected entity
   */
  clickToDeactivateEntity() {
    this.clickThreeDotOptionButton()
    cy.get(selectors.threeDotDeactivateBtn).click()
  }

  /**
   * Click in the active or inactive tabs over all the settings
   *
   * @param {string} tabName Tab name to click. It can be 'active' or 'inactive'
   */
  clickTab(tabName) {
    tabName = tabName.toLowerCase()

    switch (tabName) {
      case 'active':
        cy.get(selectors.activeTab).click()
        break

      case 'inactive':
        cy.get(selectors.inactiveTab).click()
        break

      default:
        throw new Error('Option invalid. Tabs for settings can be either "active" or "inactive"')
    }
  }

  // --------------------------------------------------------- ASSERTIONS ------------------------------------------------------------------ //

  /**
   * Assert if the entity header/name is displayed. Also, asserts its content if the parameter headerText is sent
   *
   * @param {string} headerText Send the name of the header if you want to validate the header content. SEND NOTHING to skip the validation of the content
   * and just validate that the header is displayed
   */
  assertEntityHeaderIsDisplayedAsExpected(headerText = '') {
    this.getEntityHeader().as('header')

    cy.get('@header').should('be.visible')

    if (headerText != '') {
      cy.get('@header').should('contain.text', headerText)
    }
  }

  /**
   * Assert the amount of results displayed in the Search Results list, after using the search engine
   *
   * @param {number} results amount of results you want to check after a search
   *
   * @example Send 'results = 2' to validate the '2 SEARCH RESULT(S)' is being displayed in the Search Results list
   */
  assertAmountOfSearchResultsInTheList(results) {
    this.assertNumberOfRecordsDisplayed(selectors.numberOfSearchResultsInTable, results)
  }

  /**
   * Assert if the OTHER GROUP list is displayed right after searching for an entity in the search bar
   *
   * @param {boolean} displayed True is default value to make sure the OTHER GROUP list is displayed. False to assert otherwise
   */
  assertOtherGroupListDisplayed(displayed = true) {
    displayed ? cy.get(selectors.otherGroupList).should('be.visible') : cy.get(selectors.otherGroupList).should('not.exist')
  }

  /**
   * Assert the Search Results list is displayed with the given ids.
   *
   * @param {array} entityId Array containing the ids of groups, roles, or daps that are supposed to be displayed in the search result list.
   *
   * @example Send entityId=[1] to assert if the group with id 1 was correctly found in the results list, after using the search engine.
   */
  assertSearchResultListAccuracy(entityId) {
    cy.get(selectors.searchResultList).should('be.visible')

    for (let i = 0; i < entityId.length; i++) {
      cy.get(selectors.searchResultList + ' ' + selectors.searchResultItem + entityId[i]).should('be.visible')
    }
  }

  /**
   * Assert a text saying "NO '$entity' FOUND" is visible when searching for a group, role, or dap that does not exist
   */
  assertNoResultFoundIsVisible() {
    cy.get(selectors.noResultsFound).should('be.visible')
  }

  /**
   * Assert if the message in the gs-empty-container, regarding a empty state (when no data is loaded), is displayed
   *
   * @param {boolean} visible True to check if the state is visible, false otherwise
   */
  assertEmptyStateMessageIsVisible(visible = true) {
    if (visible) {
      cy.get(selectors.noRecordsFoundEmptyState).should('be.visible')
    } else {
      cy.get(selectors.noRecordsFoundEmptyState).should('not.exist')
    }
  }

  /**
   * Assert a entity is displayed under the entity list. Entities can be 'roles', 'daps', or 'groups' (not applied for users)
   *
   * @param {string} entityName Entity name
   * @param {boolean} displayed True is the default to assert the entity is displayed. False otherwise.
   */
  assertEntityIsDisplayedInTheList(entityName, displayed = true) {
    if (displayed) {
      this.getEntityByName(entityName).scrollIntoView().should('be.visible')
    } else {
      this.getEntityByName(entityName, displayed).should('not.exist')
    }
  }

  /**
   * Assert the entity is being focused by checking the entity name
   *
   * @param {boolean} focused True is default to validate if the entity is focused. False, otherwise.
   */
  assertEntityIsFocused(focused = true) {
    this.assertElementIsFocused(selectors.entityNameInput, focused)
  }

  /**
   * Assert a card is being highlighted displayed. It usually happens after searching for it in the search bar
   *
   * @param {array} entitiesIds Entities ids to be verified. This is how this method locates the cards
   * @param {string} entityType If this card is a role, dap, user, group, or company
   * @param {boolean} showAll False is the default value to NOT click in the 'show all button'. Sent True to click in the 'show all' button in case there are many entities
   */
  assertCardsDisplayedInHighlightedMode(entitiesIds, entityType, showAll = false) {
    showAll ? this.clickShowAll(entityType) : true

    for (let i = 0; i < entitiesIds.length; i++) {
      cy.get(`gs-card[data-test-id="entity-${entitiesIds[i]}"] gs-highlighted-text mark:not(:empty)`).as('entityCard')
      cy.get('@entityCard').scrollIntoView().should('be.visible')
    }
  }

  /**
   * Assert a search result is being highlighted displayed. It usually happens after searching for it in the search bar
   *
   */
  assertAllSearchResultItensAreDisplayedInHighlightedMode() {
    cy.get(selectors.searchResultAllItemsHighlighted).each(($el) => {
      cy.wrap($el).should('be.visible')
    })
  }

  /**
   * Assert the action detailsActionPanelBtn (threeDotButton) in the right top corner of a selected entity is displayed or not
   *
   * @param {boolean} displayed True is the default value to assert the threeDotButton is displayed. False otherwise
   */
  assertThreeDotButtonDisplayed(displayed = true) {
    displayed ? cy.get(selectors.threeDotBtn).should('be.visible') : cy.get(selectors.threeDotBtn).should('not.exist')
  }

  /**
   * Assert the Deactivate option inside the "threeDotButton" of a selected entity is displayed or not
   *
   * @param {boolean} displayed True is the default value to assert the option is displayed. False otherwise
   */
  assertDeactivateEntityButtonDisplayed(displayed = true) {
    displayed ? cy.get(selectors.threeDotDeactivateBtn).should('be.visible') : cy.get(selectors.threeDotDeactivateBtn).should('not.exist')
  }

  /**
   * Assert the Duplicate option inside the "threeDotButton" of a selected entity is displayed or not
   *
   * @param {boolean} displayed True is the default value to assert the option is displayed. False otherwise
   */
  assertDuplicateEntityButtonDisplayed(displayed = true) {
    displayed ? cy.get(selectors.threeDotDuplicateBtn).should('be.visible') : cy.get(selectors.threeDotDuplicateBtn).should('not.exist')
  }

  /**
   * Assert a badge with View Only is displayed next the entity header/title
   *
   * @param {boolean} displayed True is the default value to assert the VIEW ONLY badge is displayed. False otherwise
   */
  assertViewOnlyBadgeDisplayed(displayed = true) {
    displayed ? cy.get(selectors.viewOnlyStatusBadge).should('be.visible') : cy.get(selectors.viewOnlyStatusBadge).should('not.exist')
  }

  /**
   * Assert if the name of the entity in the header is editable or not over the UI
   *
   * @param {boolean} editable True to assert the entity name is editable, false otherwise
   */
  assertEntityNameEditable(editable) {
    this.getEntityHeader().as('input')

    editable ? cy.get('@input').should('not.have.class', 'disabled**') : cy.get('@input').should('have.class', 'disabled**')
  }

  // ----------------------------------------------------------------- OTHERS ------------------------------------------------------------- //

  /**
   * This method has the exactly implementation of the method getEntityHeader()
   * This is necessary is some cases, since settings pages have a problem while scrolling anything. So, this behavior is strict to settings like groups, roles, and daps
   *
   */
  scrollToTop() {
    cy.get(selectors.entityNameInput).scrollIntoView()
  }

  /**
   * Modify a entity (group role, or dap) name from a selected entity. It also can verify the current name of the entity, right before changing it.
   *
   * @param {string} entityName Name of the role that is going to be modified.
   */
  modifyEntityName(entityName) {
    this.getEntityHeader().as('input')

    cy.get('@input').clear()
    cy.get('@input').type(entityName).blur() // remove focus from element
  }

  /**
   * Save all updates made in the selected entity by clicking in the Save button. The entity can be groups, roles, or daps
   */
  saveEntityInformation() {
    cy.get(selectors.saveBtn).scrollIntoView().click()
  }

  /**
   * Discard all updates in the selected entity by clicking in the Discard button. The entity can be groups, roles, or daps
   */
  discardEntityInformation() {
    cy.get(selectors.discardBtn).scrollIntoView().click()
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
   * call the method like this : addEntitiesInTheRightNavBar('group', ['groupName1', 'groupName2'], [idGroup1, idGroup2]])
   * call the method like this : addEntitiesInTheRightNavBar('user', ['userName1', 'userName2'], [idUser1, idUser2]])
   */
  addEntitiesInTheRightNavBar(entityType, entityNames, entityIds) {
    this.checkUrl('/select/' + entityType)

    for (let i = 0; i < entityNames.length; i++) {
      cy.get(groupsNavBarSelectors.searchInput).type(entityNames[i])
      cy.get(groupsNavBarSelectors.entityCardId + entityIds[i]).click()
      cy.get(groupsNavBarSelectors.searchInput).clear()
    }
    cy.get(groupsNavBarSelectors.confirmBtn).click()
  }
}

export default BaseManagementPage
