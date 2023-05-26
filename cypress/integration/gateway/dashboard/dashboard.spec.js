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
        const shareVariables = {
            name: 'Big Yellow Group PLC',
            amount: '0.00',
            currency: 'GBP',
            date: 'Mar 31', //FIXME dayjs().format('MMM DD, H:mm'),
            share_status: 'positive',
            sharesPositiveColor: 'rgb(0, 153, 0)',
            sharesNegativeColor: 'rgb(223, 7, 7)',
            sharesPositiveReg: /[0-9]*\.[0-9]+ [0-9]*\.[0-9]+%/,  //FIXME \+[0-9]*\.[0-9]+ \(\+[0-9]*\.[0-9]+%\)
            sharesNegativeReg: /-[0-9]*\\.[0-9]+ -[0-9]*\\.[0-9]+%/ //FIXME -[0-9]*\.[0-9]+ \(-[0-9]*\.[0-9]+%\)
        }

        it('C30092773/.89/.90/.91 - Shares Details', () => {
            equityGateway.SharesHeader.sharesName(shareVariables.name)
            equityGateway.SharesHeader.sharesAmount(shareVariables.amount)
            equityGateway.SharesHeader.currency(shareVariables.currency)
            equityGateway.SharesHeader.date(shareVariables.date)
            equityGateway.SharesHeader.sharesFluctuation(shareVariables.sharesPositiveColor, shareVariables.sharesNegativeColor, shareVariables.sharesPositiveReg, shareVariables.sharesNegativeReg)

            //Match sidebar shares info
            equityGateway.SideMenuBar.shareInfo(shareVariables.name, shareVariables.amount, shareVariables.currency, shareVariables.date, shareVariables.sharesPositiveColor, shareVariables.sharesNegativeColor, shareVariables.sharesPositiveReg, shareVariables.sharesNegativeReg)
        })
    })

    context('Component Footer', () => {
        /** Related to User Stories
         * EGVFOUR-50
         */
        it('C30092771 - Footer Elements validation', () => {
            equityGateway.Dashboard.footer()
        })
    })

    context('Portfolio Breakdown', () => {
        /** Related to User Stories
         * EGVFOUR-53, EGVFOUR-54, EGVFOUR-55
         */
        it('Portfolio - General view', () => {
            equityGateway.Portfolio.portfolioBasis( '1117') //label1 must be the amount of Units allocated to the Test Account
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
