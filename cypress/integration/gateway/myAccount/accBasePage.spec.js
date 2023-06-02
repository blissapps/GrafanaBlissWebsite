import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('My Account Page', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login() //Workaround for now
        //FIXME Provisory
        cy.window().then((win) => {
            // @ts-ignore
            win.location.href = 'https://eg-v4-alpha-25.gsapps.dev/my-account/profile/personal-information';
        });
    })

    context('General Page Validations', () => {
        it('Side Menu Validation', () => {
            const menuItems = ['Personal Information', 'Bank account', 'Payments', 'Password & Security', 'Language', 'Tax documents', 'Help', 'Log Out']
            equityGateway.AccBasePage.sideMenu(menuItems)
        })
    })
})