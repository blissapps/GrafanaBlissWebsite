import EquityGateway from '../../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

describe('TopBar tests', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login()
    });

    context('Top Bar Tests', () => {
        /** Related to User Stories
         * EGVFOUR-42, EGVFOUR-109
         */

        it('C30092768 - TopBar Acc name Validation', () => {
            //The name on TopBar must be displayed as "full name" 1st and last name(1st name is a ENV variable)
            equityGateway.TopBar.accDetails(Cypress.env('EQUITY_GATEWAY_DEFAULT_ACC_FULL_NAME'))
        })

        it('C30092768 - TopBar ACC Menu and Hrefs Validation', () => {
            /** Validate Menu Items and respective Hrefs
             *  topbarAccMenuLabels & topbarAccMenuHRefs must contain the same length
             */
            const topbarAccMenuLabels = [
                'Personal Information',
                'Bank Account',
                'Tax Documents'
            ]
            const topbarAccMenuHRefs = [
                '/my-account/profile/personal-information',
                '/my-account/account-preferences/bank-account',
                '/my-account/tax/tax-documents'
            ]
            //Check Menu and URLS
            equityGateway.TopBar.accMenuHrefValidations(topbarAccMenuLabels, topbarAccMenuHRefs)
        })

        it('C30092768 - TopBar Acc Logout', () => {
            //The name on TopBar must be displayed as "full name" 1st and last name(1st name is a ENV variable)
            equityGateway.TopBar.accMenuLogout()
            cy.url().should('contain', '/welcome')
        })
    })
})

