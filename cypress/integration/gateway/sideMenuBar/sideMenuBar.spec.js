import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
//const dayjs = require('dayjs')
describe('SideMenuBar tests', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login() //Workaround for now
    })

    context('Side Navigation Bar', () => {
        /** Related to User Stories
         * EGVFOUR-43
         */

        it('C30092769 - SideMenuBar Content Validation', () => {
            //TODO pages must include href when DEVs finish
            equityGateway.SideMenuBar.mainPages('1', 'Dashboard')
            equityGateway.SideMenuBar.mainPages('2', 'Portfolio')
            equityGateway.SideMenuBar.mainPages('3', 'Plans')
            equityGateway.SideMenuBar.mainPages('4', 'Transactions')
            equityGateway.SideMenuBar.mainPages('5', 'Statements')
            equityGateway.SideMenuBar.mainPages('6', 'Resources')

            equityGateway.SideMenuBar.support('Support')
            equityGateway.SideMenuBar.support('Help')
        })

        it('C30092769 - SideMenuBar Shares Validation', () => {
            const shareVariables = {
                name: 'Big Yellow Group PLC',
                amount: '0.00',
                currency: 'GBP',
                date: 'Mar 31', //FIXME dayjs().format('MMM DD, H:mm'),
                share_status: 'positive',
                sharesPositiveColor: 'rgb(0, 153, 0)',
                sharesNegativeColor: 'rgb(223, 7, 7)',
                sharesPositiveReg: /\+[0-9]*\.[0-9]+ \(\+[0-9]*\.[0-9]+%\)/,
                sharesNegativeReg: /-[0-9]*\.[0-9]+ \(-[0-9]*\.[0-9]+%\)/
            }
            equityGateway.SideMenuBar.shareInfo(
                shareVariables.name,
                shareVariables.amount,
                shareVariables.currency,
                shareVariables.date,
                shareVariables.sharesPositiveColor,
                shareVariables.sharesNegativeColor,
                shareVariables.sharesPositiveReg,
                shareVariables.sharesNegativeReg
            )
        })
    })

})
