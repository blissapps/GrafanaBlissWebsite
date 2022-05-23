import EquityAdmin from '../../../../support/pages/equityAdmin'
import Utils from '../../../../support/utils'

const equityAdmin = new EquityAdmin()
const utils = new Utils()

describe('Data Access Profiles tests over User Management settings', () => {
  context('Tenant 1 settings over menu settings', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login()
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'dap')
      equityAdmin.dapManagementPage.checkPageUrl()
    })

    it('C16746114 Create a new DAP', () => {
      const dapName = 'Create new DAP no nested ' + utils.getRandomNumber()

      equityAdmin.dapManagementPage.clickCreateNewDap()
      equityAdmin.dapManagementPage.modifyEntityName(dapName)
      equityAdmin.dapManagementPage.modifyCondition([], [1, 'Business Unit'], [2, '112'])
      equityAdmin.dapManagementPage.saveEntityInformation()

      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
      equityAdmin.dapManagementPage.assertEntityIsDisplayedInTheList(dapName)
    })

    it('C16746115 DAP Create a new DAP with nested conditions', () => {
      const dapName = 'Create new DAP NESTED ' + utils.getRandomNumber()

      equityAdmin.dapManagementPage.clickCreateNewDap()
      equityAdmin.dapManagementPage.modifyEntityName(dapName)
      equityAdmin.dapManagementPage.modifyCondition([], [1, 'Business Unit'], [2, '112'])
      equityAdmin.dapManagementPage.addCondition(1, 2)
      equityAdmin.dapManagementPage.modifyCondition([3, 'or'], [4, 'Client id'], [5, '120'])
      equityAdmin.dapManagementPage.saveEntityInformation()

      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
      equityAdmin.dapManagementPage.assertEntityIsDisplayedInTheList(dapName)
    })

    /**
     * @bug_raised
     * SKIPPING DUE TO: https://globalshares.atlassian.net/browse/PB-920 and https://globalshares.atlassian.net/browse/PB-927
     */
    it.skip('C16746116 Create a new DAP without conditions', () => {
      const dapName = 'Created DAP ' + utils.getRandomNumber()

      // Without filling a name
      equityAdmin.dapManagementPage.clickCreateNewDap()
      equityAdmin.dapManagementPage.saveEntityInformation()
      equityAdmin.dapManagementPage.assertNotificationErrorDisplayed('Name should not be empty.')

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

    it('C16746117 Create a new DAP and discard the changes', () => {
      const dapName = 'Create and Discard DAP ' + utils.getRandomNumber()

      equityAdmin.dapManagementPage.clickCreateNewDap()
      equityAdmin.dapManagementPage.modifyEntityName(dapName)
      equityAdmin.dapManagementPage.modifyCondition([], [1, 'Business Unit'], [2, '112'])
      equityAdmin.dapManagementPage.discardEntityInformation()

      equityAdmin.dapManagementPage.assertDapDetailsContainerDisplayed(false)
      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed('New data access profile was discarded')
      equityAdmin.dapManagementPage.assertEntityIsDisplayedInTheList(dapName, false)
    })

    it('C16746118 Create a new DAP while assigning a group', () => {
      const dapName = 'Create DAP with GROUPS ' + utils.getRandomNumber()
      const groupName = ['Test1']
      const groupIdsToAssociate = [950]

      equityAdmin.dapManagementPage.clickCreateNewDap()
      equityAdmin.dapManagementPage.modifyEntityName(dapName)
      equityAdmin.dapManagementPage.modifyCondition([], [1, 'Business Unit'], [2, '112'])
      equityAdmin.dapManagementPage.addGroupsToDap(groupName, groupIdsToAssociate)
      equityAdmin.dapManagementPage.saveEntityInformation()

      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
      equityAdmin.dapManagementPage.assertNumberOfGroupRecordsAssociatedWithDap(1)
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupIdsToAssociate[0])
    })

    it('C16767633 DAP- Discard linked groups', () => {
      const dapName = 'Create DAP with GROUPS ' + utils.getRandomNumber()
      const groupNames = ['Test1']
      const groupIdsToAssociate = [950]

      equityAdmin.dapManagementPage.clickCreateNewDap()
      equityAdmin.dapManagementPage.modifyEntityName(dapName)
      equityAdmin.dapManagementPage.modifyCondition([], [1, 'Business Unit'], [2, '112'])
      equityAdmin.dapManagementPage.clickAddGroupsToDap()

      equityAdmin.selectSettingsL4Page.selectSettings('group', groupNames, groupIdsToAssociate)
      equityAdmin.selectSettingsL4Page.clickToDismissTheSelections()

      equityAdmin.dapManagementPage.assertNumberOfGroupRecordsAssociatedWithDap(0)
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupIdsToAssociate[0], false)
    })

    it('C16767634 DAP - Group search not found', () => {
      const dapName = 'Create DAP with GROUPS ' + utils.getRandomNumber()

      equityAdmin.dapManagementPage.clickCreateNewDap()
      equityAdmin.dapManagementPage.modifyEntityName(dapName)
      equityAdmin.dapManagementPage.modifyCondition([], [1, 'Business Unit'], [2, '112'])
      equityAdmin.dapManagementPage.clickAddGroupsToDap()

      equityAdmin.selectSettingsL4Page.searchEntity('Hello Hello')
      equityAdmin.selectSettingsL4Page.assertNoEntityToAddWereFoundIsDisplayed('No groups available to add were found')
    })

    it('C16767635 DAP- Deactivate a Data Access Profile', () => {
      const dapId = 29
      const dapName = 'Deactivate me'

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.clickToDeactivateEntity()
      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Deactivated', true, true)
      equityAdmin.dapManagementPage.assertInactiveDapsAreDisplayed()
      equityAdmin.dapManagementPage.assertEntityIsDisplayedInTheList(dapName)
      equityAdmin.dapManagementPage.assertDapIsEditable(false)
      equityAdmin.dapManagementPage.assertEntityNameEditable(false)
      equityAdmin.dapManagementPage.assertBadgeContainsText('INACTIVE')
    })

    it('C16767636 DAP- Activate a Data Access Profile', () => {
      const dapId = 30
      const dapName = 'Activate me'

      equityAdmin.dapManagementPage.clickTab('Inactive')
      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.activateDap()

      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Activated')
      equityAdmin.dapManagementPage.assertActiveDapsAreDisplayed()
      equityAdmin.dapManagementPage.assertEntityIsDisplayedInTheList(dapName)
      equityAdmin.dapManagementPage.assertDapIsEditable()
      equityAdmin.dapManagementPage.assertEntityNameEditable()
    })

    it('C16767637 DAP -Search a Data access profile', () => {
      const dapIds = [28]
      const dapConditionActiveTab = 'Client Id'

      equityAdmin.dapManagementPage.assertNoDapSelectedMessageIsDisplayed()

      // ACTIVE TAB
      let dap = 'pixel'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertAmountOfSearchResultsInTheList(3)
      equityAdmin.dapManagementPage.assertAndCountNumberOfSearchResults(3)
      equityAdmin.dapManagementPage.assertSearchResultListAccuracy(dapIds)
      equityAdmin.dapManagementPage.assertAllSearchResultItemsAreDisplayedInHighlightedMode()

      dap = 'PiXeL'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertAmountOfSearchResultsInTheList(3)
      equityAdmin.dapManagementPage.assertAndCountNumberOfSearchResults(3)
      equityAdmin.dapManagementPage.assertSearchResultListAccuracy(dapIds)
      equityAdmin.dapManagementPage.assertAllSearchResultItemsAreDisplayedInHighlightedMode()

      dap = 'PIXEL'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertAmountOfSearchResultsInTheList(3)
      equityAdmin.dapManagementPage.assertAndCountNumberOfSearchResults(3)
      equityAdmin.dapManagementPage.assertSearchResultListAccuracy(dapIds)
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
      equityAdmin.searchEngine.search(dapConditionActiveTab)
      equityAdmin.dapManagementPage.assertAmountOfSearchedConditionResults(1)
    })

    it('C16767639 DAP - Search inactive Data Access Profile', () => {
      const dapInactiveIds = [19]
      const dapConditionInactiveTab = 'Business Unit'

      equityAdmin.dapManagementPage.clickTab('Inactive')
      equityAdmin.dapManagementPage.assertInactiveDapsAreDisplayed()

      let dap = 'fish 2'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertAmountOfSearchResultsInTheList(1)
      equityAdmin.dapManagementPage.assertSearchResultListAccuracy(dapInactiveIds)
      equityAdmin.dapManagementPage.assertAllSearchResultItemsAreDisplayedInHighlightedMode()

      dap = 'FIsH 2'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertAmountOfSearchResultsInTheList(1)
      equityAdmin.dapManagementPage.assertSearchResultListAccuracy(dapInactiveIds)
      equityAdmin.dapManagementPage.assertAllSearchResultItemsAreDisplayedInHighlightedMode()

      dap = 'FISH'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertAmountOfSearchResultsInTheList(2)
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
      equityAdmin.searchEngine.search(dapConditionInactiveTab)
      equityAdmin.dapManagementPage.assertAmountOfSearchedConditionResults(1)
    })

    it('C16767638 DAP - Search not found for active DAP', () => {
      let dap = '1$1$'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertNoResultFoundIsVisible()

      dap = '1$¨'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertNoResultFoundIsVisible()

      dap = '£`¬'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertNoResultFoundIsVisible()

      dap = '[d]'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertNoResultFoundIsVisible()

      dap = '1$¨(*&!¨_}º]+£`¬'.repeat(25) // huge amount of chars to search
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertNoResultFoundIsVisible()
    })

    it('C16767640 DAP - Search not found for inactive DAP', () => {
      equityAdmin.dapManagementPage.clickTab('Inactive')
      equityAdmin.dapManagementPage.assertInactiveDapsAreDisplayed()

      let dap = '(*&!¨_}º]'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertNoResultFoundIsVisible()

      dap = '(*&'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertNoResultFoundIsVisible()

      dap = '}º]'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertNoResultFoundIsVisible()

      dap = '[d]'
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertNoResultFoundIsVisible()

      dap = '(*&!¨_}º]'.repeat(40) // huge amount of chars to search
      equityAdmin.searchEngine.search(dap)
      equityAdmin.dapManagementPage.assertNoResultFoundIsVisible()
    })

    it('C16767641 DAP- Duplicate a Data Access Profile', () => {
      const dapId = 22
      const dapName = 'QA 2'
      const newDapName = 'Duplicated from QA 2 ' + utils.getRandomNumber()
      const groupIdAssociated = 955

      // Duplicate DAP
      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertNumberOfGroupRecordsAssociatedWithDap(1)
      equityAdmin.dapManagementPage.assertNumberOfGroupCardsAssociatedWithDap(1)
      equityAdmin.dapManagementPage.clickToDuplicateEntity()

      // Duplicated DAP editions
      equityAdmin.dapManagementPage.assertEntityIsFocused()
      equityAdmin.dapManagementPage.assertEntityHeaderIsDisplayedAsExpected('Copy Of ' + dapName)
      equityAdmin.dapManagementPage.assertConditionsContainerDisplayedAsExpected()
      equityAdmin.dapManagementPage.modifyEntityName(newDapName)
      equityAdmin.dapManagementPage.saveEntityInformation()

      // Assert duplicated DAP editions
      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(newDapName + ' Saved', true, true)
      equityAdmin.dapManagementPage.assertEntityIsDisplayedInTheList(newDapName)
      equityAdmin.dapManagementPage.assertConditionValue(1, 'Client id')
      equityAdmin.dapManagementPage.assertConditionValue(2, '123')
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupIdAssociated, false)
      equityAdmin.dapManagementPage.assertNumberOfGroupRecordsAssociatedWithDap(0)
      equityAdmin.dapManagementPage.assertNumberOfGroupCardsAssociatedWithDap(0)
      equityAdmin.dapManagementPage.assertEntityIsFocused(false)
    })

    it('C17041143 DAP- Remove a group from Data Access Profile', () => {
      const dapId = 35
      const dapName = 'Remove group DAP'
      const groupIdsAssociated = [957, 958]

      // Remove Group
      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.removeGroupFromDap(groupIdsAssociated)
      equityAdmin.dapManagementPage.saveEntityInformation()
      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupIdsAssociated[0], false)
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupIdsAssociated[1], false)
    })

    it('C17041144 DAP - Created DAP with nested conditions with business unit and client id', () => {
      const dapName = 'DAP NESTED - Business and client ' + utils.getRandomNumber()

      equityAdmin.dapManagementPage.clickCreateNewDap()
      equityAdmin.dapManagementPage.modifyEntityName(dapName)
      equityAdmin.dapManagementPage.modifyCondition([], [1, 'Business Unit'], [2, '112'])
      equityAdmin.dapManagementPage.addCondition(1, 2)
      equityAdmin.dapManagementPage.modifyCondition([], [4, 'Client id'], [5, '123'])
      equityAdmin.dapManagementPage.saveEntityInformation()

      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
      equityAdmin.dapManagementPage.assertEntityIsDisplayedInTheList(dapName)
      equityAdmin.dapManagementPage.assertConditionValue(1, 'Business Unit')
      equityAdmin.dapManagementPage.assertConditionValue(2, '112')
      equityAdmin.dapManagementPage.assertConditionValue(3, 'and')
      equityAdmin.dapManagementPage.assertConditionValue(4, 'Client id')
      equityAdmin.dapManagementPage.assertConditionValue(5, '123')
    })

    it('C17041145 DAP - Create DAP with nested conditions with "is international mobile" and participant id', () => {
      const dapName = 'DAP NESTED - inter and participant ' + utils.getRandomNumber()

      equityAdmin.dapManagementPage.clickCreateNewDap()
      equityAdmin.dapManagementPage.modifyEntityName(dapName)
      equityAdmin.dapManagementPage.modifyCondition([], [1, 'Is international mobile?'], [2, 'Yes'], false)
      equityAdmin.dapManagementPage.addCondition(1, 2)
      equityAdmin.dapManagementPage.modifyCondition([3, 'or'], [4, 'Participant id'], [5, '110'])
      equityAdmin.dapManagementPage.saveEntityInformation()

      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
      equityAdmin.dapManagementPage.assertEntityIsDisplayedInTheList(dapName)
      equityAdmin.dapManagementPage.assertConditionValue(1, 'Is international mobile?')
      equityAdmin.dapManagementPage.assertConditionValue(2, 'Yes')
      equityAdmin.dapManagementPage.assertConditionValue(3, 'or')
      equityAdmin.dapManagementPage.assertConditionValue(4, 'Participant id')
      equityAdmin.dapManagementPage.assertConditionValue(5, '110')
    })

    it('C17041146 DAP - Create DAP with nested conditions with payroll id and residency', () => {
      const dapName = 'DAP NESTED - payroll and residency ' + utils.getRandomNumber()

      equityAdmin.dapManagementPage.clickCreateNewDap()
      equityAdmin.dapManagementPage.modifyEntityName(dapName)
      equityAdmin.dapManagementPage.modifyCondition([], [1, 'Payroll id'], [2, '100'])
      equityAdmin.dapManagementPage.addCondition(1, 2)
      equityAdmin.dapManagementPage.modifyCondition([3, 'and'], [4, 'Residency'], [5, 'China'])
      equityAdmin.dapManagementPage.saveEntityInformation()

      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
      equityAdmin.dapManagementPage.assertEntityIsDisplayedInTheList(dapName)
      equityAdmin.dapManagementPage.assertConditionValue(1, 'Payroll id')
      equityAdmin.dapManagementPage.assertConditionValue(2, '100')
      equityAdmin.dapManagementPage.assertConditionValue(3, 'and')
      equityAdmin.dapManagementPage.assertConditionValue(4, 'Residency')
      equityAdmin.dapManagementPage.assertConditionValue(5, 'China')
    })

    it('C17041147 DAP- Create DAP with nested condition with business id and tax status', () => {
      const dapName = 'DAP NESTED - business and tax ' + utils.getRandomNumber()

      equityAdmin.dapManagementPage.clickCreateNewDap()
      equityAdmin.dapManagementPage.modifyEntityName(dapName)
      equityAdmin.dapManagementPage.modifyCondition([], [1, 'Business'], [2, '123'])
      equityAdmin.dapManagementPage.addCondition(1, 2)
      equityAdmin.dapManagementPage.modifyCondition([3, 'or'], [4, 'Tax'], [5, 'MIFID W8- Non-US Tax Resident'], false)
      equityAdmin.dapManagementPage.saveEntityInformation()

      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
      equityAdmin.dapManagementPage.assertEntityIsDisplayedInTheList(dapName)
      equityAdmin.dapManagementPage.assertConditionValue(1, 'Business')
      equityAdmin.dapManagementPage.assertConditionValue(2, '123')
      equityAdmin.dapManagementPage.assertConditionValue(3, 'or')
      equityAdmin.dapManagementPage.assertConditionValue(4, 'Tax')
      equityAdmin.dapManagementPage.assertConditionValue(5, 'MIFID W8- Non-US Tax Resident')
    })

    it('C17555354 DAP - Remove a condition from an existing DAP', () => {
      const dapId = 51
      const dapName = 'GS 1'
      const dapIdToSearch = 49

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertConditionValue(4, 'Residency')
      equityAdmin.dapManagementPage.assertConditionValue(5, 'Angola')

      equityAdmin.dapManagementPage.removeCondition(2)
      equityAdmin.dapManagementPage.saveEntityInformation()
      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')

      equityAdmin.dapManagementPage.clickDapById(dapIdToSearch)
      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertConditionValue(4, 'Residency', false)
      equityAdmin.dapManagementPage.assertConditionValue(5, 'Angola', false)
    })

    it('C17555355 DAP - Discard DAP after removing a condition', () => {
      const dapId = 52
      const dapIdToSearch = 49

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertConditionValue(4, 'Tax status')
      equityAdmin.dapManagementPage.assertConditionValue(5, 'MIFID W8- Non-US Tax Resident')

      equityAdmin.dapManagementPage.removeCondition(2)
      equityAdmin.dapManagementPage.discardEntityInformation()
      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed('Changes to data access profile were discard')

      equityAdmin.dapManagementPage.clickDapById(dapIdToSearch)
      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertConditionValue(4, 'Tax status')
      equityAdmin.dapManagementPage.assertConditionValue(5, 'MIFID W8- Non-US Tax Resident')
    })

    it('C17555356 DAP - Rename a saved DAP', () => {
      const dapId = 53
      const dapName = 'GS 4'
      const newDapName = 'GS 5'

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertEntityHeaderIsDisplayedAsExpected(dapName)

      equityAdmin.dapManagementPage.modifyEntityName(newDapName)
      equityAdmin.dapManagementPage.assertEntityHeaderIsDisplayedAsExpected(newDapName)
      equityAdmin.dapManagementPage.saveEntityInformation()

      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(newDapName + ' Saved')

      equityAdmin.searchEngine.search(dapName)
      equityAdmin.dapManagementPage.assertNoResultFoundIsVisible()

      equityAdmin.searchEngine.search(newDapName)
      equityAdmin.dapManagementPage.assertSearchResultListAccuracy([dapId])
      equityAdmin.searchEngine.clearSearchBoxByXIcon()

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertEntityHeaderIsDisplayedAsExpected(newDapName)
    })

    it('C17675265 DAP - Change an existing value in the condition', () => {
      const dapId = 54
      const dapName = 'Home 1'

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertConditionValue(4, 'Participant')
      equityAdmin.dapManagementPage.assertConditionValue(5, '12231')

      equityAdmin.dapManagementPage.modifyCondition([], [], [5, '1122'])
      equityAdmin.dapManagementPage.saveEntityInformation()

      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
      equityAdmin.dapManagementPage.assertConditionValue(4, 'Participant')
      equityAdmin.dapManagementPage.assertConditionValue(5, '1122')
    })

    it('C17675266 DAP - change the existing condition and value', () => {
      const dapId = 55
      const dapName = 'Home 2'

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertConditionValue(4, 'Residency')
      equityAdmin.dapManagementPage.assertConditionValue(5, 'Belgium')

      equityAdmin.dapManagementPage.modifyCondition([], [], [4, 'Is international mobile?'], false)
      equityAdmin.dapManagementPage.modifyCondition([], [], [5, 'Yes'], false)
      equityAdmin.dapManagementPage.saveEntityInformation()

      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
      equityAdmin.dapManagementPage.assertConditionValue(4, 'Is international mobile?')
      equityAdmin.dapManagementPage.assertConditionValue(5, 'Yes')
    })

    it('C17774314 DAP - Discard changing DAP conditions', () => {
      const dapId = 56

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertConditionValue(7, 'Tax status')
      equityAdmin.dapManagementPage.assertConditionValue(8, 'MIFID W8- Non-US Tax Resident')

      equityAdmin.dapManagementPage.removeCondition(3)
      equityAdmin.dapManagementPage.assertConditionValue(7, 'Tax status', false)
      equityAdmin.dapManagementPage.assertConditionValue(8, 'MIFID W8- Non-US Tax Resident', false)

      equityAdmin.dapManagementPage.discardEntityInformation()

      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed('Changes to data access profile were discard')
      equityAdmin.dapManagementPage.assertConditionValue(7, 'Tax status')
      equityAdmin.dapManagementPage.assertConditionValue(8, 'MIFID W8- Non-US Tax Resident')

      equityAdmin.dapManagementPage.reloadPage()
      equityAdmin.dapManagementPage.assertConditionValue(7, 'Tax status')
      equityAdmin.dapManagementPage.assertConditionValue(8, 'MIFID W8- Non-US Tax Resident')
    })

    it('C9446198_Groups_Expand_And_Collapse_DAP_With_Many_Groups_added', () => {
      const dapId = 57

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertNumberOfGroupRecordsAssociatedWithDap(10)
      equityAdmin.dapManagementPage.assertNumberOfGroupCardsDisplayedInASection(8)

      equityAdmin.dapManagementPage.clickShowAll('groups')
      equityAdmin.dapManagementPage.assertNumberOfGroupCardsDisplayedInASection(10)

      equityAdmin.dapManagementPage.clickHide('groups')
      equityAdmin.dapManagementPage.assertNumberOfGroupCardsDisplayedInASection(8)
    })

    /**
     * @electron_only Network commands (specific turn back on the internet) are only manageable in Electron: https://github.com/cypress-io/cypress/issues/235
     */
    it('C17774316 DAP - Error message saving DAP when API is down', { browser: 'electron' }, () => {
      const dapId = 58
      const groupName = ['GB Test', 'CG Test']
      const groupIdsToAssociate = [969, 970]

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.addGroupsToDap(groupName, groupIdsToAssociate)

      // Go offline
      cy.network({ offline: true })
      cy.assertNetworkOnline({ online: false })

      equityAdmin.dapManagementPage.saveEntityInformation()
      equityAdmin.dapManagementPage.assertNotificationErrorDisplayed()

      // Tear down to go back online, so it does not affect other tests in the spec file
      cy.network({ offline: false })
      cy.assertNetworkOnline({ online: true })
    })

    it('C18105890 DAP - Happy Path - Alphabetically List Active and Inactive data access profile(s)', () => {
      // Active tab
      equityAdmin.dapManagementPage.assertActiveDapsAreDisplayed()
      equityAdmin.dapManagementPage.assertDapsInAlphabeticalOrder()

      // Inactive tab
      equityAdmin.dapManagementPage.clickTab('Inactive')
      equityAdmin.dapManagementPage.assertInactiveDapsAreDisplayed()
      equityAdmin.dapManagementPage.assertDapsInAlphabeticalOrder()
    })
  })

  context('Admin user over direct setting navigation (navigateToUrl) - CLIENT tenant perspective', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login()
    })

    it('C17774317 DAP - Empty state for a DAP', () => {
      equityAdmin.homePage.navigateToUrl('/tenant/552/settings/dap-management') // cashgen064

      equityAdmin.dapManagementPage.assertNoDapsExistMessageIsDisplayed()
      equityAdmin.dapManagementPage.assertCreateNewDapButtonDisplayed()
    })
  })

  context('Different logins', () => {
    it('C17833367 DAP - User does not have permission to link a group to the DAP', () => {
      const dapId = 60
      const groupId = 973

      equityAdmin.loginPage.login('ViewOnlyUser@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/dap-management')

      equityAdmin.dapManagementPage.assertActiveDapsAreDisplayed()

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertGroupAssociatedWithDap(groupId)
      equityAdmin.dapManagementPage.assertAddGroupsButtonIsVisible(false)
    })

    it('C17833368 DAP - User does not have create permission to add new DAP', () => {
      equityAdmin.loginPage.login('tlaw@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/dap-management')

      equityAdmin.dapManagementPage.assertActiveDapsAreDisplayed()
      equityAdmin.dapManagementPage.assertCreateNewDapButtonDisplayed(false)
      equityAdmin.dapManagementPage.clickTab('Inactive')
      equityAdmin.dapManagementPage.assertInactiveDapsAreDisplayed()
      equityAdmin.dapManagementPage.assertCreateNewDapButtonDisplayed(false)
    })

    it('C17833369 DAP - User does not have create permission to duplicate DAP', () => {
      const dapId = 60

      equityAdmin.loginPage.login('tlaw@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/dap-management')

      equityAdmin.dapManagementPage.clickDapById(dapId)

      equityAdmin.dapManagementPage.clickThreeDotOptionButton()
      equityAdmin.dapManagementPage.assertDuplicateEntityButtonDisplayed(false)
    })

    it('C17833370 DAP - User does not have update permission to modify the Access Filters', () => {
      const dapId = 60

      equityAdmin.loginPage.login('jachas@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/dap-management')
      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertActiveDapsAreDisplayed()

      equityAdmin.dapManagementPage.assertDapIsEditable(false)
      equityAdmin.dapManagementPage.assertAddGroupsButtonIsVisible(false)
    })

    it('C17854681 DAP - User does not have update permission to Activate a DAP', () => {
      const dapToDeactivateId = 60
      const dapToActivateId = 61

      equityAdmin.loginPage.login('jachas@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/dap-management')
      equityAdmin.dapManagementPage.clickDapById(dapToDeactivateId)
      equityAdmin.dapManagementPage.assertActiveDapsAreDisplayed()

      // Deactivate DAP option
      equityAdmin.dapManagementPage.clickDapById(dapToDeactivateId)
      equityAdmin.dapManagementPage.assertDapIsEditable(false)
      equityAdmin.dapManagementPage.clickThreeDotOptionButton()
      equityAdmin.dapManagementPage.assertDeactivateEntityButtonDisplayed(false)
      equityAdmin.dapManagementPage.assertAddGroupsButtonIsVisible(false)

      // Activate DAP option
      equityAdmin.dapManagementPage.clickTab('Inactive')
      equityAdmin.dapManagementPage.clickDapById(dapToActivateId)
      equityAdmin.dapManagementPage.assertDapIsEditable(false)
      equityAdmin.dapManagementPage.assertActivateDapButtonDisplayed(false)
      equityAdmin.dapManagementPage.assertAddGroupsButtonIsVisible(false)
    })

    it('C18105891 - Data Access Profile - User has only the view permission', () => {
      const dapId = 50

      equityAdmin.loginPage.login('viewonlyuser@globalshares.com')
      equityAdmin.homePage.navigateToUrl('/tenant/1/settings/dap-management')

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.assertEntityHeaderIsDisplayedAsExpected() // make sure the dap is loaded
      equityAdmin.dapManagementPage.assertThreeDotButtonDisplayed(false)
    })
  })
})
