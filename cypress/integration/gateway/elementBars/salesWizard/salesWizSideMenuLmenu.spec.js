import EquityGateway from '../../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Sales Wizard - Lateral Progress Stepper', () => {
  context('Validate Navigation and UI without limitations', () => {
    /** Related to User Stories
     * EGVFOUR-133, EGVFOUR-262
     **/
    beforeEach(() => {
      //NOT NECESSARY YET  - equityGateway.LoginPage.login()
      equityGateway.SalesWizBase.gotoSalesWiz()
    })

    it('C30639293 - Progress side bar UI elements', () => {
      equityGateway.SalesWizSideLmenu.validaTeSideStepperElement()
    })

    it('C30639306 - Validate Overview Step Navigation Functionality', () => {
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Overview')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Security', false, 'Overview')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Share group', false, 'Overview')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Amount to sell', false, 'Overview')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Order type', false, 'Overview')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Distribution', false, 'Overview')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Review order', false, 'Overview')
    })

    it('C30639308 - Validate Security Step Navigation Functionality', () => {
      equityGateway.SalesWizBase.gotoSecurity()
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Overview')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Security')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Share group', false, 'Security')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Amount to sell', false, 'Security')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Order type', false, 'Security')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Distribution', false, 'Security')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Review order', false, 'Security')
    })

    it('C31099037 - Validate Share Group Step Navigation Functionality', () => {
      equityGateway.SalesWizBase.gotoShareGroup()
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Overview')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Security')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Share group')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Amount to sell', false, 'Share group')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Order type', false, 'Share group')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Distribution', false, 'Share group')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Review order', false, 'Share group')
    })

    it('C31099038 - Validate Amount to Sell Navigation Functionality', () => {
      equityGateway.SalesWizBase.gotoAmount2Sell()
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Overview')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Security')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Share group')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Amount to sell')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Order type', false, 'Amount to sell')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Distribution', false, 'Amount to sell')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Review order', false, 'Amount to sell')
    })

    it('C31099039 - Validate Order Type Navigation Functionality', () => {
      equityGateway.SalesWizBase.goToOrderType()
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Overview')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Security')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Share group')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Amount to sell')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Order type')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Distribution', false, 'Order type')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Review order', false, 'Order type')
    })

    it('C31099040 - Validate Distribution Navigation Functionality', () => {
      equityGateway.SalesWizBase.goToDistribution()
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Overview')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Security')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Share group')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Amount to sell')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Order type')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Distribution')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Review order', false, 'Distribution')
    })

    it('C31099041 - Validate Review Order Step Navigation Functionality', () => {
      equityGateway.SalesWizBase.goToReviewOrder()
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Overview')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Security')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Share group')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Amount to sell')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Order type')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Distribution')
      equityGateway.SalesWizSideLmenu.validateStepperActionability('Review order')
    })

    it('C31098641 - Validate Overview Step', () => {
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Overview')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Security', false)
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Share group', false)
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Amount to sell', false)
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Order type', false)
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Distribution', false)
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Review order', false)
    })

    it('C31098642 - Validate Security Step', () => {
      equityGateway.SalesWizBase.gotoSecurity()
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Overview')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Security')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Share group', false)
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Amount to sell', false)
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Order type', false)
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Distribution', false)
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Review order', false)
    })

    it('C31098643 - Validate Share Group Step', () => {
      equityGateway.SalesWizBase.gotoShareGroup()
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Overview')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Security')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Share group')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Amount to sell', false)
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Order type', false)
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Distribution', false)
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Review order', false)
    })

    it('C31098644 - Validate Amount to Sell Step', () => {
      equityGateway.SalesWizBase.gotoAmount2Sell()
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Overview')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Security')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Share group')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Amount to sell')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Order type', false)
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Distribution', false)
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Review order', false)
    })
    it('C31098645 - Validate Order Type Step', () => {
      equityGateway.SalesWizBase.goToOrderType()
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Overview')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Security')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Share group')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Amount to sell')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Order type')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Distribution', false)
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Review order', false)
    })

    it('C31098646 - Validate Distribution Step', () => {
      equityGateway.SalesWizBase.goToDistribution()
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Overview')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Security')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Share group')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Amount to sell')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Order type')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Distribution')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Review order', false)
    })

    it('C31098647 - Validate Review Order Step', () => {
      equityGateway.SalesWizBase.goToReviewOrder()
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Overview')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Security')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Share group')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Amount to sell')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Order type')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Distribution')
      equityGateway.SalesWizSideLmenu.validateStepperStatus('Review order')
    })

  })

  /** TODO each test case
   * After we can mock, or access a user with a single Security and/or Share Group
   */
  context.skip('The user does not have Security || Share Groups', () => {
    /** Related to User Stories
     * EGVFOUR-133, EGVFOUR-262
     **/
    beforeEach(() => {
      //NOT NECESSARY YET  - equityGateway.LoginPage.login()
      equityGateway.SalesWizBase.gotoSalesWiz()
    })

    it('C30639297 - Security step hidden from the progress side bar when user has only a single security option', () => {
      //TODO
    })

    it('C30639298 - Shared Group step hidden from the progress side bar when user has only a single shared group option', () => {
      //TODO
    })

    it('C31084285 - Shared Group && Security step hidden from the progress side bar when user has only a single shared group option and a single security option', () => {
      //TODO
    })

    it('C30639299 - Full wizard completion with a single security and share group options', () => {
      //TODO
    })

    it('C30639301 - Full wizard completion with more than 1 security option and a single share group option', () => {
      //TODO
    })

    it('C30639302 - Full wizard completion with a single security option and more than 1 share group option', () => {
      //TODO
    })
  })
})
