import EquityAdmin from '../../support/pages/equityAdmin'

/**
 * * Skipping until this one starts to be considered stable
 */
describe.skip('Overview tests', () => {
  const equityAdmin = new EquityAdmin()

  beforeEach(() => {
    equityAdmin.loginPage.login()
  })
})
