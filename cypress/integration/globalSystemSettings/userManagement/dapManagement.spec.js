import DapManagementPage from '../../../support/pages/globalSettingsPages/userManagementPages/dapManagementPage'

import LeftMenuNavBar from '../../../support/components/leftMenuNavBar'
import SearchBar from '../../../support/components/searchBar'

import Utils from '../../../support/utils'

describe('Data Access Profiles tests over User Management settings', () => {
  // Pages
  const dapManagementPage = new DapManagementPage()

  // Components
  const leftMenuNavBar = new LeftMenuNavBar()
  const searchBar = new SearchBar()

  // Others
  const utils = new Utils()

  beforeEach(() => {
    // @ts-ignore
    cy.login() && cy.loginSuccessfulXHRWaits()
    leftMenuNavBar.accessGlobalSettingsMenu('user', 'dap')
    dapManagementPage.checkDapManagementUrl()
  })

  // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

  /**
   * Verify if the settings send the user back to the home screen when the user closes the settings
   *
   * Waiting for @IDS
   */
  it('C7564741_DAP_Check_The_System_Behavior_When_Closing_The_Settings_Nav_Bar', () => {
    leftMenuNavBar.closeGlobalSettingsLeftBar()
    dapManagementPage.checkDapManagementUrl()
  })

  /**
   * @missing_data Need to have an active DAP available. Need to have at least two groups available
   */
  it.skip('C7592112_DAP_Add_remove_And_Discard_A_Group_From_A_Data_Access_Profile', () => {
    const dapId = 34
    const dapName = 'Add, remove, and discard a Group'
    const groupName = ['Add 1', 'Add 2']
    const groupIds = [1124, 1090]

    dapManagementPage.clickDapById(dapId)
    dapManagementPage.addGroupsToDap(groupName, groupIds)
    dapManagementPage.saveEntityInformation()
    dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved', true, true)
    dapManagementPage.assertGroupAssociatedWithDap(groupIds[0])
    dapManagementPage.assertGroupAssociatedWithDap(groupIds[1])

    dapManagementPage.removeGroupFromDap([groupIds[0]])
    dapManagementPage.saveEntityInformation()
    dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved', true, true)
    dapManagementPage.assertGroupAssociatedWithDap(groupIds[0], false)

    dapManagementPage.removeGroupFromDap([groupIds[1]])
    dapManagementPage.assertGroupAssociatedWithDap(groupIds[1], false)
    dapManagementPage.discardEntityInformation()
    dapManagementPage.assertGroupAssociatedWithDap(groupIds[1])
    dapManagementPage.assertToastNotificationMessageIsDisplayed('Changes to data access profile were discard', true, true)

    dapManagementPage.addGroupsToDap([groupName[0]], [groupIds[0]])
    dapManagementPage.discardEntityInformation()
    dapManagementPage.assertGroupAssociatedWithDap(groupIds[0], false)
    dapManagementPage.assertToastNotificationMessageIsDisplayed('Changes to data access profile were discard')

    //teardown
    dapManagementPage.removeGroupFromDap([groupIds[1]])
    dapManagementPage.saveEntityInformation()
  })

  /**
   * @missing_data Need to have at least 1 active and 1 inactive DAP created
   */
  it.skip('C7544057_DAP_Happy_Path_List_Active_And_Inactive_Data_Access_Profile(s)', () => {
    dapManagementPage.assertActiveDapsAreDisplayed()
    dapManagementPage.clickTabByTitle('Inactive')
    dapManagementPage.assertInactiveDapsAreDisplayed()
  })

  /**
   * @missing_data There are no DAPs neither in active nor inactive status
   */
  it.skip('C7544059_DAP_Empty_State_Active_And_Inactive_Data_Access_Profile(s)', () => {
    // Active tab
    dapManagementPage.assertActiveDapsAreDisplayed(false)
    dapManagementPage.assertNoDapExistsMessageIsDisplayed()

    //Inactive tab
    dapManagementPage.clickTabByTitle('Inactive')
    dapManagementPage.assertInactiveDapsAreDisplayed(false)
    dapManagementPage.assertNoDapExistsMessageIsDisplayed()
  })

  it('C8981124_DAP_Create_DAP_With_No_Nested_Conditions', () => {
    const dapName = 'Create new DAP no nested ' + utils.getRandomNumber()

    dapManagementPage.clickCreateNewDap()
    dapManagementPage.modifyEntityName(dapName)
    dapManagementPage.modifyCondition([], [1, 'Client id'], [2, '11'])
    dapManagementPage.saveEntityInformation()

    dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
    dapManagementPage.assertEntityIsDisplayedInTheList(dapName)

    dapManagementPage.reloadPage()
    dapManagementPage.clickEntityByName(dapName)
    dapManagementPage.assertConditionValue(1, 'Client id')
    dapManagementPage.assertConditionValue(2, '11')
  })

  it('C8981125_DAP_Create_DAP_With_Nested_Conditions', () => {
    const dapName = 'Create new DAP NESTED ' + utils.getRandomNumber()

    dapManagementPage.clickCreateNewDap()
    dapManagementPage.modifyEntityName(dapName)
    dapManagementPage.modifyCondition([], [1, 'Client id'], [2, '11'])
    dapManagementPage.addCondition(1, 2)
    dapManagementPage.modifyCondition([3, 'or'], [4, 'Client id'], [5, '11'])
    dapManagementPage.saveEntityInformation()

    dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
    dapManagementPage.assertEntityIsDisplayedInTheList(dapName)

    dapManagementPage.reloadPage()
    dapManagementPage.clickEntityByName(dapName)
    dapManagementPage.assertConditionValue(1, 'Client id')
    dapManagementPage.assertConditionValue(2, '11')
    dapManagementPage.assertConditionValue(3, 'or')
    dapManagementPage.assertConditionValue(4, 'Client id')
    dapManagementPage.assertConditionValue(5, '11')
  })

  it('C8981126_DAP_Discard_Unsaved_DAP', () => {
    const dapName = 'Create and Discard DAP ' + utils.getRandomNumber()

    dapManagementPage.clickCreateNewDap()
    dapManagementPage.modifyEntityName(dapName)
    dapManagementPage.modifyCondition([], [1, 'Client id'], [2, '11'])
    dapManagementPage.discardEntityInformation()

    dapManagementPage.assertDapDetailsContainerDisplayed(false)
    dapManagementPage.assertToastNotificationMessageIsDisplayed('New data access profile was discarded')
    dapManagementPage.assertEntityIsDisplayedInTheList(dapName, false)
  })

  /**
   * SKIPPING DUE TO: https://globalshares.atlassian.net/browse/PB-920
   */
  it.skip('C8981127_DAP_Save_Without_Conditions', () => {
    const dapName = 'Create without conditions '

    dapManagementPage.clickCreateNewDap()
    dapManagementPage.modifyEntityName(dapName)
    dapManagementPage.saveEntityInformation()

    dapManagementPage.assertNotificationErrorDisplayed('A DAP cannot be saved with no conditions')
  })

  /**
   * @missing_data Need to have a DAP with one group and one condition associated
   */
  it.skip('C7564743_DAP_Load_Current_Conditions', () => {
    const dapId = 10
    const dapName = 'Dap1'
    const groupIds = [957]

    dapManagementPage.clickDapById(dapId)
    dapManagementPage.assertEntityHeaderIsDisplayedAsExpected(dapName)
    dapManagementPage.assertConditionsContainerDisplayedWithExpectedValues()
    dapManagementPage.assertGroupAssociatedWithDap(groupIds[0])
  })

  /**
   * @missing_data Need to have a simple DAP created
   */
  it.skip('C7564744_DAP_Rename_DAP', () => {
    const dapId = 20
    const newDapName = 'DAP was renamed'

    dapManagementPage.clickDapById(dapId)
    dapManagementPage.modifyEntityName(newDapName)
    dapManagementPage.assertEntityHeaderIsDisplayedAsExpected(newDapName)
    dapManagementPage.saveEntityInformation()
    dapManagementPage.assertToastNotificationMessageIsDisplayed(newDapName + ' Saved')
  })

  /**
   * @missing_data Need to have a simple DAP created with a single condition
   */
  it.skip('C7564745_DAP_Change_An_Existing_Condition', () => {
    const dapId = 30
    const dapName = 'Change condition'

    dapManagementPage.clickDapById(dapId)
    dapManagementPage.modifyCondition([], [1, 'Client id'], [2, '11'])
    dapManagementPage.saveEntityInformation()

    dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
    dapManagementPage.reloadPage()
    dapManagementPage.assertConditionValue(1, 'Client id')
    dapManagementPage.assertConditionValue(2, '11')
  })

  /**
   * @missing_data Need to have a simple DAP created with a single condition
   */
  it.skip('C7564746_DAP_Add_Condition_On_Same_Level', () => {
    const dapId = 3
    const dapName = 'Add condition same level'

    dapManagementPage.clickDapById(dapId)

    dapManagementPage.addCondition(1, 1)
    dapManagementPage.modifyCondition([3, 'or'], [4, 'Client id'], [5, '11'])
    dapManagementPage.saveEntityInformation()
    dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')

    dapManagementPage.reloadPage()
    dapManagementPage.clickDapById(dapId)
    dapManagementPage.assertConditionValue(3, 'or')
    dapManagementPage.assertConditionValue(4, 'Client id')
    dapManagementPage.assertConditionValue(5, '11')
  })

  /**
   * @missing_data Need to have a simple DAP created with a single condition
   */
  it.skip('C7564747_DAP_Add_Nested_Condition', () => {
    const dapId = 4
    const dapName = 'Add nested condition'

    dapManagementPage.clickDapById(dapId)

    dapManagementPage.addCondition(1, 2)
    dapManagementPage.modifyCondition([], [4, 'Client id'], [5, '11'])
    dapManagementPage.saveEntityInformation()
    dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')

    dapManagementPage.reloadPage()
    dapManagementPage.clickDapById(dapId)
    dapManagementPage.assertConditionValue(4, 'Client id')
    dapManagementPage.assertConditionValue(5, '11')
  })

  /**
   * @missing_data Need to have a simple DAP created with two conditions created
   */
  it.skip('C7564748_DAP_Remove_Condition', () => {
    const dapId = 5
    const dapName = 'Remove condition'

    dapManagementPage.clickDapById(dapId)

    dapManagementPage.removeCondition(2)
    dapManagementPage.saveEntityInformation()
    dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')

    dapManagementPage.reloadPage()
    dapManagementPage.clickDapById(dapId)
    dapManagementPage.assertConditionValue(4, 'Client id', false)
    dapManagementPage.assertConditionValue(5, '11', false)
  })

  /**
   * @missing_data Need to have a simple DAP created with only one condition created
   */
  it.skip('C7564749_DAP_Discard_Changes_Condition', () => {
    const dapId = 6

    dapManagementPage.clickDapById(dapId)

    dapManagementPage.addCondition(1, 2)
    dapManagementPage.modifyCondition([], [4, 'Client id'], [5, '11'])
    dapManagementPage.discardEntityInformation()
    dapManagementPage.assertToastNotificationMessageIsDisplayed('Changes to data access profile were discard')
  })

  /**
   * @missing_data Need to have a two simple DAPs created
   *
   */
  it.skip('C7564750_DAP_Try_To_Leave_Existing_DAP_Name_Blank', () => {
    const dapId = 47
    const dapName = 'Existing DAP name blank'
    const dapIdToChangeFocus = 8

    dapManagementPage.clickDapById(dapId)
    dapManagementPage.modifyEntityName('{backspace}')
    dapManagementPage.saveEntityInformation()
    dapManagementPage.assertNotificationErrorDisplayed('Name should not be empty.')

    dapManagementPage.clickDapById(dapIdToChangeFocus)
    dapManagementPage.assertEntityHeaderIsDisplayedAsExpected() // This assertion in here just make sure the second dap was loaded
    dapManagementPage.clickDapById(dapId)
    dapManagementPage.assertEntityHeaderIsDisplayedAsExpected(dapName)
  })

  /**
   * @missing_data Need to have an active DAP created in the active tab
   *
   * @Waiting also for https://globalshares.atlassian.net/wiki/spaces/~338817290/pages/3384774689/ids+missing+report+2 so the method clickToDeactivateEntity() will work
   *
   */
  it.skip('C7568176_DAP_Deactivate_And_Activate_DAP', () => {
    const dapId = 20
    const dapName = 'Deactivate me'

    // Deactivate DAP
    dapManagementPage.clickDapById(dapId)
    //dapManagementPage.clickToDeactivateEntity() // uncomment as soon as ids missing report 2 is finished
    cy.get('gs-button[data-test-id=more-actions-button]').click() // temporarily placed until the ids missing report 2 is finished
    cy.get('gs-action-panel-option[data-test-id=deactivate-button]').click() // temporarily placed until the ids missing report 2 is finished

    dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Deactivated', true, true)
    dapManagementPage.assertInactiveDapsAreDisplayed()
    dapManagementPage.assertEntityIsDisplayedInTheList(dapName)
    dapManagementPage.assertDapEditable(false)

    // Activate DAP
    dapManagementPage.activateDap()

    dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Activated')
    dapManagementPage.assertActiveDapsAreDisplayed()
    dapManagementPage.assertEntityIsDisplayedInTheList(dapName)
    dapManagementPage.assertDapEditable()
  })

  /**
   *
   * SkIPPING due to https://globalshares.atlassian.net/browse/PB-873
   *
   * @missing_data Need to have some daps called 'dap to search' in both active and inactive tabs. Also need to have another dap called 'other group dap' in both active and inactive tab.
   *               All daps must have just one 'Business Unit' conditions added
   */
  it.skip('C7592109_DAP_Search_Functionality', () => {
    let dap = 'DAP TO SEARCH'
    const dapCondition = 'Business'

    // ACTIVE TAB
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResults(3)
    dapManagementPage.assertSearchResultListAccuracy([29, 30, 31])

    dap = 'dap to search'
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResults(3)
    dapManagementPage.assertSearchResultListAccuracy([29, 30, 31])

    dap = 'dAp To SEarch 1'
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResults(1)
    dapManagementPage.assertSearchResultListAccuracy([29])

    dap = 'randomName' + utils.getRandomNumber()
    searchBar.search(dap)
    dapManagementPage.assertNoResultFoundIsVisible()

    dap = 'SELECT * FROM daps'
    searchBar.search(dap)
    dapManagementPage.assertNoResultFoundIsVisible()

    // Verify conditions in a selected active dap
    searchBar.clearSearchBoxByXIcon()
    dapManagementPage.clickDapById(29)
    searchBar.search(dapCondition)
    dapManagementPage.assertAmountOfSearchedConditionResults(1)

    // INACTIVE TAB
    dapManagementPage.clickTabByTitle('Inactive')

    dap = 'DAP TO SEARCH'
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResults(3)
    dapManagementPage.assertSearchResultListAccuracy([32, 33, 34])

    dap = 'dap to search'
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResults(3)
    dapManagementPage.assertSearchResultListAccuracy([32, 33, 34])

    dap = 'dAp To SEarch 4'
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResults(1)
    dapManagementPage.assertSearchResultListAccuracy([32])

    dap = 'randomName'
    searchBar.search(dap)
    dapManagementPage.assertNoResultFoundIsVisible()

    dap = 'SELECT * FROM daps'
    searchBar.search(dap)
    dapManagementPage.assertNoResultFoundIsVisible()

    // Verify conditions in a selected active dap
    searchBar.clearSearchBoxByXIcon()
    dapManagementPage.clickDapById(32)
    searchBar.search(dapCondition)
    dapManagementPage.assertAmountOfSearchedConditionResults(1)
  })

  /**
   *
   * @missing_data Need to have two DAPs, one in each active and inactive tabs, with special symbols in the profile name
   */
  it.skip('C7592110_DAP_Negative_Scenarios', () => {
    let dap = '1$¨(*&!¨_}º]+£`¬'
    let dapId = 45

    cy.log(' ---------------- ACTIVE TAB --------------------- ')

    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResults(1)
    dapManagementPage.assertSearchResultListAccuracy([dapId])

    dap = '1$¨'
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResults(1)
    dapManagementPage.assertSearchResultListAccuracy([dapId])

    dap = '£`¬'
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResults(1)
    dapManagementPage.assertSearchResultListAccuracy([dapId])

    dap = '[d]'
    searchBar.search(dap)
    dapManagementPage.assertNoResultFoundIsVisible()

    dap = '1$¨(*&!¨_}º]+£`¬'.repeat(25) // huge amount of chars to search
    searchBar.search(dap)
    dapManagementPage.assertNoResultFoundIsVisible()

    cy.log(' ---------------- INACTIVE TAB --------------------- ')

    // INACTIVE TAB
    dapManagementPage.clickTabByTitle('Inactive')

    dap = '(*&!¨_}º]'
    dapId = 46
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResults(1)
    dapManagementPage.assertSearchResultListAccuracy([dapId])

    dap = '(*&'
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResults(1)
    dapManagementPage.assertSearchResultListAccuracy([dapId])

    dap = '}º]'
    searchBar.search(dap)
    dapManagementPage.assertAmountOfSearchResults(1)
    dapManagementPage.assertSearchResultListAccuracy([dapId])

    dap = '[d]'
    searchBar.search(dap)
    dapManagementPage.assertNoResultFoundIsVisible()

    dap = '(*&!¨_}º]'.repeat(40) // huge amount of chars to search
    searchBar.search(dap)
    dapManagementPage.assertNoResultFoundIsVisible()
  })

  // ************************************************ TESTS AS CLIENTS ************************************************** //
})
