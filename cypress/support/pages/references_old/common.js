let frontUrl = Cypress.env('frontUrl');

const selectors = {
    backToTheListBtn: 'input',
    headerTitle: 'h1',
    usernameInput: '#name',
    submitBtn: '[type="button"]',
    table: 'table',
    tableContent: 'tbody',
    tableContentList: 'tr',
    tableContentListEntries: 'td'
};


class CommonPage {
  visit() {
    cy.visit('');
  }

}

export default CommonPage;

export const browserTo = (page) => {
    switch (page) {
        case 'welcome':
            cy.visit(frontUrl);
            break;
        case 'customerList':
            browserTo('welcome');
            cy.get(selectors.usernameInput).type('test');
            cy.get(selectors.submitBtn).click();
            break;
        case 'contactsDetail':
            browserTo('customerList');
            cy.get(selectors.table).find(selectors.tableContent).children().as('customerlist')
              .get('@customerlist').children().eq(0).then(function($name) {
              const companyName = $name.text();
            cy.contains(companyName).click()
            });
            break;
    };
};

export const assertPageContent = (page) => {
    switch (page) {
        case 'welcome':
            cy.get('h1')
              .contains('Welcome to Customer App');
            cy.contains('Please provide your name:');
            cy.get(selectors.usernameInput)
              .should('have.attr', 'type' , 'text');
            cy.get(selectors.submitBtn)
              .should('have.attr', 'type' , 'button')
              .and('value', 'Submit');
            break;
        case 'customerList':
            cy.get(selectors.headerTitle)
            .contains('Welcome to Customer App');
        
            cy.get(selectors.table).find(selectors.tableContentList).children()
              .should($buttonsList => {
                expect($buttonsList.eq(0), 'column').to.have.text('Name');
                expect($buttonsList.eq(1), 'column').to.have.text('# of Employees');
                expect($buttonsList.eq(2), 'column').to.have.text('Size');
            });
            break;
        case 'contactsDetail':
            cy.contains('Customer Details');
            cy.contains('Name');
            cy.contains('# of Employees');
            cy.contains('Size');
            cy.contains('Contact');
            cy.get(selectors.backToTheListBtn)
              .should('have.attr', 'type', 'button')
              .and('have.attr', 'value', 'Back to the list');
            break;
    };
};
