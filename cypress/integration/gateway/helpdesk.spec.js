import EquityGateway from '../../support/pages/equityGateway';

const equityGateway = new EquityGateway()
describe('Login and Logout tests', () => {
    context('Successful scenarios', () => {
        before(() => {
            //Define Env Alpha25
            cy.visit(Cypress.env('EQUITY_GATEWAY_BASE_URL')+'/dev')
            equityGateway.Helpdesk.checkPageUrl()
        })

        it('**ID TO PLACE** Successful Fill Form', () => {
            equityGateway.Helpdesk.fillForm('I am a Subject', 'Im a Description', 'Flavio Oliveira', 'GG@TESTE.BLISS')
            //TODO

        })

    })
})