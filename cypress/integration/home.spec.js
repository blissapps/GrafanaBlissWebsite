import HomePage from '../support/pages/homePage'
import SearchBar from '../support/components/searchBar'

describe('Home page tests', () => {
  const homePage = new HomePage()
  const searchBar = new SearchBar()

  beforeEach(() => {
    // @ts-ignore
    cy.login()
  })

  /**
   * Select a client using the search engine bar in the home page
   */
  it('C1234567_Select_Specific_Client_From_The_List', () => {
    homePage.selectClientFromTheList('Allianz')
    homePage.checkUrlByRegex(/.?client.*[0-9].?people$/)
  })

  /**
   * Check if the Group By select is working for alphabetical order.
   */
  it('C1234567_Check_GroupBy_Displays_Correct_Order_For_Alphabetical', () => {
    homePage.groupByList()
  })

  /**
   * Verify the favorite button behavior over the clients
   */
  it('C1234567_Favorite_And_Unfavorite_Client', () => {
    searchBar.search('Allianz Insurance')
    homePage.favoriteUnfavoriteClient('client-146')
    homePage.isClientFavorite('client-146').should('be.visible')

    //teardown
    homePage.favoriteUnfavoriteClient('client-146')
    homePage.isClientFavorite('client-146').should('not.exist')
  })

  /**
   * Verify if the client summary information in the home card is correct for some clients
   */
  it('C1234567_Check_Client_Summary_Information', () => {
    homePage.validateClientCardSummaryInformation('client-144', 'GBR', 'Regulated', 'Active').should('be.visible')
    homePage.validateClientCardSummaryInformation('client-337', 'CHN', 'Not Regulated', 'NOT SET').should('be.visible')
    homePage.validateClientCardSummaryInformation('client-162', 'GBR', 'Not Regulated', 'Terminated').should('be.visible')
    homePage.validateClientCardSummaryInformation('client-234', 'GBR', 'Regulated', 'Terminated').should('be.visible')
    homePage.validateClientCardSummaryInformation('client-381', 'DEU', 'Regulated', 'Implementation').should('be.visible')
  })
})
