import EquityGateway from '../../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

/**
 * https://globalshares.testrail.net/index.php?/suites/view/18820&group_by=cases:section_id&group_order=asc&display_deleted_cases=0&group_id=1026438
 * My Account Test Suite
 */

describe('MyAcc Side Menu Tests', () => {
  beforeEach(() => {
    equityGateway.LoginPage.login()
    equityGateway.AccBase.goToMyAccPage()
  })

  context('General Page Validations', () => {
    it('Side Menu Validation', () => {
      const menuItems = ['Personal Information', 'Bank account', 'Payments', 'Password & Security', 'Language', 'Tax documents', 'Help', 'Log Out']
      equityGateway.MyAccSideMenu.sideMenuValidation(menuItems)
    })
  })
})
