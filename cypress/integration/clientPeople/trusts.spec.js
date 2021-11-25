import EquityAdmin from '../../support/pages/equityAdmin'

/**
 * * Skipping until this one starts to be considered stable
 */
describe.skip('Trusts tests', () => {
  const equityAdmin = new EquityAdmin()

  beforeEach(() => {
    equityAdmin.loginPage.login()
  })

  // Need clients with trusts
})
