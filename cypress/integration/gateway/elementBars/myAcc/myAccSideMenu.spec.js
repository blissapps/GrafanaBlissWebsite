import EquityGateway from '../../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()

describe('MyAcc Side Menu Tests', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login() //Workaround for now
        equityGateway.AccBase.goToMyAccPage()
    })

    context('General Page Validations', () => {
        it('Side Menu Validation', () => {
            const menuItems = [
                'Personal Information',
                'Bank account',
                'Payments',
                'Password & Security',
                'Language',
                'Tax documents',
                'Help',
                'Log Out'
            ]
            equityGateway.MyAccSideMenu.sideMenuValidation(menuItems)
        })
    })
})
