import DapManagementPage from '../../../support/pages/globalSettingsPages/userManagementPages/dapManagementPage'
import LeftMenuNavBar from '../../../support/components/leftMenuNavBar'

describe('Data Access Profiles tests over User Management settings', () => {
  const dapManagementPage = new DapManagementPage()

  const leftMenuNavBar = new LeftMenuNavBar()

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
  it.skip('C7564744_DAP_Rename_The_DAP', () => {
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
   * @missing_data Need to have a simple DAP created with a single condition
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

  // ************************************************ TESTS AS CLIENTS ************************************************** //
})
