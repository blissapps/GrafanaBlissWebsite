import HomePage from '../support/pages/homePage'
import EquityPeoplePage from '../support/pages/equityPeoplePage'

describe('Home page tests', () => {
  const homePage = new HomePage()
  const equityPeoplePage = new EquityPeoplePage()

  beforeEach(() => {
    // @ts-ignore
    cy.login()
  })

  it('C1234567_Test_People`s_page', () => {
    homePage.selectClientFromTheList('Allianz')
    equityPeoplePage.checkPeopleUrl()
    equityPeoplePage.openEditParticipantDetails('39477')
  })
})
