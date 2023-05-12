import BasePage from '../basePage'

const selectors = {
    inputSubject: 'input[placeholder="Enter subject"]',
    inputDescription: 'input[placeholder="Enter detailed description"]',
    inputName: 'input[placeholder="Enter first and last name"]',
    inputEmail: 'input[placeholder="Enter email address"]'
}

class Helpdesk extends BasePage {
    checkPageUrl() {
        this.checkUrl(Cypress.env('EQUITY_GATEWAY_BASE_URL')+'/help')
    }

    fillForm(sub, desc, name, email){
        cy.get(selectors.inputSubject).type(sub)
        cy.get(selectors.inputDescription).type(desc)
        cy.get(selectors.inputName).type(name)
        cy.get(selectors.inputEmail).type(email)

        cy.contains('Submit').click()
    }
}
export default Helpdesk