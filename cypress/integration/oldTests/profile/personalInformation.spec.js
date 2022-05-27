import EquityAdmin from '../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Personal Information tests', () => {
  it.only('C1234567 Edit Personal Information', () => {
    const userEmailForLogin = 'userForEditProfilePurposes@globalshares.com'
    const userName = 'User Edit Profile'
    const userContact = '+353 000000000'
    const userEmail = 'userEditProfile@globalshares.com'
    const newUserName = 'The name was changed'
    const newUserContact = '+1 555555555'
    const newUserEmail = 'emailChanged@globalshares.com'

    equityAdmin.loginPage.login(userEmailForLogin)
    equityAdmin.homePage.navigateToUrl('/profile/personal-information')
    equityAdmin.personalInformationPage.assertPersonalInfoDisplayed(userName, userContact, userEmail)
    equityAdmin.personalInformationPage.editPersonalInfo(newUserName, newUserContact, newUserEmail)
    equityAdmin.personalInformationPage.reloadPage()
    equityAdmin.personalInformationPage.assertPersonalInfoDisplayed(newUserName, newUserContact, newUserEmail)
    equityAdmin.profileMenuNavBar.logout()
    equityAdmin.loginPage.login(userEmailForLogin)
    equityAdmin.homePage.navigateToUrl('/profile/personal-information')
    equityAdmin.personalInformationPage.assertPersonalInfoDisplayed(newUserName, newUserContact, newUserEmail)
  })
})
