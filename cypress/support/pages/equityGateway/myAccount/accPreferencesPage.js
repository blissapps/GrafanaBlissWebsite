import BasePage from '../../basePage'

// @ts-ignore
const selectors = {
    bankAccBasePage: '.ng-star-inserted',
    baseH1: '.text-h2',
    baseH2: '.text-h5',
    baseH3: '.eg-payments',
    bankAccBaseH2s2: 'section > .flex > p',
    saleSection: '.eg-my-account__section > :nth-child(2) > :nth-child(2)',
    dividendSection: '.eg-my-account__section > :nth-child(2) > :nth-child(3)',
    saleSectionDelivery: 'input[placeholder="Preferred delivery methods"]',
    languageSection: '.p-6'
}

class accPreferencesPage extends BasePage {
    bankAccGrlValidations(pageTitle, linkedAccs, accVal){
        cy.get(selectors.baseH1).contains(pageTitle)
        cy.get(selectors.baseH2).contains(linkedAccs)
        cy.get(selectors.bankAccBaseH2s2).contains(accVal)
    }
    bankAccCards(elements){
        elements.forEach((item) => {
            cy.get(selectors.bankAccBasePage).contains(item).should('exist')
        })
    }
    paymentsGrlValidations(pageTitle, section1, section2){
        cy.get(selectors.baseH1).contains(pageTitle)
        cy.get(selectors.baseH2).contains(section1)
        cy.get(selectors.baseH3).contains(section2)
    }
    saleSection(section, elements, delivery){ //Still in developments may suffer changes
        if (delivery != null){
            cy.get(selectors.saleSectionDelivery)
                .should(($input) => {
                    const value = $input.val();
                    expect(value).to.include(delivery);
                });
        }
        elements.forEach((item) => {
            cy.get(selectors.saleSection+` > :nth-child(${section+1})`).contains(item).should('exist')
        })
    }
    dividendSection(section, elements, delivery){ //Still in developments may suffer changes
        if (delivery != null){
            cy.get(selectors.saleSectionDelivery)
                .should(($input) => {
                    const value = $input.val();
                    expect(value).to.include(delivery);
                });
        }
        elements.forEach((item) => {
            cy.get(selectors.dividendSection+` > :nth-child(${section+1})`).contains(item).should('exist')
        })
    }
    languageSection(elements){ //Still in developments may suffer changes
        elements.forEach((item) => {
            cy.get(selectors.languageSection).contains(item).should('exist')
        })
    }
}
export default accPreferencesPage