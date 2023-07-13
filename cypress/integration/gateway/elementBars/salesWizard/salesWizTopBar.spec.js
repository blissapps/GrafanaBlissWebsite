import EquityGateway from '../../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

/**
 * https://globalshares.testrail.net/index.php?/suites/view/18820&group_by=cases:section_id&group_order=asc&display_deleted_cases=0&group_id=1026236
 * Sales Wizard Progress Top Bar Test Suite
 */

let pageSector = 0
describe('Sales Wizard Element Bars Tests', () => {
    beforeEach(() => {
        //NOT NECESSARY YET  - equityGateway.LoginPage.login()
        equityGateway.SalesWizBase.gotoSalesWiz()
    })

    context('Top Bar General Validations', () => {
        /** Related to User Stories
         * EGVFOUR-132
         **/
        it('C30639364/..270 - Close Button Availability', () => {
            equityGateway.SalesWizTopBar.btnClose()
        })

        it('C30639364/..270 - Back Button Availability', () => {
            equityGateway.SalesWizTopBar.btnNext('click')
            equityGateway.SalesWizTopBar.btnBack()
        })

        it('C30639364/..270 - Next Button Availability', () => {
            equityGateway.SalesWizTopBar.btnNext()
        })

        it('C30639364/..270 - Progress Bar Availability', () => {
            equityGateway.SalesWizTopBar.progressBar()
        })
    })

    context('Top Bar Buttons Behaviour Validations', () => {
        /** Related to User Stories
         * EGVFOUR-259
         **/
        it('C30639359 - Next button behaviour', () => {
            equityGateway.SalesWizTopBar.btnNext('click')
            cy.url().should('include', '/security')
        })

        it('C30639358 - Back button behaviour', () => {
            equityGateway.SalesWizTopBar.btnNext('click')
            cy.url().should('include', '/security')
            equityGateway.SalesWizTopBar.btnBack('click')
            cy.url().should('include', '/overview')
        })

        it('C31031749 - Close button behaviour', () => {
            equityGateway.SalesWizTopBar.btnNext('click')
        })
    })

    context('Top Bar Next Btn Progress Behaviour Steps Validations', () => {
        /** Related to User Stories
         * EGVFOUR-259
         **/
        it('C30639353 - Progress bar progress in Overview', () => {
            equityGateway.SalesWizBase.gotoSalesWiz()
            equityGateway.SalesWizTopBar.progressBar(1)
        })

        it('C30639353 - Progress bar progress in Security', () => {
            equityGateway.SalesWizBase.gotoSecurity()
            equityGateway.SalesWizTopBar.progressBar(2)
        })

        it('C30639353 - Progress bar progress in Share group', () => {
            equityGateway.SalesWizBase.gotoShareGroup()
            equityGateway.SalesWizTopBar.progressBar(3)
        })

        it('C30639353 - Progress bar progress in Amount to sell', () => {
            equityGateway.SalesWizBase.gotoAmount2Sell()
            equityGateway.SalesWizTopBar.progressBar(4)
        })

        it('C30639353/..352 - Progress bar progress in Order type', () => {
            equityGateway.SalesWizBase.goToOrderType()
            equityGateway.SalesWizTopBar.progressBar(5)
        })

        it('C30639353/..353 - Progress bar progress in Distribution', () => {
            equityGateway.SalesWizBase.goToDistribution()
            equityGateway.SalesWizTopBar.progressBar(6)
        })

        it('C30639353/..354 - Progress bar progress in Review order', () => {
            equityGateway.SalesWizBase.goToReviewOrder()
            equityGateway.SalesWizTopBar.progressBar(7)
        })
    })

    context('Top Bar Back Btn Progress Behaviour Steps Validations', () => {
        /** Related to User Stories
         * EGVFOUR-259
         **/
        beforeEach(() => {
            //NOT NECESSARY YET  - equityGateway.LoginPage.login()
            const randomNumber = Math.floor(Math.random() * 5) + 1
            switch (randomNumber) {
                case 1:
                    equityGateway.SalesWizBase.gotoShareGroup()
                    pageSector = 3
                    break
                case 2:
                    equityGateway.SalesWizBase.gotoAmount2Sell()
                    pageSector = 4
                    break
                case 3:
                    equityGateway.SalesWizBase.goToOrderType()
                    pageSector = 5
                    break
                default:
                    equityGateway.SalesWizBase.goToReviewOrder()
                    pageSector = 7
            }
        })

        it('C30639358 - Progress bar progress in Review Order', () => {
            equityGateway.SalesWizTopBar.btnBack('click')
            equityGateway.SalesWizTopBar.btnBack('click')
            equityGateway.SalesWizTopBar.progressBar(pageSector)
        })

        it('C30639358 - Progress bar progress in Distribution', () => {
            equityGateway.SalesWizTopBar.btnBack('click')
            equityGateway.SalesWizTopBar.btnBack('click')
            equityGateway.SalesWizTopBar.progressBar(pageSector)
        })

        it('C30639358 - Progress bar progress in Order Type', () => {
            equityGateway.SalesWizTopBar.btnBack('click')
            equityGateway.SalesWizTopBar.btnBack('click')
            equityGateway.SalesWizTopBar.progressBar(pageSector)
        })

        it('C30639358 - Progress bar progress in Amount to Sell', () => {
            equityGateway.SalesWizTopBar.btnBack('click')
            equityGateway.SalesWizTopBar.btnBack('click')
            equityGateway.SalesWizTopBar.progressBar(pageSector)
        })
    })

    context('Top Bar Progress Complex Behaviour Steps Validations', () => {
        /** Related to User Stories
         * EGVFOUR-259
         **/
        it('C30639357/..064 - Progress bar navigate to Distribution and Change Security Step', () => {
            equityGateway.SalesWizBase.goToDistribution()
            equityGateway.SalesWizTopBar.progressBar('6')
            equityGateway.SalesWizTopBar.btnBack('click')
            equityGateway.SalesWizTopBar.btnBack('click')
            equityGateway.SalesWizTopBar.btnBack('click')
            equityGateway.SalesWizTopBar.btnBack('click')
            equityGateway.SalesWizSecurityPage.cardClick('Sage Group Plc')
            equityGateway.SalesWizSecurityPage.cardConfirmationModal('confirm')
            equityGateway.SalesWizTopBar.progressBar('2')
        })

        it('C30639357/..065 - Progress bar navigate to Distribution Change Security Step and move to Amount2Sell', () => {
            equityGateway.SalesWizBase.goToDistribution()
            equityGateway.SalesWizTopBar.progressBar('6')
            equityGateway.SalesWizTopBar.btnBack('click')
            equityGateway.SalesWizTopBar.btnBack('click')
            equityGateway.SalesWizTopBar.btnBack('click')
            equityGateway.SalesWizTopBar.btnBack('click')
            equityGateway.SalesWizSecurityPage.cardClick('Sage Group Plc')
            equityGateway.SalesWizSecurityPage.cardConfirmationModal('confirm')
            equityGateway.SalesWizTopBar.progressBar('2')
            equityGateway.SalesWizTopBar.btnNext('click')
            equityGateway.SalesWizShareGroupPage.selectShareGroupByName('Purchase plan issuances')
            equityGateway.SalesWizTopBar.btnNext('click')
            equityGateway.SalesWizTopBar.progressBar('4')
        })
    })
})
