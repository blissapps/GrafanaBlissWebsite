import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Dashboard page tests', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login()
        equityGateway.Activity.gotoActivity()
    })

    context('General Validations', () => {
        /** Related to User Stories
         * EGVFOUR-113
         */
        it('C30092745/.746 - Go to Dashboard trough Activity', () => {
            equityGateway.Activity.breadcrumbNavi()
            cy.url().should('include', '/dashboard')
        })

        it('C30092744 - Activity Page Validation', () => {
            const pageTitle = 'Activity'
            const sector1Title = 'In progress'
            const sector2Title1 = 'Upcoming'
            const sector2Title2 = 'History'

            equityGateway.Activity.pageValidation(pageTitle, sector1Title, sector2Title1, sector2Title2)
        })
    })

    context('In Progress Content', () => {
        it('C30092747 - Check Showing Counter', () => {
            //Showing X elements of a total Y elements
            equityGateway.Activity.progressCounter(3, 6)
        })

        it('C30092747/.748/.750/.752/.753 - Verify Transactions Elements', () => {
            //Verify Collapsed Elements
            equityGateway.Activity.button('Show all')
            equityGateway.Activity.progressElements(6)
            //Verify Total Elements
            equityGateway.Activity.button('Show less')
            equityGateway.Activity.progressElements(3)
        })

        it('C30092751 - If no Content does not Display', () => {
            //TODO need new test accounts for testing
        })
    })

    context('Upcoming Content', () => {
        it('General Validations', () => {
            const expectedFooterItems = ['Date', 'Activity type'];
            equityGateway.Activity.tabsBarElements(expectedFooterItems)
        })
        //TODO no data to test it yet
    })

    context('History Content', () => {
        it('General Validations', () => {
            cy.get('.tabs-bar').contains('History').click({ force: true })
            const expectedFooterItems = ['Date', 'Activity type'];
            equityGateway.Activity.tabsBarElements(expectedFooterItems)
        })
        //TODO no data to test it yet
    })
})