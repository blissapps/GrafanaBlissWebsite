import EquityAdmin from '../../../../../support/pages/equityAdmin'
import Utils from '../../../../../support/utils'

const equityAdmin = new EquityAdmin()
const utils = new Utils()

describe('Creating Framework - Error Scenarios', () => {
  context('Creating Framework', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login()
      equityAdmin.homePage.navigateToUrl('/regulatory/frameworks')
      equityAdmin.frameworkManagementPage.checkPageUrl()

      equityAdmin.frameworkManagementPage.assertExpectedFrameworkColumnsAreDisplayedOverTheTable()
      equityAdmin.frameworkManagementPage.clickNewFramework()
      equityAdmin.newFrameworkPage.checkPageUrl()
    })

    it('C21139979 Leave the framework Name and Code fields empty', () => {
      equityAdmin.newFrameworkPage.changeFrameworkName('')
      equityAdmin.newFrameworkPage.assertErrorMessageForNameInputFieldIsDisplayed('Please fill out this field')
      equityAdmin.newFrameworkPage.assertCreateOrSaveButtonEnabled(false)

      equityAdmin.newFrameworkPage.changeFrameworkCode('CDWM01')
      equityAdmin.newFrameworkPage.changeFrameworkCode('')
      equityAdmin.newFrameworkPage.assertErrorMessageForCodeInputFieldIsDisplayed('Please fill out this field')
      equityAdmin.newFrameworkPage.assertCreateOrSaveButtonEnabled(false)

      equityAdmin.newFrameworkPage.changeFrameworkName('test001 ')
      equityAdmin.newFrameworkPage.assertErrorMessageForNameInputFieldIsDisplayed('Field cannot begin or end with whitespace')
      equityAdmin.newFrameworkPage.assertCreateOrSaveButtonEnabled(false)

      equityAdmin.newFrameworkPage.changeFrameworkCode('test001 ')
      equityAdmin.newFrameworkPage.assertErrorMessageForCodeInputFieldIsDisplayed('Field cannot begin or end with whitespace')
      equityAdmin.newFrameworkPage.assertCreateOrSaveButtonEnabled(false)
    })

    it('C21139980 Create a Framework without Rules', () => {
      equityAdmin.newFrameworkPage.assertDismissButtonEnabled(false)
      equityAdmin.newFrameworkPage.assertCreateOrSaveButtonEnabled(false)
      equityAdmin.newFrameworkPage.changeFrameworkName('WMCFrm01')
      equityAdmin.newFrameworkPage.changeFrameworkCode('CDWM01')
      equityAdmin.newFrameworkPage.changeFrameworkVisibility('all')
      equityAdmin.newFrameworkPage.assertDismissButtonEnabled()
      equityAdmin.newFrameworkPage.assertCreateOrSaveButtonEnabled(false)
    })

    it('C21139981 Create a Framework with one rule - not select framework visibility', () => {
      const newPublicRuleName = utils.generateRandomString(7)
      const brokerDealerName = 'Wells Fargo'

      equityAdmin.newFrameworkPage.clickAddRuleButton()

      equityAdmin.newRuleL4Page.checkPageUrl('public')
      equityAdmin.newRuleL4Page.assertHeaderTitleAndSubtitleDisplayedInTheL4Panel('New Public Security Rule', 'Set up the framework rule. All fields are mandatory.')
      equityAdmin.newRuleL4Page.modifyRuleReference(newPublicRuleName)
      equityAdmin.newRuleL4Page.selectTaxResidences(['Brazil', 'India'], false)
      equityAdmin.newRuleL4Page.selectSecurityListingLocation()
      equityAdmin.newRuleL4Page.selectBrokerDealer(brokerDealerName)
      equityAdmin.newRuleL4Page.clickToSaveTheRule()

      equityAdmin.newFrameworkPage.assertRuleListedOnTheRulesTable(newPublicRuleName)
      equityAdmin.newFrameworkPage.assertDismissButtonEnabled()
      equityAdmin.newFrameworkPage.changeFrameworkName('WMCFrm01')
      equityAdmin.newFrameworkPage.changeFrameworkCode('CDWM01')
      equityAdmin.newFrameworkPage.assertDismissButtonEnabled()
      equityAdmin.newFrameworkPage.assertCreateOrSaveButtonEnabled(false)
    })

    it('C21139982 Create a Framework - using same name', () => {
      const frameworkName = utils.generateRandomString(7)
      let frameworkCode = utils.generateRandomString(7)
      const newPublicRuleName = utils.generateRandomString(7)
      const brokerDealerName = 'Wells Fargo'

      for (let i = 0; i < 2; i++) {
        frameworkCode = utils.generateRandomString(7)
        equityAdmin.newFrameworkPage.clickAddRuleButton()

        equityAdmin.newRuleL4Page.checkPageUrl('public')
        equityAdmin.newRuleL4Page.modifyRuleReference(newPublicRuleName)
        equityAdmin.newRuleL4Page.selectTaxResidences()
        equityAdmin.newRuleL4Page.selectSecurityListingLocation()
        equityAdmin.newRuleL4Page.selectBrokerDealer(brokerDealerName)
        equityAdmin.newRuleL4Page.clickToSaveTheRule()

        equityAdmin.newFrameworkPage.assertRuleListedOnTheRulesTable(newPublicRuleName)
        equityAdmin.newFrameworkPage.assertDismissButtonEnabled()
        equityAdmin.newFrameworkPage.changeFrameworkName(frameworkName)
        equityAdmin.newFrameworkPage.changeFrameworkCode(frameworkCode)
        equityAdmin.newFrameworkPage.assertDismissButtonEnabled()
        equityAdmin.newFrameworkPage.changeFrameworkVisibility('all')
        equityAdmin.newFrameworkPage.assertCreateOrSaveButtonEnabled()
        equityAdmin.newFrameworkPage.clickToCreateOrSaveFrameworkButton()

        if (i === 0) {
          equityAdmin.frameworkManagementPage.assertToastNotificationMessageIsDisplayed('Regulatory Framework has been created successfully')
          equityAdmin.frameworkManagementPage.clickNewFramework()
        } else {
          equityAdmin.newFrameworkPage.assertNotificationErrorDisplayed('The Name ' + frameworkName + ' is already taken by another Regulatory Framework.')
        }
      }
    })

    it('C21721838 Create a Framework - using same code', () => {
      let frameworkName = utils.generateRandomString(7)
      const frameworkCode = utils.generateRandomString(7)
      const newPublicRuleName = utils.generateRandomString(7)
      const brokerDealerName = 'Wells Fargo'

      for (let i = 0; i < 2; i++) {
        frameworkName = utils.generateRandomString(7)
        equityAdmin.newFrameworkPage.clickAddRuleButton()

        equityAdmin.newRuleL4Page.checkPageUrl('public')
        equityAdmin.newRuleL4Page.modifyRuleReference(newPublicRuleName)
        equityAdmin.newRuleL4Page.selectTaxResidences()
        equityAdmin.newRuleL4Page.selectSecurityListingLocation()
        equityAdmin.newRuleL4Page.selectBrokerDealer(brokerDealerName)
        equityAdmin.newRuleL4Page.clickToSaveTheRule()

        equityAdmin.newFrameworkPage.assertRuleListedOnTheRulesTable(newPublicRuleName)
        equityAdmin.newFrameworkPage.assertDismissButtonEnabled()
        equityAdmin.newFrameworkPage.changeFrameworkName(frameworkName)
        equityAdmin.newFrameworkPage.changeFrameworkCode(frameworkCode)
        equityAdmin.newFrameworkPage.assertDismissButtonEnabled()
        equityAdmin.newFrameworkPage.changeFrameworkVisibility('all')
        equityAdmin.newFrameworkPage.assertCreateOrSaveButtonEnabled()
        equityAdmin.newFrameworkPage.clickToCreateOrSaveFrameworkButton()

        if (i === 0) {
          equityAdmin.frameworkManagementPage.assertToastNotificationMessageIsDisplayed('Regulatory Framework has been created successfully')
          equityAdmin.frameworkManagementPage.clickNewFramework()
        } else {
          equityAdmin.newFrameworkPage.assertNotificationErrorDisplayed('The Code ' + frameworkCode + ' is already in used by another Regulatory Framework.')
        }
      }
    })
  })

  context('Editing a Framework', () => {
    beforeEach(() => {
      equityAdmin.loginPage.login()
      equityAdmin.homePage.navigateToUrl('/regulatory/frameworks')
      equityAdmin.frameworkManagementPage.checkPageUrl()

      equityAdmin.frameworkManagementPage.assertExpectedFrameworkColumnsAreDisplayedOverTheTable()
    })

    /**
     * @missing_data Waiting for proper data
     */
    it('C21139983 Edit a Framework - using same name', () => {
      const editFrameworkId = 6
      const frameworkNewNameToEdit = 'WMCFrm01'

      equityAdmin.frameworkManagementPage.clickToEditFramework(editFrameworkId)

      equityAdmin.editFrameworkPage.changeFrameworkName(frameworkNewNameToEdit)
      equityAdmin.editFrameworkPage.clickToCreateOrSaveFrameworkButton()

      // modal confirmation
      equityAdmin.modal.assertModalContent(
        'Save Changes?',
        'By saving these updates, clients and all participants linked to this framework will be re-evaluated. Are you sure you want to make this change? Changes may take time to process.'
      )
      equityAdmin.modal.clickToConfirmModal()
      equityAdmin.modal.assertModalDisplayed(false)

      equityAdmin.editFrameworkPage.assertNotificationErrorDisplayed('The Name ' + frameworkNewNameToEdit + ' is already taken by another Regulatory Framework.')
    })

    /**
     * @missing_data Waiting for proper data
     */
    it('C21721839 Edit a Framework - using same code', () => {
      const editFrameworkId = 6
      const frameworkCodeToEdit = 'CD001'

      equityAdmin.frameworkManagementPage.clickToEditFramework(editFrameworkId)

      equityAdmin.editFrameworkPage.changeFrameworkCode(frameworkCodeToEdit)
      equityAdmin.editFrameworkPage.clickToCreateOrSaveFrameworkButton()

      // modal confirmation
      equityAdmin.modal.assertModalContent(
        'Save Changes?',
        'By saving these updates, clients and all participants linked to this framework will be re-evaluated. Are you sure you want to make this change? Changes may take time to process.'
      )
      equityAdmin.modal.clickToConfirmModal()
      equityAdmin.modal.assertModalDisplayed(false)

      equityAdmin.editFrameworkPage.assertNotificationErrorDisplayed('The Code ' + frameworkCodeToEdit + ' is already in used by another Regulatory Framework.')
    })
  })
})
