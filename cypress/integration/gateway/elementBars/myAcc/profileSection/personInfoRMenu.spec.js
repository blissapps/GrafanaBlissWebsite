import EquityGateway from '../../../../../support/pages/equityGateway';

const equityGateway = new EquityGateway()

describe('MyAcc Side Profile RMenu Tests', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login() //Workaround for now
        equityGateway.AccBase.goToMyAccPage()
    })

    context('Iterative Right Menu Validations', () => {
        it('Side Menu Validation', () => {
            const menuItems = [
                'Profile',
                'Tax identification',
                'Identifiers',
                'Contact details',
                'Address details'
            ]
            equityGateway.PersonInfoRMenu.sideMenuValidation(menuItems)
        })
    })

    context('Right Menu Personal Info Validation', () => {
        it('Side Menu Validation', () => {
            const menuItems = [
                'How are my personal details being used?',
                'Lorem ipsum dolor sit amet,'
            ]
            equityGateway.PersonInfoRMenu.sideInfoSector(menuItems)
        })
    })
})
