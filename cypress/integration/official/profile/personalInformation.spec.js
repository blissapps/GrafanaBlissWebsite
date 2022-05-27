import EquityAdmin from '../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Personal Information tests', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
    equityAdmin.applicationLeftMenuBar.openProfileMenuBar()
    equityAdmin.profileMenuNavBar.openProfilePersonalInformationPage()
  })

  it('C18295656 Check URL Access Over The Menu', () => {
    equityAdmin.personalInformationPage.checkPageUrl()
    equityAdmin.personalInformationPage.assertHeaderIsDisplayedCorrectly(true, 'Personal Info')
    equityAdmin.profileMenuNavBar.closeProfileMenuNavBar()
    equityAdmin.personalInformationPage.checkPageUrl()
  })
})
