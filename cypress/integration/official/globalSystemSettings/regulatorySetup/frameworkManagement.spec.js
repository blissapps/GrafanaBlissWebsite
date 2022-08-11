import EquityAdmin from '../../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Framework Management', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.homePage.navigateToUrl('/regulatory/frameworks')
    equityAdmin.frameworkManagementPage.checkPageUrl()
  })

  it('C21139979 Leave the framework Name and Code fields empty', () => {
    equityAdmin.frameworkManagementPage.assertExpectedFrameworkColumnsAreDisplayedOverTheTable()
    equityAdmin.frameworkManagementPage.clickNewFramework()
    equityAdmin.newFrameworkPage.checkPageUrl()

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
    equityAdmin.frameworkManagementPage.clickNewFramework()
    equityAdmin.newFrameworkPage.checkPageUrl()

    equityAdmin.newFrameworkPage.assertDismissButtonEnabled(false)
    equityAdmin.newFrameworkPage.assertCreateOrSaveButtonEnabled(false)
    equityAdmin.newFrameworkPage.changeFrameworkName('WMCFrm01')
    equityAdmin.newFrameworkPage.changeFrameworkCode('CDWM01')
    equityAdmin.newFrameworkPage.changeFrameworkVisibility('all')
    equityAdmin.newFrameworkPage.assertDismissButtonEnabled()
    equityAdmin.newFrameworkPage.assertCreateOrSaveButtonEnabled(false)
  })
})
