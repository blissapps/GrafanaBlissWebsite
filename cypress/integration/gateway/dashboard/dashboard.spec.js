import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
//const dayjs = require('dayjs')
describe('Dashboard page tests', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login()
        //cy.loginWithUI(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER_AUTH'), Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
    })

    context('General Dashboard Validations', () => {
        it('EGVFOUR- 49 - Dashboard Home Elements Validation', () => {
            equityGateway.Dashboard.home(Cypress.env('EQUITY_GATEWAY_DEFAULT_ACC_NAME'))
        })
    })

    context('Component Header Share Details', () => {
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

        it('EGVFOUR-52/249 - Shares Details', () => {
            equityGateway.SharesHeader.sharesName(shareVariables.name)
            equityGateway.SharesHeader.sharesAmount(shareVariables.amount)
            equityGateway.SharesHeader.currency(shareVariables.currency)
            equityGateway.SharesHeader.date(shareVariables.date)
            equityGateway.SharesHeader.sharesFluctuation(shareVariables.sharesPositiveColor, shareVariables.sharesNegativeColor, shareVariables.sharesPositiveReg, shareVariables.sharesNegativeReg)

            //Match sidebar shares info
            equityGateway.Sidebar.shareInfo(shareVariables.name, shareVariables.amount, shareVariables.currency, shareVariables.date, shareVariables.sharesPositiveColor, shareVariables.sharesNegativeColor, shareVariables.sharesPositiveReg, shareVariables.sharesNegativeReg)
        })
    })

    context('Component Footer', () => {
        it('EGVFOUR-50 - Footer Elements validation', () => {
            equityGateway.Dashboard.footer()
        })
    })

    context('Portfolio Breakdown', () => {
        it('Portfolio - General view', () => {
            equityGateway.Portfolio.portfolioBasis( '1117') //label1 must be the amount of Units allocated to the Test Account
        })

        it('EGVFOUR-53 - Portfolio - Filter by Status', () => {
            equityGateway.Portfolio.filter(0) //Filter '0' stands for 'By Status'
            equityGateway.Portfolio.filterContent('Available', 'Unavailable')
        })

        it('EGVFOUR-54 - Portfolio - Filter by Type', () => {
            equityGateway.Portfolio.filter(1) //Filter '1' stands for 'By Type'
            equityGateway.Portfolio.filterContent('Options', 'Shares')
        })

        it('EGVFOUR-55 - Portfolio - Filter by Plan', () => {
            equityGateway.Portfolio.filter(2) //Filter '2' stands for 'By Plan'
            equityGateway.Portfolio.filterContent('SAYE', 'Employee purchase plan')
        })
    })
})
