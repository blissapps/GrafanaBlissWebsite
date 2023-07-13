import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

/**
 * https://globalshares.testrail.net/index.php?/suites/view/18820&group_by=cases:section_id&group_order=asc&display_deleted_cases=0&group_id=1026440
 * Sales Wizard Element Bar Test Suite which includes Footer
 */

describe('Footer Bar Tests', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login()
    })

    context('Component Footer', () => {
        /** Related to User Stories
         * EGVFOUR-50
         */
        it('Footer Elements Validation', () => {
            const expectedFooterItems = [
                'Terms and Conditions',
                'Privacy Policy',
                'Help'
            ]
            equityGateway.FooterBar.elementsValidation(expectedFooterItems)
        })

        it('Footer Elements URL Validation', () => {
            equityGateway.FooterBar.checkPage('Terms and Conditions', '/terms-and-conditions')
            equityGateway.FooterBar.checkPage('Privacy Policy', '/privacy-policy')
            equityGateway.FooterBar.checkPage('Help', '/help')
        })
    })
})

