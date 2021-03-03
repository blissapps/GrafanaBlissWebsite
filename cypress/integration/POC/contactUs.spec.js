import ContactUsPage from '../../support/pages/contactUsPage';

let contactUsUrl = Cypress.env('contactUsUrl');

describe('Contact us tests', () => {
    const contacUsPage = new ContactUsPage();

    beforeEach(() => {
        cy.visit(contactUsUrl); 
    });

    it('Send a message as customer service', () => {
        contacUsPage.SendOutMessage("Customer service")
        contacUsPage.getSuccessfullySentMessageAlert().should('be.visible')
    });

    it('Send a message as Webmaster', () => {
        contacUsPage.SendOutMessage("Webmaster")
        contacUsPage.getSuccessfullySentMessageAlert().should('be.visible')
    });

});
