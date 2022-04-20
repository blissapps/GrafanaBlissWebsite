import EquityAdmin from '../../../../support/pages/equityAdmin'
import Utils from '../../../../support/utils'

const equityAdmin = new EquityAdmin()
const utils = new Utils()

describe('Data Access Profiles tests over User Management settings', () => {
  context('Default user', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login()
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'dap')
      equityAdmin.dapManagementPage.checkPageUrl()
    })

    // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

    /**
     * Verify if the settings send the user back to the home screen when the user closes the settings
     *
     * Waiting for @IDS
     */
    it('C7564741_DAP_Check_The_System_Behavior_When_Closing_The_Settings_Nav_Bar', () => {
      equityAdmin.settingsMenuNavBar.closeGlobalSettingsNavBar()
      equityAdmin.dapManagementPage.checkPageUrl()
    })

    /**
     * @missing_data Need to have an active DAP available. Need to have at least two groups available to be added. Also, it need to have 2 groups already associated
     */
    it.skip('C7592112 - List, add, remove and discard a Group from a Data Access Profile - Full path', () => {
      const dapId = 7
      const dapName = 'List, add, remove, and discard a Group'
      const groupsAlreadyAddedIds = [1049, 1050]
      const groupsToEditName = ['Add Group 1 to DAP', 'Add Group 2 to DAP']
      const groupsToEditIds = [1046, 1045]

      // View groups already associated
      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupsAlreadyAddedIds[0])
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupsAlreadyAddedIds[1])

      // Add Groups
      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.addGroupsToDap(groupsToEditName, groupsToEditIds)
      equityAdmin.dapManagementPage.saveEntityInformation()
      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved', true, true)
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupsToEditIds[0])
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupsToEditIds[1])

      // Remove Group
      equityAdmin.dapManagementPage.removeGroupFromDap([groupsToEditIds[0]])
      equityAdmin.dapManagementPage.saveEntityInformation()
      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved', true, true)
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupsToEditIds[0], false)

      // Remove Groups and discard editions
      equityAdmin.dapManagementPage.removeGroupFromDap([groupsToEditIds[1]])
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupsToEditIds[1], false)
      equityAdmin.dapManagementPage.discardEntityInformation()
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupsToEditIds[1])
      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed('Changes to data access profile were discard', true, true)

      // Add Groups and discard editions
      equityAdmin.dapManagementPage.addGroupsToDap([groupsToEditName[0]], [groupsToEditIds[0]])
      equityAdmin.dapManagementPage.discardEntityInformation()
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupsToEditIds[0], false)
      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed('Changes to data access profile were discard')

      //teardown
      equityAdmin.dapManagementPage.removeGroupFromDap([groupsToEditIds[1]])
      equityAdmin.dapManagementPage.saveEntityInformation()
    })

    /**
     * @missing_data Need to have at least 2 active and 2 inactive DAP created
     */
    it.skip('C7544057_DAP_Happy_Path_Alphabetically_List_Active_And_Inactive_Data_Access_Profile(s)', () => {
      // Active tab
      equityAdmin.dapManagementPage.assertActiveDapsAreDisplayed()
      equityAdmin.dapManagementPage.assertDapsInAlphabeticalOrder()

      // Inactive tab
      equityAdmin.dapManagementPage.clickTab('Inactive')
      equityAdmin.dapManagementPage.assertInactiveDapsAreDisplayed()
      equityAdmin.dapManagementPage.assertDapsInAlphabeticalOrder()
    })

    /**
     * @missing_data There are no DAPs neither in active nor inactive status
     */
    it.skip('C7544059_DAP_Empty_State_Active_And_Inactive_Data_Access_Profile(s)', () => {
      // Active tab
      equityAdmin.dapManagementPage.assertActiveDapsAreDisplayed(false)
      equityAdmin.dapManagementPage.assertNoDapsExistMessageIsDisplayed()

      //Inactive tab
      equityAdmin.dapManagementPage.clickTab('Inactive')
      equityAdmin.dapManagementPage.assertInactiveDapsAreDisplayed(false)
      equityAdmin.dapManagementPage.assertNoDapsExistMessageIsDisplayed()
    })

    /**
     * @missing_data Need to have a DAP with 3 groups associated
     */
    it.skip('C15460659_DAP_View_Groups_Linked_To_DAP', () => {
      const dapId = 7
      const groupIdAssociated = [963, 964, 965]

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertNumberOfGroupRecordsAssociatedWithDap(3)
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupIdAssociated[0])
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupIdAssociated[1])
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupIdAssociated[2])
    })

    /**
     * @missing_data Need to have a DAP and 2 groups available to be added. These groups should only be used in this test
     */
    it.skip('C9277650_DAP_Link_Groups_To_DAP', () => {
      const dapId = 11
      const dapName = 'Add groups'
      const groupName = ['Group to be added in DAP 1', 'Group to be added in DAP 2']
      const groupIdsToAssociate = [966, 967]

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.addGroupsToDap(groupName, groupIdsToAssociate)
      equityAdmin.dapManagementPage.saveEntityInformation()

      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
      equityAdmin.dapManagementPage.assertNumberOfGroupRecordsAssociatedWithDap(2)
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupIdsToAssociate[0])
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupIdsToAssociate[1])

      // So go to groups and see if the association is made
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('', 'group', false)
      equityAdmin.groupManagementPage.clickGroupById(groupIdsToAssociate[0])
      equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapId)
      equityAdmin.groupManagementPage.clickGroupById(groupIdsToAssociate[1])
      equityAdmin.groupManagementPage.assertDapAssociatedWithGroup(dapId)
    })

    /**
     * @missing_data Need to have a DAP and any 2 groups available to be added and discarded
     */
    it.skip('C9277651_DAP_Discard_Draft_Linked_Groups', () => {
      const dapId = 13
      const groupName = ['Group to be added in DAP 1', 'Group to be added in DAP 2']
      const groupIdsToAssociate = [966, 967]

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.addGroupsToDap(groupName, groupIdsToAssociate)
      equityAdmin.dapManagementPage.discardEntityInformation()

      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed('Changes to data access profile were discard')
      equityAdmin.dapManagementPage.assertNumberOfGroupRecordsAssociatedWithDap(0)
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupIdsToAssociate[0], false)
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupIdsToAssociate[1], false)
    })

    /**
     * @missing_data Need to have a DAP and any 2 groups available with 2 existing groups linked
     *
     * @chrome_only Network commands are only manageable for chrome based browsers
     */
    it.skip('C9277652_DAP_Error_Linked_Groups_To_DAPs_Cannot_Connect_API_Timeout', { browser: '!firefox' }, () => {
      const dapId = 14
      const groupName = ['Group to be added in DAP 1', 'Group to be added in DAP 2']
      const groupIdsToAssociate = [966, 967]

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.addGroupsToDap(groupName, groupIdsToAssociate)

      cy.network({ offline: true }) && cy.assertNetworkOnline({ online: false })

      equityAdmin.dapManagementPage.saveEntityInformation()
      equityAdmin.dapManagementPage.assertNotificationErrorDisplayed()
      cy.network({ offline: false }) && cy.assertNetworkOnline({ online: true })
    })

    it('C8981124_DAP_Create_DAP_With_No_Nested_Conditions', () => {
      const dapName = 'Create new DAP no nested ' + utils.getRandomNumber()

      equityAdmin.dapManagementPage.clickCreateNewDap()
      equityAdmin.dapManagementPage.modifyEntityName(dapName)
      equityAdmin.dapManagementPage.modifyCondition([], [1, 'Client id'], [2, '11'])
      equityAdmin.dapManagementPage.saveEntityInformation()

      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
      equityAdmin.dapManagementPage.assertEntityIsDisplayedInTheList(dapName)

      equityAdmin.dapManagementPage.reloadPage()
      equityAdmin.dapManagementPage.clickEntityByName(dapName)
      equityAdmin.dapManagementPage.assertConditionValue(1, 'Client id')
      equityAdmin.dapManagementPage.assertConditionValue(2, '11')
    })

    it('C8981125_DAP_Create_DAP_With_Nested_Conditions', () => {
      const dapName = 'Create new DAP NESTED ' + utils.getRandomNumber()

      equityAdmin.dapManagementPage.clickCreateNewDap()
      equityAdmin.dapManagementPage.modifyEntityName(dapName)
      equityAdmin.dapManagementPage.modifyCondition([], [1, 'Client id'], [2, '11'])
      equityAdmin.dapManagementPage.addCondition(1, 2)
      equityAdmin.dapManagementPage.modifyCondition([3, 'or'], [4, 'Client id'], [5, '11'])
      equityAdmin.dapManagementPage.saveEntityInformation()

      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
      equityAdmin.dapManagementPage.assertEntityIsDisplayedInTheList(dapName)

      equityAdmin.dapManagementPage.reloadPage()
      equityAdmin.dapManagementPage.clickEntityByName(dapName)
      equityAdmin.dapManagementPage.assertConditionValue(1, 'Client id')
      equityAdmin.dapManagementPage.assertConditionValue(2, '11')
      equityAdmin.dapManagementPage.assertConditionValue(3, 'or')
      equityAdmin.dapManagementPage.assertConditionValue(4, 'Client id')
      equityAdmin.dapManagementPage.assertConditionValue(5, '11')
    })

    it('C8981126_DAP_Discard_Unsaved_DAP', () => {
      const dapName = 'Create and Discard DAP ' + utils.getRandomNumber()

      equityAdmin.dapManagementPage.clickCreateNewDap()
      equityAdmin.dapManagementPage.modifyEntityName(dapName)
      equityAdmin.dapManagementPage.modifyCondition([], [1, 'Client id'], [2, '11'])
      equityAdmin.dapManagementPage.discardEntityInformation()

      equityAdmin.dapManagementPage.assertDapDetailsContainerDisplayed(false)
      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed('New data access profile was discarded')
      equityAdmin.dapManagementPage.assertEntityIsDisplayedInTheList(dapName, false)
    })

    /**
     * @bug_raised
     * SKIPPING DUE TO: https://globalshares.atlassian.net/browse/PB-920 and https://globalshares.atlassian.net/browse/PB-927
     */
    it.skip('C8981127_DAP_Save_Without_Name_And_Conditions', () => {
      const dapName = 'Created DAP ' + utils.getRandomNumber()

      // Without filling a name
      equityAdmin.dapManagementPage.clickCreateNewDap()
      equityAdmin.dapManagementPage.saveEntityInformation()
      equityAdmin.dapManagementPage.assertNotificationErrorDisplayed('Name/Condition cannot be empty')

      // Without filling conditions
      equityAdmin.dapManagementPage.modifyEntityName(dapName)
      equityAdmin.dapManagementPage.saveEntityInformation()
      equityAdmin.dapManagementPage.assertNotificationErrorDisplayed('Name/Condition cannot be empty')

      // Without filling conditions and with a name with size > 50 chars
      equityAdmin.dapManagementPage.modifyEntityName(dapName + dapName + dapName)
      equityAdmin.dapManagementPage.saveEntityInformation()
      equityAdmin.dapManagementPage.assertNotificationErrorDisplayed('Name length must be 50 characters or fewer')

      // Save now with everything all right
      equityAdmin.dapManagementPage.modifyEntityName(dapName)
      equityAdmin.dapManagementPage.modifyCondition([], [1, 'Client id'], [2, '11'])
      equityAdmin.dapManagementPage.saveEntityInformation()
      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
      equityAdmin.dapManagementPage.assertEntityIsDisplayedInTheList(dapName)
      equityAdmin.dapManagementPage.assertNotificationErrorDisplayed('Name/Condition cannot be empty', false)
      equityAdmin.dapManagementPage.assertNotificationErrorDisplayed('Name length must be 50 characters or fewer', false)
    })

    /**
     * @missing_data Need to have a DAP with one group and one condition associated
     */
    it.skip('C7564743_DAP_Load_Current_Conditions', () => {
      const dapId = 10
      const dapName = 'Dap1'
      const groupIds = [957]

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertEntityHeaderIsDisplayedAsExpected(dapName)
      equityAdmin.dapManagementPage.assertConditionsContainerDisplayedAsExpected()
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupIds[0])
    })

    /**
     * @missing_data Need to have a simple DAP created
     */
    it.skip('C7564744_DAP_Rename_DAP', () => {
      const dapId = 20
      const newDapName = 'DAP was renamed'

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.modifyEntityName(newDapName)
      equityAdmin.dapManagementPage.assertEntityHeaderIsDisplayedAsExpected(newDapName)
      equityAdmin.dapManagementPage.saveEntityInformation()
      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(newDapName + ' Saved')
    })

    /**
     * @missing_data Need to have a simple DAP created with a single condition
     */
    it.skip('C7564745_DAP_Change_An_Existing_Condition', () => {
      const dapId = 30
      const dapName = 'Change condition'

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.modifyCondition([], [1, 'Client id'], [2, '11'])
      equityAdmin.dapManagementPage.saveEntityInformation()

      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
      equityAdmin.dapManagementPage.reloadPage()
      equityAdmin.dapManagementPage.assertConditionValue(1, 'Client id')
      equityAdmin.dapManagementPage.assertConditionValue(2, '11')
    })

    /**
     * @missing_data Need to have a simple DAP created with a single condition
     */
    it.skip('C7564746_DAP_Add_Condition_On_Same_Level', () => {
      const dapId = 3
      const dapName = 'Add condition same level'

      equityAdmin.dapManagementPage.clickDapById(dapId)

      equityAdmin.dapManagementPage.addCondition(1, 1)
      equityAdmin.dapManagementPage.modifyCondition([3, 'or'], [4, 'Client id'], [5, '11'])
      equityAdmin.dapManagementPage.saveEntityInformation()
      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')

      equityAdmin.dapManagementPage.reloadPage()
      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertConditionValue(3, 'or')
      equityAdmin.dapManagementPage.assertConditionValue(4, 'Client id')
      equityAdmin.dapManagementPage.assertConditionValue(5, '11')
    })

    /**
     * @missing_data Need to have a simple DAP created with a single condition
     */
    it.skip('C7564747_DAP_Add_Nested_Condition', () => {
      const dapId = 4
      const dapName = 'Add nested condition'

      equityAdmin.dapManagementPage.clickDapById(dapId)

      equityAdmin.dapManagementPage.addCondition(1, 2)
      equityAdmin.dapManagementPage.modifyCondition([], [4, 'Client id'], [5, '11'])
      equityAdmin.dapManagementPage.saveEntityInformation()
      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')

      equityAdmin.dapManagementPage.reloadPage()
      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertConditionValue(4, 'Client id')
      equityAdmin.dapManagementPage.assertConditionValue(5, '11')
    })

    /**
     * @missing_data Need to have a simple DAP created with two conditions created
     */
    it.skip('C7564748_DAP_Remove_Condition', () => {
      const dapId = 5
      const dapName = 'Remove condition'

      equityAdmin.dapManagementPage.clickDapById(dapId)

      equityAdmin.dapManagementPage.removeCondition(2)
      equityAdmin.dapManagementPage.saveEntityInformation()
      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')

      equityAdmin.dapManagementPage.reloadPage()
      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertConditionValue(4, 'Client id', false)
      equityAdmin.dapManagementPage.assertConditionValue(5, '11', false)
    })

    /**
     * @missing_data Need to have a simple DAP created with only one condition created
     */
    it.skip('C7564749_DAP_Discard_Changes_Condition', () => {
      const dapId = 6

      equityAdmin.dapManagementPage.clickDapById(dapId)

      equityAdmin.dapManagementPage.addCondition(1, 2)
      equityAdmin.dapManagementPage.modifyCondition([], [4, 'Client id'], [5, '11'])
      equityAdmin.dapManagementPage.discardEntityInformation()
      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed('Changes to data access profile were discard')
    })

    /**
     * @missing_data Need to have a two simple DAPs created
     *
     */
    it.skip('C7564750_DAP_Try_To_Leave_Existing_DAP_Name_Blank', () => {
      const dapId = 47
      const dapName = 'Existing DAP name blank'
      const dapIdToChangeFocus = 8

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.modifyEntityName('{backspace}')
      equityAdmin.dapManagementPage.saveEntityInformation()
      equityAdmin.dapManagementPage.assertNotificationErrorDisplayed('Name should not be empty.')

      equityAdmin.dapManagementPage.clickDapById(dapIdToChangeFocus)
      equityAdmin.dapManagementPage.assertEntityHeaderIsDisplayedAsExpected() // This assertion in here just make sure the second dap was loaded
      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertEntityHeaderIsDisplayedAsExpected(dapName)
    })

    /**
     * @missing_data Need to have an active DAP created in the active tab with no groups associated with it
     *
     */
    it.skip('C7568176_DAP_Deactivate_And_Activate_DAP', () => {
      const dapId = 13
      const dapName = 'Deactivate me'

      // Deactivate DAP
      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.clickToDeactivateEntity()

      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Deactivated', true, true)
      equityAdmin.dapManagementPage.assertInactiveDapsAreDisplayed()
      equityAdmin.dapManagementPage.assertEntityIsDisplayedInTheList(dapName)
      equityAdmin.dapManagementPage.assertDapEditable(false)

      // Activate DAP
      equityAdmin.dapManagementPage.activateDap()

      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Activated')
      equityAdmin.dapManagementPage.assertActiveDapsAreDisplayed()
      equityAdmin.dapManagementPage.assertEntityIsDisplayedInTheList(dapName)
      equityAdmin.dapManagementPage.assertDapEditable()
    })

    /**
     * @missing_data Need to have some 3 daps called 'dap to search Nº' in each active and inactive tabs. Also need to have another dap called 'other group dap' in both active and inactive tab.
     *               All daps must have just one 'Business Unit' conditions added
     */
    it.skip('C7592109_DAP_Search_Functionality', () => {
      let dap = 'DAP TO SEARCH'
      const dapIds = [42, 43, 44]
      const dapInactiveIds = [12, 14, 16]
      const dapCondition = 'Business'

      equityAdmin.dapManagementPage.assertNoDapSelectedMessageIsDisplayed()

      // ACTIVE TAB
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertAmountOfSearchResultsInTheList(3)
      equityAdmin.dapManagementPage.assertSearchResultListAccuracy(dapIds)
      equityAdmin.dapManagementPage.assertAllSearchResultItemsAreDisplayedInHighlightedMode()

      dap = 'dap to search'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertAmountOfSearchResultsInTheList(3)
      equityAdmin.dapManagementPage.assertSearchResultListAccuracy(dapIds)
      equityAdmin.dapManagementPage.assertAllSearchResultItemsAreDisplayedInHighlightedMode()

      dap = 'dAp To SEarch 1'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertAmountOfSearchResultsInTheList(1)
      equityAdmin.dapManagementPage.assertSearchResultListAccuracy([dapIds[0]])
      equityAdmin.dapManagementPage.assertAllSearchResultItemsAreDisplayedInHighlightedMode()

      dap = 'randomName' + utils.getRandomNumber()
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertNoResultFoundIsVisible()

      dap = 'SELECT * FROM daps'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertNoResultFoundIsVisible()

      // Verify conditions in a selected active dap
      equityAdmin.searchEngine.clearSearchBoxByXIcon()
      equityAdmin.dapManagementPage.clickDapById(dapIds[0])
      equityAdmin.searchEngine.search(dapCondition)
      equityAdmin.dapManagementPage.assertAmountOfSearchedConditionResults(1)

      // INACTIVE TAB
      equityAdmin.dapManagementPage.clickTab('Inactive')

      dap = 'DAP TO SEARCH'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertAmountOfSearchResultsInTheList(3)
      equityAdmin.dapManagementPage.assertSearchResultListAccuracy(dapInactiveIds)
      equityAdmin.dapManagementPage.assertAllSearchResultItemsAreDisplayedInHighlightedMode()

      dap = 'dap to search'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertAmountOfSearchResultsInTheList(3)
      equityAdmin.dapManagementPage.assertSearchResultListAccuracy(dapInactiveIds)
      equityAdmin.dapManagementPage.assertAllSearchResultItemsAreDisplayedInHighlightedMode()

      dap = 'dAp To SEarch 4'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertAmountOfSearchResultsInTheList(1)
      equityAdmin.dapManagementPage.assertSearchResultListAccuracy([dapInactiveIds[0]])
      equityAdmin.dapManagementPage.assertAllSearchResultItemsAreDisplayedInHighlightedMode()

      dap = 'randomName'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertNoResultFoundIsVisible()

      dap = 'SELECT * FROM daps'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertNoResultFoundIsVisible()

      // Verify conditions in a selected active dap
      equityAdmin.searchEngine.clearSearchBoxByXIcon()
      equityAdmin.dapManagementPage.clickDapById(dapInactiveIds[0])
      equityAdmin.searchEngine.search(dapCondition)
      equityAdmin.dapManagementPage.assertAmountOfSearchedConditionResults(1)
    })

    /**
     *
     * @missing_data Need to have two DAPs, one in each active and inactive tabs, with special symbols in the profile name
     */
    it.skip('C7592110_DAP_Negative_Scenarios', () => {
      let dap = '1$¨(*&!¨_}º]+£`¬'
      let dapId = 45

      cy.log(' ---------------- ACTIVE TAB --------------------- ')

      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertAmountOfSearchResultsInTheList(1)
      equityAdmin.dapManagementPage.assertSearchResultListAccuracy([dapId])

      dap = '1$¨'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertAmountOfSearchResultsInTheList(1)
      equityAdmin.dapManagementPage.assertSearchResultListAccuracy([dapId])

      dap = '£`¬'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertAmountOfSearchResultsInTheList(1)
      equityAdmin.dapManagementPage.assertSearchResultListAccuracy([dapId])

      dap = '[d]'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertNoResultFoundIsVisible()

      dap = '1$¨(*&!¨_}º]+£`¬'.repeat(25) // huge amount of chars to search
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertNoResultFoundIsVisible()

      cy.log(' ---------------- INACTIVE TAB --------------------- ')

      // INACTIVE TAB
      equityAdmin.dapManagementPage.clickTab('Inactive')

      dap = '(*&!¨_}º]'
      dapId = 46
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertAmountOfSearchResultsInTheList(1)
      equityAdmin.dapManagementPage.assertSearchResultListAccuracy([dapId])

      dap = '(*&'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertAmountOfSearchResultsInTheList(1)
      equityAdmin.dapManagementPage.assertSearchResultListAccuracy([dapId])

      dap = '}º]'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertAmountOfSearchResultsInTheList(1)
      equityAdmin.dapManagementPage.assertSearchResultListAccuracy([dapId])

      dap = '[d]'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertNoResultFoundIsVisible()

      dap = '(*&!¨_}º]'.repeat(40) // huge amount of chars to search
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertNoResultFoundIsVisible()
    })

    /**
     * @missing_data Need to have an active DAP created with a single condition(if > Business Unit > 1) and with a group attached
     *
     */
    it.skip('C7568169_DAP_Duplicate_DAP', () => {
      const dapId = 9
      const dapName = 'Duplicate me'
      const newDapName = 'Duplicated DAP ' + utils.getRandomNumber()
      const groupIdAssociated = 1051

      // Duplicate DAP
      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertNumberOfGroupRecordsAssociatedWithDap(1)
      equityAdmin.dapManagementPage.assertNumberOfGroupCardsAssociatedWithDap(1)
      equityAdmin.dapManagementPage.clickToDuplicateEntity()

      // Duplicated DAP editions
      equityAdmin.dapManagementPage.assertEntityIsFocused()
      equityAdmin.dapManagementPage.assertEntityHeaderIsDisplayedAsExpected('Copy Of ' + dapName)
      equityAdmin.dapManagementPage.modifyEntityName(newDapName)
      equityAdmin.dapManagementPage.saveEntityInformation()

      // Assert duplicated DAP editions
      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(newDapName + ' Saved', true, true)
      equityAdmin.dapManagementPage.assertEntityIsDisplayedInTheList(newDapName)
      equityAdmin.dapManagementPage.assertConditionValue(1, 'Business Unit')
      equityAdmin.dapManagementPage.assertConditionValue(2, '1')
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupIdAssociated, false)
      equityAdmin.dapManagementPage.assertNumberOfGroupRecordsAssociatedWithDap(0)
      equityAdmin.dapManagementPage.assertNumberOfGroupCardsAssociatedWithDap(0)
      equityAdmin.dapManagementPage.assertEntityIsFocused(false)
    })

    /**
     * @missing_data Need to have a DAP with 1 role and with 13 Groups linked to a this DAP
     *
     * @bug_raised
     * SKIPPING DUE TO https://globalshares.atlassian.net/browse/PB-949
     */
    it.skip('C9446198_Groups_Expand_And_Collapse_DAP_With_Many_Groups_added', () => {
      const dapId = 58

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertNumberOfGroupCardsDisplayedInASection(13, true)
      equityAdmin.dapManagementPage.clickHide('groups')
      equityAdmin.dapManagementPage.assertNumberOfGroupCardsDisplayedInASection(8)
    })

    // ************************************************ TESTS AS CLIENTS ************************************************** //
  })

  context('View Only User', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login(Cypress.env('VIEW_ONLY_USER_2_AUTH'))
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'dap')
      equityAdmin.dapManagementPage.checkPageUrl()
    })

    /**
     * @missing_data Need to have a user with more than 1 client assigned (to make sure the landing page is the home page) and 1 DAP with the proper given access to this user
     *
     */
    it.skip('C9277653_DAP_User_Does_Not_Have_Permission_Needed_To_Link_A_Group_To_The_DAP', () => {
      const dapId = 7

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertAddGroupsButtonIsVisible(false)
    })

    /**
     * @missing_data Need to have a user with only View permissions to see DAPS. Also, need to have 1 DAP available to use in the active tab, and another 1 in the inactive tab
     *
     */
    it.skip('C8981128_DAP_User_Does_Not_Have_Create_Permission_For_AccessFilters', () => {
      const dapActiveId = 7
      const dapInactiveId = 9

      // Active tab
      equityAdmin.dapManagementPage.clickTab('active')
      equityAdmin.dapManagementPage.clickDapById(dapActiveId)
      equityAdmin.dapManagementPage.assertThreeDotButtonDisplayed(false)
      equityAdmin.dapManagementPage.assertCreateNewDapButtonDisplayed(false)

      // Inactive tab
      equityAdmin.dapManagementPage.clickTab('inactive')
      equityAdmin.dapManagementPage.clickDapById(dapInactiveId)
      equityAdmin.dapManagementPage.assertThreeDotButtonDisplayed(false)
      equityAdmin.dapManagementPage.assertCreateNewDapButtonDisplayed(false)
    })

    /**
     * @missing_data Need to have a user with only view permissions to AccessFilters
     *
     */
    it.skip('C8781224_DAP_User_Does_Not_Have_Update_Permission_For_AccessFilters', () => {
      const dapId = 7

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertDapEditable(false)
      equityAdmin.dapManagementPage.assertAddGroupsButtonIsVisible(false)
    })

    /**
     * @missing_data Need to have an active DAP created, so we can try to duplicate it
     *
     */
    it.skip('C7568170 - Data Access Profile - User does not have the AccessFilters -> Create Permission', () => {
      const dapId = 7

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertThreeDotButtonDisplayed(false)
    })

    /**
     * @missing_data Need to have an active DAP created, so we can try to duplicate it
     *
     */
    it.skip('C7568178 - Data Access Profile - User does not have the AccessFilters->Update Permission', () => {
      const dapToDeactivateId = 7
      const dapToActivateId = 11

      // Deactivate DAP option
      equityAdmin.dapManagementPage.clickDapById(dapToDeactivateId)
      equityAdmin.dapManagementPage.assertDapEditable(false)
      equityAdmin.dapManagementPage.assertThreeDotButtonDisplayed(false)

      // Activate DAP option
      equityAdmin.dapManagementPage.clickTab('Inactive')
      equityAdmin.dapManagementPage.clickDapById(dapToActivateId)
      equityAdmin.dapManagementPage.assertActivateDapButtonDisplayed(false)
    })
  })
})
