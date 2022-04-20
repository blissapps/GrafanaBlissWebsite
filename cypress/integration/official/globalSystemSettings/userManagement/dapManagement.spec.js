import EquityAdmin from '../../../../support/pages/equityAdmin'
import Utils from '../../../../support/utils'

const equityAdmin = new EquityAdmin()
const utils = new Utils()

describe('Data Access Profiles tests over User Management settings', () => {
  context('Admin tenant user over menu settings', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login()
      equityAdmin.settingsMenuNavBar.accessGlobalSettingsMenu('user', 'dap')
      equityAdmin.dapManagementPage.checkPageUrl()
    })

    it('C16746114_Create a new DAP', () => {
      const dapName = 'Create new DAP no nested ' + utils.getRandomNumber()

      equityAdmin.dapManagementPage.clickCreateNewDap()
      equityAdmin.dapManagementPage.modifyEntityName(dapName)
      equityAdmin.dapManagementPage.modifyCondition([], [1, 'Business Unit'], [2, '112'])
      equityAdmin.dapManagementPage.saveEntityInformation()

      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed(dapName + ' Saved')
      equityAdmin.dapManagementPage.assertEntityIsDisplayedInTheList(dapName)
    })

    it('C16746115_DAP_Create a new DAP with nested conditions', () => {
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
    it.skip('C16746116_Create a new DAP without conditions', () => {
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

    it('C16746117_Create a new DAP and discard the changes', () => {
      const dapName = 'Create and Discard DAP ' + utils.getRandomNumber()

      equityAdmin.dapManagementPage.clickCreateNewDap()
      equityAdmin.dapManagementPage.modifyEntityName(dapName)
      equityAdmin.dapManagementPage.modifyCondition([], [1, 'Business Unit'], [2, '112'])
      equityAdmin.dapManagementPage.discardEntityInformation()

      equityAdmin.dapManagementPage.assertDapDetailsContainerDisplayed(false)
      equityAdmin.dapManagementPage.assertToastNotificationMessageIsDisplayed('New data access profile was discarded')
      equityAdmin.dapManagementPage.assertEntityIsDisplayedInTheList(dapName, false)
    })

    it('C16746118_Create a new DAP while assigning a group', () => {
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
  })
})
