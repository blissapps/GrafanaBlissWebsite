import EquityGateway from '../../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
//const dayjs = require('dayjs')
describe('MainPageSideMenuBar tests', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login() //Workaround for now
    })

    context('Side Navigation Bar', () => {
        /** Related to User Stories
         * EGVFOUR-43
         */

        it('C30092769 - MainPageSideMenuBar Content Validation', () => {
            //TODO pages must include href when DEVs finish
            equityGateway.MainPageSideMenuBar.mainPages('1', 'Dashboard')
            equityGateway.MainPageSideMenuBar.mainPages('2', 'Portfolio')
            equityGateway.MainPageSideMenuBar.mainPages('3', 'Plans')
            equityGateway.MainPageSideMenuBar.mainPages('4', 'Transactions')
            equityGateway.MainPageSideMenuBar.mainPages('5', 'Statements')
            equityGateway.MainPageSideMenuBar.mainPages('6', 'Resources')

            equityGateway.MainPageSideMenuBar.support('Support') //Support Section
            equityGateway.MainPageSideMenuBar.support('Help') //Help Page presence validation
        })

        it('C30092769 - MainPageSideMenuBar Shares Validation', () => {
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
            equityGateway.MainPageSideMenuBar.shareInfo(
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
