import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

describe('TopBar tests', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login() //Workaround for now
        //cy.loginWithUI(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER_AUTH'), Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
    })

    context('Top Navigation Bar', () => {
        /** Related to User Stories
         * EGVFOUR-42, EGVFOUR-109
        */
            const topbarAccMenuLabels = {
                    personalInfo: 'Personal Information',
                    bank: 'Bank Account',
                    tax: 'Tax Documents',
                    logout: 'Logout'
                }

            it('C30092768 - TopBar Acc name Validation', () => {
                //The name on TopBar must be displayed as "full name" 1st and last name(1st name is a ENV variable)
                equityGateway.TopBar.accDetails(Cypress.env('EQUITY_GATEWAY_DEFAULT_ACC_NAME')+' Maddox')
            })

            it('C30092786 - TopBar ACC Menu Validation', () => {
                equityGateway.TopBar.accDetails(Cypress.env('EQUITY_GATEWAY_DEFAULT_ACC_NAME')+' Maddox')
                //Check Menu and URLS
                equityGateway.TopBar.accMenu(
                    topbarAccMenuLabels.personalInfo,
                    topbarAccMenuLabels.bank,
                    topbarAccMenuLabels.tax,
                    topbarAccMenuLabels.logout
            )
        })
    })
})
