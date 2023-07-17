import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

/**
 * https://globalshares.testrail.net/index.php?/suites/view/18820&group_by=cases:section_id&group_order=asc&display_deleted_cases=0&group_id=1026239
 * Sales Wizard Share Group Test Suite
 */

describe('Sales Wizard Group Page Tests', () => {
  context('Validate User Information', () => {
    /** Related to User Stories
     * EGVFOUR-141, EGVFOUR-253
     **/
    beforeEach('User Chooses a Security', () => {
      equityGateway.LoginPage.login()
      equityGateway.SalesWizBase.gotoShareGroup()
    })

    it('C30639258 - Validate Page Elements', () => {
      equityGateway.SalesWizShareGroupPage.validateMainBody()
    })

    it('C30639258 - Validate Page Elements are clickable', () => {
      equityGateway.SalesWizShareGroupPage.isSharesGroupClickable(equityGateway.SalesWizShareGroupPage.setSharesGroupAvailableButtons())
    })
  })
})
