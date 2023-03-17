import EquityAdmin from '../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Preferences tests', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.applicationLeftMenuBar.openProfileMenuBar()
    equityAdmin.profileMenuNavBar.openProfilePreferencesPage()
  })

  /**
   * Test if the menu link sends to the correct page and it gets back to the home screen if closed
   */
  it('C18295659 Check URL Access Over The Menu', () => {
    equityAdmin.preferencesPage.checkPageUrl()
    equityAdmin.preferencesPage.assertHeaderIsDisplayedCorrectly(true, 'Preferences')
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()
    equityAdmin.preferencesPage.checkPageUrl()
  })
})
