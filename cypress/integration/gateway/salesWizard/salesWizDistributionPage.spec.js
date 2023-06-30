import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Sales Wizard Distribution Page Tests', () => {
  context('Validate User Information', () => {
    /** Related to User Stories
     * EGVFOUR-144
     **/
    beforeEach(() => {
      equityGateway.SalesWizBase.goToDistribution()
    })

    it('C30639341, C30639342, C30639343 - Distribution container UI elements validation', () => {
      equityGateway.SalesWizDistributionPage.validatePageElements()
    })

    it('C30639346 - User selects Payroll Method', () => {
      equityGateway.SalesWizDistributionPage.validatePayrollElements()
    })

    it('C30639347 - User selects Wire Method', () => {
      equityGateway.SalesWizDistributionPage.validateWireElements(false)
    })
    it('C30639347 - User selects Urgent Wire Method', () => {
      equityGateway.SalesWizDistributionPage.validateWireElements(true)
    })

    it('C30639347 - User selects Residential Address Method', () => {
      equityGateway.SalesWizDistributionPage.validateAddressElements('Residential')
    })

    it('C30639347 - User selects Alternate Address Method', () => {
      equityGateway.SalesWizDistributionPage.validateAddressElements('Alternate')
    })
  })
})
