import ContactUsPage from '../../support/pages/references_old/contactUsPage';

let contactUsUrl = Cypress.env('contactUsUrl');

describe('Contact us tests', () => {
    const contacUsPage = new ContactUsPage();

    beforeEach(() => {
        cy.visit(contactUsUrl); 
    });

    it('Send a message as customer service', () => {
        cy.skipOn('windows')
        contacUsPage.SendOutMessage("Customer service")
        contacUsPage.getSuccessfullySentMessageAlert().should('be.visible')
    });

    it('Send a message as Webmaster', () => {
        cy.skipOn('windows')
        contacUsPage.SendOutMessage("Webmaster")
        contacUsPage.getSuccessfullySentMessageAlert().should('be.visible')
    });

});
