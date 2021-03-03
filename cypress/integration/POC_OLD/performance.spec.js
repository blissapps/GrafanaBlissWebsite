import BasePage from '../../support/pages/references_old/basePage';

describe('Performance execution', () => {
    const basePage = new BasePage();
    
    beforeEach(() => {
        cy.visit('/')
    });

    Cypress._.times(1, (k) => {
        it(`Login positive  ${k + 1} / 1`, () => {
            basePage.clickElementByText("Form Authentication")
            basePage.typeInputValueById("#username", "tomsmith")
            basePage.typeInputValueById("#password", "SuperSecretPassword!")
            basePage.clickElementByText(" Login")
            basePage.getElementByContainsText("Welcome to the Secure Area. When you are done click logout below.").should('be.visible')
        });
    })
    
});