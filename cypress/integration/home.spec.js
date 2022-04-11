import EquityAdmin from '../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

describe('Home page tests', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
  })
})
