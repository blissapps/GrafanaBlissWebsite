import HomePage from '../support/pages/homePage'

describe('Home page tests', () => {
  const homePage = new HomePage()

  beforeEach(() => {
    // @ts-ignore
    cy.login()
  })

  it('C1234567_Select_Specific_Client_From_The_List', () => {
    homePage.selectClientFromTheList('Allianz')
    homePage.checkUrlByRegex(/.?client.*[0-9].?people$/)
  })

  it('C1234567_Check_GroupBy_Displays_Correct_Order_For_Alphabetical', () => {
    homePage.groubyByList()
  })

  // favorite and unfavorite a client

  // Check summary client information. Ex: Allianz {GBR, NOT REGULATED, NOT SET}
})
