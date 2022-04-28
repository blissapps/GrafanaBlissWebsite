import BaseManagementPage from './baseManagementPage'
import SelectSettingsL4Page from './selectSettingsL4Page'

// Pages used
const selectSettingsL4Page = new SelectSettingsL4Page()

const properties = {
  pageURL: '/settings/dap-management'
}

const selectors = {
  noDapSelectedMsg: 'gs-empty-container[data-test-id=no-dap-selected-message] div.content',
  activeDapList: 'gs-tab[data-test-id=activeTab] #dapList gs-list',
  inactiveDapList: 'gs-tab[data-test-id=inactiveTab] #dapList gs-list',
  dapsDisplayed: '#dapList gs-list a[data-test-id*="dap-',
  noDapsExistMessage: '#emptyList',
  addGroupsBtn: '*[data-test-id=section-group] *[data-test-id=add-entity]',
  dapId: '*[data-test-id=dap-',
  groupsCardId: '*[data-test-id=section-group] gs-card[data-test-id=entity-',
  removeIconButton: 'gs-button[data-test-id=remove-entity]',
  createDapBtn: 'gs-button[data-test-id="create-dap"]',
  dapDetailsContainer: 'hearth-dap-details',
  selectNotEditable: 'gs-select.disabled',
  activateDapBtn: 'gs-button[data-test-id=activateBtn]',
  groupsRecordsCounter: '*[data-test-id=section-group] span.record-count',
  groupsAllCards: '*[data-test-id=section-group] gs-card'
}

const conditionsSelectors = {
  conditionsContainer: 'div.condition-container',
  initialCondition: 'div.conditions-panel hearth-dap-condition-property div.initial-conditional',
  generalSelect: 'div.select',
  generalSelectOptions: 'div.cdk-overlay-container *[dir=ltr] [class*=select-panel] gs-option',
  inputs: 'div.conditions-panel hearth-dap-condition-property div.input input',
  generalElement: 'div.conditions input',
  addElementLevel1: 'div.conditions hearth-dap-action-bar gs-svg-icon.level-1',
  addElementLevel2: 'div.conditions hearth-dap-action-bar gs-svg-icon.level-2',
  addElementLevel3: 'div.conditions hearth-dap-action-bar gs-svg-icon.level-3',
  conditionalElements: 'div.conditions hearth-dap-condition-conditional',
  removeConditionLine: 'div.remove-action svg',
  numberOfSearchedResultsInConditions: 'hearth-dap-conditions span span'
}

class DapManagementPage extends BaseManagementPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }

  // -------------------------------------------------------------------------------------- GETS ------------------------------------------------------------------------------- //

  /**
   * Get a DAP by sending the DAP ID.
   *
   * @param {number} dapId DAP id number.
   *
   * @returns The DAP element
   */
  getDapById(dapId) {
    return cy.get(selectors.dapId + dapId).scrollIntoView()
  }

  // -------------------------------------------------------------------------------------- CLICKS --------------------------------------------------------------------------- //

  /**
   * Click in a DAP by sending the DAP ID.
   *
   * @param {number} dapId DAP id number.
   */
  clickDapById(dapId) {
    this.getDapById(dapId).click()
    this.scrollToEntityTop()
  }

  clickCreateNewDap() {
    cy.get(selectors.createDapBtn).as('createNewDapButton')
    cy.get('@createNewDapButton').click()
  }

  /**
   * Click in the Add groups button and nothing else. You may be looking for the addGroupsToDap method that does everything in a single method
   */
  clickAddGroupsToDap() {
    cy.get(selectors.addGroupsBtn).scrollIntoView().click()
  }

  // ----------------------------------------------------------------------------------- ASSERTIONS -------------------------------------------------------------------------- //

  /**
   * Assert the button (therefore the permission) to create a new DAP is displayed over the UI
   *
   * @param {boolean} displayed True to verify if the button to create a new DAP is displayed. False otherwise.
   */
  assertCreateNewDapButtonDisplayed(displayed = true) {
    displayed ? cy.get(selectors.createDapBtn).should('be.visible') : cy.get(selectors.createDapBtn).should('not.exist')
  }

  /**
   * Assert the message about no DAP selected is displayed
   *
   * @param {boolean} displayed True to verify if the message is displayed. False otherwise.
   */
  assertNoDapSelectedMessageIsDisplayed(displayed = true) {
    displayed ? cy.get(selectors.noDapSelectedMsg).should('be.visible') : cy.get(selectors.noDapSelectedMsg).should('not.exist')
  }

  /**
   * Assert a list of daps is displayed under the correlated Active tab.
   *
   * @param {boolean} displayed True to validate if the list is displayed. False otherwise
   */
  assertActiveDapsAreDisplayed(displayed = true) {
    displayed ? cy.get(selectors.activeDapList).should('be.visible') : cy.get(selectors.activeDapList).should('not.exist')
  }

  /**
   * Assert a list of daps is displayed under the correlated Inactive tab.
   *
   * @param {boolean} displayed True to validate if the list is displayed. False otherwise
   */
  assertInactiveDapsAreDisplayed(displayed = true) {
    displayed ? cy.get(selectors.inactiveDapList).should('be.visible') : cy.get(selectors.inactiveDapList).should('not.exist')
  }

  /**
   * Assert the message "There are no data access profiles" is displayed when there is no data displayed
   */
  assertNoDapsExistMessageIsDisplayed() {
    cy.get(selectors.noDapExistsMessage).should('be.visible')
  }

  /**
   * Assert if an group is associated with the selected dap
   *
   * @param {number} groupId Group Id
   * @param {boolean} displayed True if you want to assert the group is associated with the dap, false otherwise
   * @param {boolean} showAll True to click in the showAll buttons for the case where we have lots of groups associated
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
   * Assert the container with all conditions is displayed: It includes a initial conditional, the select box and the input with value.
   *
   * This is based on the US https://globalshares.atlassian.net/browse/PB-32
   */
  assertConditionsContainerDisplayedAsExpected() {
    // Container visible
    cy.get(conditionsSelectors.conditionsContainer).scrollIntoView().should('be.visible')

    // Initial conditional
    cy.get(conditionsSelectors.initialCondition).first().should('be.visible')

    // Select options
    const optionsAvailable = ['Business Unit', 'Client id', 'Is international mobile?', 'Participant id', 'Payroll id', 'Residency', 'Tax status']
    cy.get(conditionsSelectors.generalSelect).first().click()

    for (let i = 0; i < optionsAvailable.length; i++) {
      cy.get(conditionsSelectors.generalSelectOptions).eq(i).should('have.text', optionsAvailable[i])
    }

    cy.get(conditionsSelectors.inputs).first().should('be.visible')
  }

  /**
   * Assert the value of a condition element
   *
   * @param {number} elementPosition The element position of the 'div.conditions input' locator
   * @param {string} conditionValue The value to assert in the elementPosition
   * @param {boolean} displayed True is the default value to assert the condition does exist. Send false to assert the condition does not exists or if it was removed.
   *
   * @example
   * assertConditionValue(1, 'Client id') to assert the element 'div.conditions input' in position 1 is equal to  'Client id'
   */
  assertConditionValue(elementPosition, conditionValue, displayed = true) {
    cy.log('Asserting element position ' + elementPosition + ' has value ' + conditionValue)

    if (displayed) {
      cy.get(conditionsSelectors.generalElement)
        .eq(elementPosition - 1)
        .scrollIntoView()
        .should('contain.value', conditionValue)
    } else {
      cy.get(conditionsSelectors.generalElement)
        .eq(elementPosition - 1)
        .should('not.exist')
    }
  }

  /**
   * Assert the DAP container with dap details is displayed or not
   *
   * @param {boolean} displayed True to assert de DAP details are displayed, False otherwise
   */
  assertDapDetailsContainerDisplayed(displayed = true) {
    displayed ? cy.get(selectors.dapDetailsContainer).should('be.visible') : cy.get(selectors.dapDetailsContainer).should('not.exist')
  }

  /**
   * Assert if a Dap is editable or not in a selected Dap
   *
   * @param {boolean} editable True to assert the Dap is editable, false otherwise
   */
  assertDapIsEditable(editable = true) {
    editable ? cy.get(selectors.selectNotEditable).should('not.exist') : cy.get(selectors.selectNotEditable).should('exist')
  }

  /**
   * Assert the amount of results displayed for conditions after using the search engine to look for conditions
   *
   * @param {number} results amount of results you want to check after a search
   *
   * @example Send 'results = 2' to validate the '2 SEARCH RESULT(S)' is being displayed in the condition search result
   */
  assertAmountOfSearchedConditionResults(results) {
    this.assertNumberOfRecordsDisplayed(conditionsSelectors.numberOfSearchedResultsInConditions, results)
  }

  /**
   * Assert if the number of groups of a selected DAP is displayed correct
   *
   * @param {number} numberOrRecords Amount of records supposed to be displayed in a group section
   */
  assertNumberOfGroupRecordsAssociatedWithDap(numberOrRecords) {
    this.assertNumberOfRecordsDisplayed(selectors.groupsRecordsCounter, numberOrRecords)
  }

  /**
   * Assert if the amount of cards displayed in the group section is corrected
   *
   * @param {number} amountOfCards Amount of cards supposed to be displayed in a group section
   */
  assertNumberOfGroupCardsAssociatedWithDap(amountOfCards) {
    cy.get(selectors.groupsAllCards).should('have.length', amountOfCards)
  }

  /**
   * Assert add groups button is visible or not
   *
   * @param {boolean} visible True is default value to assert the add groups button is visible. False to assert otherwise
   *
   */
  assertAddGroupsButtonIsVisible(visible = true) {
    visible ? cy.get(selectors.addGroupsBtn).should('be.visible') : cy.get(selectors.addGroupsBtn).should('not.exist')
  }

  /**
   * Assert if the amount of group cards displayed is corrected
   *
   * @param {number} amountOfCards Amount of cards supposed to be displayed in groups
   * @param {boolean} showAll False to not click in the showAll button in case it is not displayed. True otherwise
   */
  assertNumberOfGroupCardsDisplayedInASection(amountOfCards, showAll = false) {
    // clicks in show all in case we have lots of cards
    showAll ? this.clickShowAll('groups') : true

    cy.get(selectors.groupsAllCards).should('have.length', amountOfCards)
  }

  /**
   * Assert if the Daps are being displayed in alphabetical order by default
   */
  assertDapsInAlphabeticalOrder() {
    this.assertElementsInAlphabeticalOrNumericalOrder(selectors.dapsDisplayed)
  }

  /**
   * Assert whether the button to activate a DAP (Activate profile button) is displayed or not
   *
   * @param {boolean} displayed True is the default value to validate the button to activate a DAP is displayed, false otherwise
   */
  assertActivateDapButtonDisplayed(displayed = true) {
    displayed ? cy.get(selectors.activateDapBtn).should('be.visible') : cy.get(selectors.activateDapBtn).should('not.exist')
  }

  // ---------------------------------------------------------------------------------- OTHERS -------------------------------------------------------------------------------- //

  /**
   * Add Groups to a selected DAP
   *
   * @param {array} groupNames Array of name of groups that are going to be added into this dap.
   * @param {array} groupIds Array of id of groups that are going to be added into this dap.
   *
   * @example
   * All dapNames and dapIds need to be placed in order.
   * For example: dapNames=['dap1', 'dap2'] needs to match the exactly order in dapIds=[1, 2]
   */
  addGroupsToDap(groupNames, groupIds) {
    this.clickAddGroupsToDap()
    selectSettingsL4Page.selectSettings('group', groupNames, groupIds)
    selectSettingsL4Page.clickToConfirmTheSelections()
  }

  /**
   * Remove Groups from a selected dap
   *
   * @param {array} groupsIds Array of ids of groups that are going to be removed of the selected DAP.
   * @param {boolean} showAll True to click in the showAll buttons for the case where we have lots of groups associated
   */
  removeGroupFromDap(groupsIds, showAll = false) {
    if (showAll) {
      this.clickShowAll('groups')
    }

    for (let i = 0; i < groupsIds.length; i++) {
      cy.get(selectors.groupsCardId + groupsIds[i] + '] ' + selectors.removeIconButton)
        .scrollIntoView()
        .click()
    }
  }

  /**
   * Modifies conditions of a select dap
   * The method gets a array of selectors based on 'div.conditions input', so it is necessary to send the element position to be used in the eq() filter
   *
   * @param {array} conditionType Send a array containing the position and the option to choose in a condition and/or. Example: [3, 'or'] means the element 'div.conditions input' in position 3 will be selected as 'or'
   * @param {array} condition Send a array containing the position and the option to choose in a condition type like 'Business Unit', 'Client id', 'Is international mobile?', and etc.. Example: [3, 'Client id'] means the element 'div.conditions input' in position 3 will be selected as 'Client id'
   * @param {array} value Send a array containing the position and the option to choose/typed in a as the value of a condition. Example: [3, 'Brasil'] means the element 'div.conditions input' in position 3 will be selected as 'Brasil'
   * @param {boolean} valueIsInput True if the value of a condition is an input field. False when it is a select box
   *
   * @examples
   * modifyCondition([9, 'or'], [10, 'Business Unit'], [11, '2'])
   * modifyCondition([], [13, 'Tax status'], [14, 'N/A'], false)
   * modifyCondition([6, 'and'])
   * modifyCondition([], [], [23, 'Yes'], false)
   * modifyCondition([33, 'or'], [34, 'Participant id'], [35, '10'])
   * modifyCondition([], [], [26, 'Brasil'], false)
   */
  modifyCondition(conditionType = [], condition = [], value = [], valueIsInput = true) {
    //Modify condition (and, or)
    if (conditionType.length != 0) {
      cy.log('Selecting ' + conditionType[1])
      cy.get(conditionsSelectors.generalElement)
        .eq(conditionType[0] - 1)
        .scrollIntoView()
        .click()
        .then(() => {
          cy.get(conditionsSelectors.generalSelectOptions).filter(`:contains('${conditionType[1]}')`).click()
        })
    }

    // Modify with 'Business Unit', 'Client id', 'Is international mobile?', 'Participant id', 'Payroll id', 'Residency', or 'Tax status'
    if (condition.length != 0) {
      cy.log('Selecting ' + condition[1])
      cy.get(conditionsSelectors.generalElement)
        .eq(condition[0] - 1)
        .scrollIntoView()
        .click()
        .then(() => {
          cy.get(conditionsSelectors.generalSelectOptions).filter(`:contains('${condition[1]}')`).click()
        })
    }

    // Type value of a condition. It can be an input or select, so it depends of the valueIsInput parameter
    if (value.length != 0) {
      cy.log('Selecting ' + value[1])
      if (valueIsInput) {
        cy.get(conditionsSelectors.generalElement)
          .eq(value[0] - 1)
          .scrollIntoView()
          .clear()
          .type(value[1] + '{enter}')
      } else {
        cy.get(conditionsSelectors.generalElement)
          .eq(value[0] - 1)
          .scrollIntoView()
          .click()
          .then(() => {
            cy.get(conditionsSelectors.generalSelectOptions).filter(`:contains('${value[1]}')`).click()
          })
      }
    }
  }

  /**
   * Add a condition into a DAP
   * PS: It only adds the elements without the possibility to insert the proper values on them. For that, use the modifyCondition method right after using this one
   *
   * @param {number} conditionIndex As we may have lots of if/and/or boxes, send the index of the one you want to add a condition. The locator is located in "conditionsSelectors.conditionalElements"
   * @param {number} level Level 1, 2, or 3 to choose in which level the condition is going to be added.
   *
   * @example
   * addCondition(1, 1) -> first conditional element adding a condition in the level 1
   * addCondition(2, 2) -> second conditional element adding a condition in the level 2
   * addCondition(7, 3) -> Add a condition in the level 3 of the element in the position 7
   */
  addCondition(conditionIndex, level) {
    cy.log('Adding condition in the index ' + conditionIndex + ' with the level ' + level)

    let locator = ''

    switch (level) {
      case 1:
        locator = conditionsSelectors.addElementLevel1
        break

      case 2:
        locator = conditionsSelectors.addElementLevel2
        break

      case 3:
        locator = conditionsSelectors.addElementLevel3
        break

      default:
        throw new Error('Level is invalid, choose 1, 2, or 3!')
    }

    cy.get(conditionsSelectors.conditionalElements)
      .eq(conditionIndex - 1)
      .click({ force: true })
      .then(() => {
        cy.get(locator).trigger('mouseover').click()
      })
  }

  /**
   * Remove a condition
   *
   * @param {number} lineToRemove Line number to remove the condition
   *
   * @example:
   * removeCondition(2) -> Removes the condition of line 2
   */
  removeCondition(lineToRemove) {
    cy.get(conditionsSelectors.removeConditionLine)
      .eq(lineToRemove - 1)
      .trigger('mouseover')
      .click({ force: true })
  }

  /**
   * Activate the selected dap
   */
  activateDap() {
    cy.get(selectors.activateDapBtn).click()
  }
}

export default DapManagementPage
