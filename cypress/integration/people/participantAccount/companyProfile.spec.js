import EquityAdmin from '../../../support/pages/equityAdmin'
import Utils from '../../../support/utils'

describe('Personal profile tests for Participants', () => {
  const equityAdmin = new EquityAdmin()
  const utils = new Utils()

  beforeEach(() => {
    equityAdmin.loginPage.login()
  })

  it('C12590100_Company_Overview_fields_max_characters_limit_per_fields', () => {
    const clientId = 144
    const participantId = 113026
    const randomTextWith10Chars = utils.generateRandomString(10)
    const randomTextWith11Chars = randomTextWith10Chars + 'a'
    const randomTextWith150Chars = utils.generateRandomString(150)
    const randomTextWith151Chars = randomTextWith150Chars + 'a'
    const baseErrorMessage150chars = ' must have no more than 150 characters'
    const baseErrorMessage10chars = ' must have no more than 10 characters'

    equityAdmin.homePage.selectClientById(clientId)
    equityAdmin.clientPeoplePage.clickToEditParticipant(participantId, false)
    equityAdmin.personalProfileOverviewPage.clickOnTheParticipantNavigationMenu('company')
    equityAdmin.companyProfileOverviewPage.checkPageUrl()

    // 150 chars test - Must accept
    equityAdmin.companyProfileOverviewPage.fillOutCompanyInfo(
      '',
      '',
      randomTextWith150Chars,
      randomTextWith150Chars,
      randomTextWith150Chars,
      randomTextWith150Chars,
      randomTextWith150Chars,
      randomTextWith150Chars,
      randomTextWith150Chars,
      randomTextWith150Chars,
      randomTextWith150Chars
    )
    equityAdmin.companyProfileOverviewPage.fillOutRole(randomTextWith150Chars, randomTextWith10Chars)

    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('department', 'Department' + baseErrorMessage150chars, false)
    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('section', 'Section' + baseErrorMessage150chars, false)
    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('branch', 'Branch ' + baseErrorMessage150chars, false)
    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('business unit', 'Business Unit' + baseErrorMessage150chars, false)
    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('company location', 'Company Location' + baseErrorMessage150chars, false)
    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('company code', 'Company Code' + baseErrorMessage150chars, false)
    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('subsidiary name', 'Subsidiary Name' + baseErrorMessage150chars, false)
    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('subsidiary code', 'Subsidiary Code' + baseErrorMessage150chars, false)
    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('billing code', 'Billing Code' + baseErrorMessage150chars, false)
    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('job title', 'Job Title' + baseErrorMessage150chars, false)
    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('broker officer code', 'Broker Officer Code' + baseErrorMessage10chars, false)

    // 151 chars test - Not accept, display error messages
    equityAdmin.companyProfileOverviewPage.fillOutCompanyInfo(
      '',
      '',
      randomTextWith151Chars,
      randomTextWith151Chars,
      randomTextWith151Chars,
      randomTextWith151Chars,
      randomTextWith151Chars,
      randomTextWith151Chars,
      randomTextWith151Chars,
      randomTextWith151Chars,
      randomTextWith151Chars
    )
    equityAdmin.companyProfileOverviewPage.fillOutRole(randomTextWith151Chars, randomTextWith11Chars)

    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('department', 'Department' + baseErrorMessage150chars)
    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('section', 'Section' + baseErrorMessage150chars)
    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('branch', 'Branch' + baseErrorMessage150chars)
    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('business unit', 'Business Unit' + baseErrorMessage150chars)
    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('company location', 'Company Location' + baseErrorMessage150chars)
    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('company code', 'Company Code' + baseErrorMessage150chars)
    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('subsidiary name', 'Subsidiary Name' + baseErrorMessage150chars)
    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('subsidiary code', 'Subsidiary Code' + baseErrorMessage150chars)
    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('billing code', 'Billing Code' + baseErrorMessage150chars)
    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('job title', 'Job Title' + baseErrorMessage150chars)
    equityAdmin.companyProfileOverviewPage.assertErrorMessageIsDisplayedInCompanyFields('broker officer code', 'Broker Officer Code' + baseErrorMessage10chars)
  })
})
