import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Page Navigation Tests', () => {
  /** Related to User Stories
   * EGVFOUR-266
   **/
  context('Welcome Page Navigations', () => {
    beforeEach(() => {
      equityGateway.LoginPage.login()
    })

    it('C30159578 - User is redirected to dashboard when it logs in', () => {
      equityGateway.PageNavi.pageNaviUrlValidation('/dashboard')
    })

    it('C30665103 - Validates Welcome Page Footer', () => {
      equityGateway.FooterBar.checkPage('Help', '/help')
      equityGateway.FooterBar.checkPage('Privacy Policy', '/privacy-policy')
    })
  })

  context('Dashboard Page Navigations', () => {
    /** Related to User Stories
     * EGVFOUR-252
     **/
    beforeEach(() => {
      equityGateway.LoginPage.login()
    })
    it('C30665111 - User is redirected to dashboard when it clicks on sidebar Dashboard Button', () => {
      equityGateway.MainPageSideMenu.clickSideMenuButton('Dashboard')
      equityGateway.PageNavi.pageNaviUrlValidation('/dashboard')
    })

    it('C30458338 - User is redirected to Helpdesk when it clicks on sidebar Support-Help Button', () => {
      equityGateway.MainPageSideMenu.support('SupportHelp')
      equityGateway.PageNavi.pageNaviUrlValidation('/help')
    })

    it('***** - Validate other side menu elements', () => {
      //TBD When the other elements are available
    })

    it('C30665112 - Validates Dashboard Page Footer', () => {
      equityGateway.FooterBar.checkPage('Help', '/help')
      equityGateway.FooterBar.checkPage('Privacy Policy', '/privacy-policy')
      equityGateway.FooterBar.checkPage('Terms and Conditions', '/terms-and-conditions')
    })

    it('C30159579 - Validates Dashboard Top Bar Personal Information Navigation', () => {
      equityGateway.TopBar.accMenuClick(null, 'Personal Information')
      equityGateway.PageNavi.pageNaviUrlValidation('/my-account/profile/personal-information')
    })

    it('C30665113 - Validates Dashboard Top Bar Bank Account Navigation', () => {
      equityGateway.TopBar.accMenuClick(null, 'Bank Account')
      equityGateway.PageNavi.pageNaviUrlValidation('/my-account/account-preferences/bank-account')
    })

    it('C30665114 - Validates Dashboard Top Bar Tax Documents Navigation', () => {
      equityGateway.TopBar.accMenuClick(null, 'Tax Documents')
      equityGateway.PageNavi.pageNaviUrlValidation('/my-account/tax/tax-documents')
    })

    it('C30665115 - Validates Dashboard Top Bar Logout Navigation', () => {
      equityGateway.TopBar.accMenuClick(null, 'Logout')
      equityGateway.PageNavi.pageNaviUrlValidation('/welcome')
    })

    it('C30159588 - Validates Dashboard View All Activity Navigation', () => {
      equityGateway.DashboardPage.clickViewAllActivity()
      equityGateway.PageNavi.pageNaviUrlValidation('/activity')
    })
  })

  context('Validate Personal Information Page Navigation', () => {
    beforeEach(() => {
      equityGateway.LoginPage.login()
      equityGateway.TopBar.accMenuClick(null, 'Personal Information')
    })
    /** Related to User Stories
     * EGVFOUR-266
     */
    it('C30665116 - Close Button Navigation', () => {
      equityGateway.PersonInfoRMenu.clickCloseButton()
      equityGateway.PageNavi.pageNaviUrlValidation('/dashboard')
    })

    it('C30665117 - Bank Account Navigation', () => {
      equityGateway.PersonInfoRMenu.clickSideMenuButton('Bank Account')
      equityGateway.PageNavi.pageNaviUrlValidation('/my-account/account-preferences/bank-account')
    })

    it('C30665118 - Payments Navigation', () => {
      equityGateway.PersonInfoRMenu.clickSideMenuButton('Payments')
      equityGateway.PageNavi.pageNaviUrlValidation('/my-account/account-preferences/payments')
    })

    it('******** - Password and Security Navigation', () => {
      // equityGateway.PersonInfoRMenu.clickSideMenuButton('Password & Security')
      // equityGateway.PageNavi.pageNaviUrlValidation('/my-account/account-preferences/password-and-security')
      //#TODO the behaviour is broken in the application
    })

    it('C30665119 - Language Navigation', () => {
      equityGateway.PersonInfoRMenu.clickSideMenuButton('Language')
      equityGateway.PageNavi.pageNaviUrlValidation('/my-account/account-preferences/language')
    })

    it('C30665120 - Tax Documents Navigation', () => {
      equityGateway.PersonInfoRMenu.clickSideMenuButton('Tax Documents')
      equityGateway.PageNavi.pageNaviUrlValidation('/my-account/tax/tax-documents')
    })

    it('C30665121 - Help Navigation', () => {
      equityGateway.PersonInfoRMenu.clickSideMenuButton('Help')
      equityGateway.PageNavi.pageNaviUrlValidation('/help')
    })

    it('C30665122 - Logout Navigation', () => {
      equityGateway.PersonInfoRMenu.clickSideMenuButton('Logout')
      equityGateway.PageNavi.pageNaviUrlValidation('/welcome')
    })
  })

  context('Validate Activity Page Navigation', () => {
    beforeEach(() => {
      equityGateway.LoginPage.login()
      equityGateway.DashboardPage.clickViewAllActivity()
    })
    /** Related to User Stories
     * EGVFOUR-266
     */
    it('C30665123 - Navigates to Dashboard from Activity Page', () => {
      equityGateway.ActivityPage.breadcrumbNavi()
      cy.url().should('include', '/dashboard')
    })
  })

  context('Validate Sales Wizard Navigation', () => {
    /** Related to User Stories
     * EGVFOUR-266, EGVFOUR-264
     */
    it('C30159580 - Sales Wizard Default', () => {
      equityGateway.PageNavi.navigateToSalesWizard()
    })

    it('C30159581 - Sales Wizard Security', () => {
      equityGateway.PageNavi.navigateToSalesWizard('security')
    })

    it('C30159582 - Sales Wizard Share Group', () => {
      equityGateway.PageNavi.navigateToSalesWizard('share-group')
    })

    it('C30159583 - Sales Wizard Amount to Sell', () => {
      equityGateway.PageNavi.navigateToSalesWizard('amount-to-sell')
    })

    it('C30159584 - Sales Wizard Order Type', () => {
      equityGateway.PageNavi.navigateToSalesWizard('order-type')
    })

    it('C30159585 - Sales Wizard Distribution', () => {
      equityGateway.PageNavi.navigateToSalesWizard('distribution')
    })

    it('C30159586 - Sales Wizard Review Order', () => {
      equityGateway.PageNavi.navigateToSalesWizard('review-order')
    })

    it('C30159587 - Sales Wizard Success Confirmation', () => {
      equityGateway.PageNavi.navigateToSalesWizard('success-confirmation')
    })
  })
})
