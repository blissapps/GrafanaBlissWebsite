import HomePage from '../support/pages/homePage'
import EquityPeoplePage from '../support/pages/equityPeoplePage'

describe('Home page tests', () => {
  const homePage = new HomePage()
  const equityPeoplePage = new EquityPeoplePage()

  beforeEach(() => {
    cy.login()
    cy.visit('/')
  })

  it('C10728360_Select_Specific_Client_From_The_List_Using_The_Search_Engine', () => {
    const clientName = 'Allianz'

    homePage.selectClientFromTheListBySearch(clientName)
    homePage.checkUrlByRegex(/.?client.*[0-9].?people$/)
    equityPeoplePage.assertClientNameInTheHeader(clientName)
  })

  it('C10735651_Check_GroupBy_Displays_Correct_Order_For_AllCompanies_Alphabetical_Status_Country_Sector', () => {
    // All Companies (default)
    homePage.SelectGroupByOptionForCompanies()
    homePage.assertCompaniesGroupByOrderIsCorrect()

    // Alphabetical
    homePage.SelectGroupByOptionForCompanies('alphabetical')
    homePage.assertCompaniesGroupByOrderIsCorrect('alphabetical')

    // Status
    homePage.SelectGroupByOptionForCompanies('status')
    homePage.assertCompaniesGroupByOrderIsCorrect('status')

    // Country
    homePage.SelectGroupByOptionForCompanies('country')
    homePage.assertCompaniesGroupByOrderIsCorrect('country')

    // Sector
    homePage.SelectGroupByOptionForCompanies('sector')
    homePage.assertCompaniesGroupByOrderIsCorrect('sector')
  })

  it('C10735652_Favorite_And_Unfavorite_Client', () => {
    // Favorite
    homePage.favoriteUnfavoriteClient(146)
    homePage.assertClientIsFavorite(146)

    // Unfavorite
    homePage.favoriteUnfavoriteClient(146)
    homePage.assertClientIsFavorite(146, false)
  })

  it('C10735680_Check_Client_Summary_Information_On_Cards', () => {
    homePage.assertClientCardSummaryInformation(144, '7digital', 'GBR', 'Regulated', 'Active').should('be.visible')
    homePage.assertClientCardSummaryInformation(337, '9F Group', 'CHN', 'Not Regulated', 'NOT SET').should('be.visible')
    homePage.assertClientCardSummaryInformation(162, 'Archant', 'GBR', 'Not Regulated', 'Terminated').should('be.visible')
    homePage.assertClientCardSummaryInformation(234, 'Janus Henderson', 'GBR', 'Regulated', 'Terminated').should('be.visible')
    homePage.assertClientCardSummaryInformation(381, 'GASCADE Gastransport', 'DEU', 'Regulated', 'Implementation').should('be.visible')
  })
})
