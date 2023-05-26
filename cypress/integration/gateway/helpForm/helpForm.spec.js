import EquityGateway from '../../../support/pages/equityGateway';

const equityGateway = new EquityGateway()
describe('Help form page tests', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login() //Workaround for now
        //cy.loginWithUI(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER_AUTH'), Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
    })

    context('General Forms Validations', () => {
        //FIXME EGVFOUR-XXX is the test reference on TestRail
        it('EGVFOUR-XXX - I AM A DESCRIPTION', () => {
            //TODO PAULO - EX: CALL helpForm.js
            //equityGateway.HelpForm.
        })

        it('EGVFOUR-XXX - I AM A DESCRIPTION', () => {
            //TODO PAULO - EX: TEST 2 context 1
        })
    })

    context('I AM A DESCRIPTION', () => {
        it('EGVFOUR-XXX - I AM A DESCRIPTION', () => {
            //TODO PAULO - EX: Teste 1 context 2
        })
    })
})