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
  removeIconButton: 'gs-button[data-test-id=remove-entity]'
}

const conditionsSelectors = {
  conditionsContainer: 'div.condition-container',
  initialCondition: 'div.conditions-panel hearth-dap-condition-property div.initial-conditional',
  generalSelect: 'div.select',
  generalSelectOptions: 'div.cdk-overlay-container *[dir=ltr] [class*=select-panel] gs-option',
  inputs: 'div.conditions-panel hearth-dap-condition-property div.input input',
  generalElement: 'div.conditions input'
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
   * Assert the container with all conditions is displayed: I includes the a initial conditional, the select box and the input with value.
   * This is based on the US https://globalshares.atlassian.net/browse/PB-32
   */
  assertConditionsContainerDisplayedWithExpectedValues() {
    // Container visible
    cy.get(conditionsSelectors.conditionsContainer)
      .scrollIntoView()
      .should('be.visible')

    // Initial conditional
    cy.get(conditionsSelectors.initialCondition)
      .first()
      .should('be.visible')

    // Select options
    const optionsAvailable = ['Business Unit', 'Client id', 'Is international mobile?', 'Participant id', 'Payroll id', 'Residency', 'Tax status']
    cy.get(conditionsSelectors.generalSelect)
      .first()
      .click()

    for (let i = 0; i < optionsAvailable.length; i++) {
      cy.get(conditionsSelectors.generalSelectOptions)
        .eq(i)
        .should('have.text', optionsAvailable[i])
    }

    cy.get(conditionsSelectors.inputs)
      .first()
      .should('be.visible')
  }

  /**
   * @missing_ids
   * @needs_refactoring
   *
   * Assert the value of a condition element
   *
   * @param {Number} elementPosition The element position of the 'div.conditions input' locator
   * @param {String} conditionValue The value to assert in the elementPosition
   *
   * @example
   * assertConditionValue(1, 'Client id') to assert the element 'div.conditions input' in position 1 is equal to  'Client id'
   */
  assertConditionValue(elementPosition, conditionValue) {
    cy.log('Asserting element position ' + elementPosition + ' has value ' + conditionValue)
    cy.get(conditionsSelectors.generalElement)
      .eq(elementPosition - 1)
      .scrollIntoView()
      .should('contain.value', conditionValue)
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
    cy.get(selectors.addGroupsBtn)
      .scrollIntoView()
      .click()
    this.addEntitiesInTheRightNavBar('group', groupNames, groupIds)
  }

  /**
   * Remove Groups from a selected dap
   *
   * @param {Array} groupsIds Array of ids of groups that are going to be removed of the selected DAP.
   * @param {Boolean} showAll True to click in the showAll buttons for the case where we have lots of groups associated
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
   * @missing_ids
   * @needs_refactoring
   *
   * Modifies conditions of a select dap
   * The method gets a array of selectors based on 'div.conditions input', so it is necessary to send the element position with the eq() filter
   *
   * @param {Array} conditionType Send a array containing the position and the option to choose in a condition and/or. Example: [3, 'or'] means the element 'div.conditions input' in position 3 will be selected as 'or'
   * @param {Array} condition Send a array containing the position and the option to choose in a condition type like 'Business Unit', 'Client id', 'Is international mobile?', and etc.. Example: [3, 'Client id'] means the element 'div.conditions input' in position 3 will be selected as 'Client id'
   * @param {Array} value Send a array containing the position and the option to choose/typed in a as the value of a condition. Example: [3, 'Brasil'] means the element 'div.conditions input' in position 3 will be selected as 'Brasil'
   * @param {Boolean} valueIsInput True if the value of a condition is an input field. False when it is a select box
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
          cy.get(conditionsSelectors.generalSelectOptions)
            .filter(`:contains('${conditionType[1]}')`)
            .click()
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
          cy.get(conditionsSelectors.generalSelectOptions)
            .filter(`:contains('${condition[1]}')`)
            .click()
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
          .type(value[1])
      } else {
        cy.get(conditionsSelectors.generalElement)
          .eq(value[0] - 1)
          .scrollIntoView()
          .click()
          .then(() => {
            cy.get(conditionsSelectors.generalSelectOptions)
              .filter(`:contains('${value[1]}')`)
              .click()
          })
      }
    }
  }
}

export default DapManagementPage
