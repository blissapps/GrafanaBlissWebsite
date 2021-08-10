import HomePage from '../support/pages/homePage'

describe('Home page tests', () => {
  const homePage = new HomePage()

  beforeEach(() => {
    // @ts-ignore
    cy.login()
  })

  /**
   * Select a client using the search engine bar in the home page
   */
  it('C1234567_Select_Specific_Client_From_The_List_Using_The_Search_Engine', () => {
    homePage.selectClientFromTheListBySearch('Allianz')
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
    homePage.favoriteUnfavoriteClient(146)
    homePage.assertIClientIsFavorite(146).should('be.visible')

    //teardown
    homePage.favoriteUnfavoriteClient(146)
    homePage.assertIClientIsFavorite(146).should('not.exist')
  })

  /**
   * Verify if the client summary information in the home card is correct for some clients
   */
  it('C1234567_Check_Client_Summary_Information', () => {
    homePage.assertClientCardSummaryInformation(144, '7digital', 'GBR', 'Regulated', 'Active').should('be.visible')
    homePage.assertClientCardSummaryInformation(337, '9F Group', 'CHN', 'Not Regulated', 'NOT SET').should('be.visible')
    homePage.assertClientCardSummaryInformation(162, 'Archant', 'GBR', 'Not Regulated', 'Terminated').should('be.visible')
    homePage.assertClientCardSummaryInformation(234, 'Janus Henderson', 'GBR', 'Regulated', 'Terminated').should('be.visible')
    homePage.assertClientCardSummaryInformation(381, 'GASCADE Gastransport', 'DEU', 'Regulated', 'Implementation').should('be.visible')
  })
})
