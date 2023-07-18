import EquityGateway from '../../../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

/**
 * https://globalshares.testrail.net/index.php?/suites/view/18820&group_by=cases:section_id&group_order=asc&display_deleted_cases=0&group_id=1026438
 * My Account Test Suite
 */
describe('MyAcc Side Profile RMenu Tests', () => {
  beforeEach(() => {
    equityGateway.LoginPage.login()
    equityGateway.AccBase.goToMyAccPage()
  })

  context('Iterative Right Menu Validations', () => {
    it('Side Menu Validation', () => {
      const menuItems = ['Profile', 'Tax identification', 'Identifiers', 'Contact details', 'Address details']
      equityGateway.PersonInfoRMenu.sideMenuValidation(menuItems)
    })
  })

  context('Right Menu Personal Info Validation', () => {
    it('Side Menu Validation', () => {
      const menuItems = ['How are my personal details being used?', 'Lorem ipsum dolor sit amet,']
      equityGateway.PersonInfoRMenu.sideInfoSector(menuItems)
    })
  })
})
