import EquityAdmin from '../../../support/pages/equityAdmin'

const equityAdmin = new EquityAdmin()
/**
 * * Skipping until this one starts to be considered stable
 */
describe.skip('Overview tests', () => {
  beforeEach(() => {
    equityAdmin.loginPage.login()
  })
})
