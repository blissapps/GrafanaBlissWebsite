import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

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

