import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
//const dayjs = require('dayjs')
describe('Sidebar tests', () => {
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

    beforeEach(() => {
        equityGateway.LoginPage.login() //Workaround for now
        //cy.loginWithUI(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER_AUTH'), Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
    })

    context('Side Navigation Bar', () => {
        it('EGVFOUR-43 - Sidebar Pages Validation', () => {
            //TODO pages must include href when DEVs finish
            equityGateway.Sidebar.mainPages('1', 'Dashboard')
            equityGateway.Sidebar.mainPages('2', 'Portfolio')
            equityGateway.Sidebar.mainPages('3', 'Plans')
            equityGateway.Sidebar.mainPages('4', 'Transactions')
            equityGateway.Sidebar.mainPages('5', 'Statements')
            equityGateway.Sidebar.mainPages('6', 'Resources')

            //We must pass the URL that Support Page should contain
            equityGateway.Sidebar.support('/help')
        })

        it('EGVFOUR-43 - Sidebar Shares Validation', () => {
            //FIXME This should be adjusted to real test data also look at @equityGateway.Sidebar.shareInfo
            //equityGateway.Sidebar.shareInfo('Big Yellow Group PLC', '0.00', 'GBP', dayjs().format('MMM DD, H:mm'))
            equityGateway.Sidebar.shareInfo(shareVariables.name, shareVariables.amount, shareVariables.currency, shareVariables.date, shareVariables.sharesPositiveColor, shareVariables.sharesNegativeColor, shareVariables.sharesPositiveReg, shareVariables.sharesNegativeReg)
        })
    })

})
