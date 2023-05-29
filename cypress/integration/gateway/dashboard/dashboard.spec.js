import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
//const dayjs = require('dayjs')
describe('Dashboard page tests', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login() //Workaround for now
        //cy.loginWithUI(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER_AUTH'), Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
    })

    context('General Dashboard Validations', () => {
        /** Related to User Stories
         * EGVFOUR-49
         */
        it('C30092770 - Dashboard Home Elements Validation', () => {
            equityGateway.Dashboard.home(Cypress.env('EQUITY_GATEWAY_DEFAULT_ACC_NAME'))
        })
    })

    context('Component Header Share Details', () => {
        /** Related to User Stories
         * EGVFOUR-52, EGVFOUR-249
         */
        const shareLabels = {
            name: 'Big Yellow Group PLC',
            amount: '0.00',
            currency: 'GBP',
            date: 'Mar 31', //FIXME dayjs().format('MMM DD, H:mm'),
            share_status: 'positive',
            sharesPositiveColor: 'rgb(0, 153, 0)',
            sharesNegativeColor: 'rgb(223, 7, 7)',
            sharesPositiveRgx: /[0-9]*\.[0-9]+ [0-9]*\.[0-9]+%/,  //FIXME \+[0-9]*\.[0-9]+ \(\+[0-9]*\.[0-9]+%\)
            sharesNegativeRgx: /-[0-9]*\\.[0-9]+ -[0-9]*\\.[0-9]+%/ //FIXME -[0-9]*\.[0-9]+ \(-[0-9]*\.[0-9]+%\)
        }

        it('C30092773/.789/.790/.791 - Shares Details', () => {
            equityGateway.SharesHeader.sharesName(shareLabels.name)
            equityGateway.SharesHeader.sharesAmount(shareLabels.amount)
            equityGateway.SharesHeader.currency(shareLabels.currency)
            equityGateway.SharesHeader.date(shareLabels.date)
            equityGateway.SharesHeader.sharesFluctuation(shareLabels.sharesPositiveColor, shareLabels.sharesNegativeColor, shareLabels.sharesPositiveRgx, shareLabels.sharesNegativeRgx)

            //Match sidebar shares info
            equityGateway.SideMenuBar.shareInfo(shareLabels.name, shareLabels.amount, shareLabels.currency, shareLabels.date, shareLabels.sharesPositiveColor, shareLabels.sharesNegativeColor, shareLabels.sharesPositiveRgx, shareLabels.sharesNegativeRgx)
        })
    })

    context('Component Footer', () => {
        /** Related to User Stories
         * EGVFOUR-50
         */
        it('Footer Elements Validation', () => {
            //As new elements may be included on footer this method validates the num of labels passed
            const expectedFooterItems = ['Terms and Conditions', 'Privacy Policy', 'Help'];

            equityGateway.Dashboard.footer(expectedFooterItems)
        })
    })

    context('Portfolio Breakdown', () => {
        /** Related to User Stories
         * EGVFOUR-53, EGVFOUR-54, EGVFOUR-55
         */
        it('Portfolio - General view', () => {
            equityGateway.Portfolio.portfolioBasis( '1117') //label1 must be the amount of Units allocated to the Test ACC
        })

        it('C30092774 - Filter by Status', () => {
            equityGateway.Portfolio.filter(0) //Filter '0' stands for 'By Status'
            equityGateway.Portfolio.filterContent('Available', 'Unavailable')
        })

        it('C30092775 - Filter by Type', () => {
            equityGateway.Portfolio.filter(1) //Filter '1' stands for 'By Type'
            equityGateway.Portfolio.filterContent('Options', 'Shares')
        })

        it('C30092776 - Filter by Plan', () => {
            equityGateway.Portfolio.filter(2) //Filter '2' stands for 'By Plan'
            equityGateway.Portfolio.filterContent('SAYE', 'Employee purchase plan')
        })
    })
})
