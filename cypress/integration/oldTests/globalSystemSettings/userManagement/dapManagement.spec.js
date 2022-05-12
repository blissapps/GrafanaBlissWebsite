import EquityAdmin from '../../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Data Access Profiles tests over User Management settings', () => {
  context('Default user', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login()
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'dap')
      equityAdmin.dapManagementPage.checkPageUrl()
    })

    // ************************************************ TESTS AS ADMIN TENANT ************************************************** //

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
     * @missing_data Need to have a DAP and any 2 groups available with 2 existing groups linked
     *
     * @chrome_only Network commands are only manageable for chrome based browsers
     */
    it.skip('C9277652_DAP_Error_Linked_Groups_To_DAPs_Cannot_Connect_API_Timeout', { browser: '!firefox' }, () => {
      const dapId = 34
      const groupName = ['Test1', 'Test Content']
      const groupIdsToAssociate = [950, 955]

      equityAdmin.dapManagementPage.clickDapById(dapId)
      equityAdmin.dapManagementPage.addGroupsToDap(groupName, groupIdsToAssociate)

      // Offline
      cy.network({ offline: true })
      cy.assertNetworkOnline({ online: false })

      equityAdmin.dapManagementPage.saveEntityInformation()
      equityAdmin.dapManagementPage.assertNotificationErrorDisplayed()
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
      equityAdmin.dapManagementPage.assertDapIsEditable(false)
      equityAdmin.dapManagementPage.assertThreeDotButtonDisplayed(false)
      equityAdmin.dapManagementPage.assertAddGroupsButtonIsVisible(false)

      // Activate DAP option
      equityAdmin.dapManagementPage.clickTab('Inactive')
      equityAdmin.dapManagementPage.clickDapById(dapToActivateId)
      equityAdmin.dapManagementPage.assertActivateDapButtonDisplayed(false)
      equityAdmin.dapManagementPage.assertAddGroupsButtonIsVisible(false)
    })
  })
})
