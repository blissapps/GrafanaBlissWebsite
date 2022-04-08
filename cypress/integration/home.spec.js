import EquityAdmin from '../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Home page tests', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
  })

  it('C10735651_Check_GroupBy_Displays_Correct_Order_For_AllCompanies_Alphabetical_Status_Country_Sector', () => {
    // All Companies (default)
    equityAdmin.homePage.selectGroupByOptionForCompanies()
    equityAdmin.homePage.assertCompaniesAreOrdered()

    // Alphabetical
    equityAdmin.homePage.selectGroupByOptionForCompanies('alphabetical')
    equityAdmin.homePage.assertCompaniesAreOrdered()

    // Status
    equityAdmin.homePage.selectGroupByOptionForCompanies('status')
    equityAdmin.homePage.assertCompaniesAreOrdered()

    // Country
    equityAdmin.homePage.selectGroupByOptionForCompanies('country')
    equityAdmin.homePage.assertCompaniesAreOrdered()

    // Sector
    equityAdmin.homePage.selectGroupByOptionForCompanies('sector')
    equityAdmin.homePage.assertCompaniesAreOrdered()
  })

  it('C10735652_Favorite_And_Unfavorite_Client', () => {
    const clientId = 146

    // Favorite
    equityAdmin.homePage.favoriteUnfavoriteClient(clientId)
    equityAdmin.homePage.assertClientIsFavorite(clientId)

    // Unfavorite
    equityAdmin.homePage.favoriteUnfavoriteClient(clientId)
    equityAdmin.homePage.assertClientIsFavorite(clientId, false)
  })
})
