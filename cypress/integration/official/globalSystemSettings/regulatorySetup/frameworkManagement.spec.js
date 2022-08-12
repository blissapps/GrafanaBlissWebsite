import EquityAdmin from '../../../../support/pages/equityAdmin'
import Utils from '../../../../support/utils'

const equityAdmin = new EquityAdmin()
const utils = new Utils()

describe('Framework Management - Error Scenarios', () => {
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

    equityAdmin.newFrameworkPage.clickAddRuleButton()

    equityAdmin.newRuleL4Page.checkPageUrl('public')
    equityAdmin.newRuleL4Page.assertHeaderTitleAndSubtitleDisplayedInTheL4Panel('New Public Security Rule', 'Set up the framework rule. All fields are mandatory.')
    equityAdmin.newRuleL4Page.typeRuleReference(newPublicRuleName)
    equityAdmin.newRuleL4Page.selectTaxResidences(['Brazil', 'India'], false)
    equityAdmin.newRuleL4Page.selectSecurityListingLocation()
    equityAdmin.newRuleL4Page.selectBrokerDealer('Wells Fargo')
    equityAdmin.newRuleL4Page.clickToSaveTheRule()

    equityAdmin.newFrameworkPage.assertRuleListedOnTheRulesTable(newPublicRuleName)
    equityAdmin.newFrameworkPage.assertDismissButtonEnabled()
    equityAdmin.newFrameworkPage.changeFrameworkName('WMCFrm01')
    equityAdmin.newFrameworkPage.changeFrameworkCode('CDWM01')
    equityAdmin.newFrameworkPage.assertDismissButtonEnabled()
    equityAdmin.newFrameworkPage.assertCreateOrSaveButtonEnabled(false)
  })
})
