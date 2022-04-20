import EquityAdmin from '../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()

/**
 * * Skipping until this one starts to be considered stable
 */
describe.skip('Trusts tests', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
  })

  // Need clients with trusts
})
