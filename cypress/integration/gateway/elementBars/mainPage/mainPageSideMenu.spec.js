import EquityGateway from '../../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

describe('MainPage SideMenu Tests', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login()
    })

    context('Side Navigation Bar', () => {
        /** Related to User Stories
         * EGVFOUR-43
         */

        it('C30092769 - MainPageSideMenu Content Validation', () => {
            equityGateway.MainPageSideMenu.mainPages('1', 'Dashboard')
            equityGateway.MainPageSideMenu.mainPages('2', 'Portfolio')
            equityGateway.MainPageSideMenu.mainPages('3', 'Plans')
            equityGateway.MainPageSideMenu.mainPages('4', 'Transactions')
            equityGateway.MainPageSideMenu.mainPages('5', 'Statements')
            equityGateway.MainPageSideMenu.mainPages('6', 'Resources')

            equityGateway.MainPageSideMenu.support('Help') //Help Page presence validation
        })

        it('C30092769 - MainPageSideMenu Shares Validation', () => {
            const shareVariables = {
                /**
                 * Provisory Mocked Data
                 */
                name: 'Big Yellow Group PLC',
                amount: '11.69',
                currency: 'GBP',
                date: 'Mar 31',
                share_status: 'positive',
                sharesPositiveColor: 'rgb(0, 153, 0)',
                sharesNegativeColor: 'rgb(223, 7, 7)',
                sharesPositiveReg: /\+[0-9]*\.[0-9]+ \(\+[0-9]*\.[0-9]+%\)/,
                sharesNegativeReg: /-[0-9]*\.[0-9]+ \(-[0-9]*\.[0-9]+%\)/
            }
            equityGateway.MainPageSideMenu.shareInfo(
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
