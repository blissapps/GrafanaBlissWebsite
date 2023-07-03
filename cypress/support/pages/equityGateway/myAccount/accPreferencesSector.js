import BasePage from '../../basePage'

// @ts-ignore
const selectors = {
    bankAccBasePage: '.ng-star-inserted',
    baseH1: '.text-h2',
    baseH2: '.text-h5',
    baseH3: '.eg-payments',
    bankAccBaseH2s2: 'section > .flex > p',
    saleSection: 'gs-card.p-7.mb-7.hover',
    saleSectionBank: ':nth-child(1) > .p-7.ng-star-inserted',
    dividendSection: 'gs-card.p-7.mb-4.hover',
    dividendSectionBank: ':nth-child(2) > gs-card.p-7.mb-7.hover',
    sectionDelivery: 'input[placeholder="Preferred delivery methods"]',
    languageSection: '.p-6'
}

class accPreferencesSector extends BasePage {
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

    saleSection(elements, delivery){ //Still in developments may suffer changes
        if (delivery != null){
            cy.get(selectors.saleSection+' '+selectors.sectionDelivery).should('contain.value', delivery)
        }
        elements.forEach((item) => {
            cy.get(selectors.saleSection).contains(item).should('exist')
        })
    }

    saleSectionBank(elements){ //Still in developments may suffer changes
        elements.forEach((item) => {
            cy.get(selectors.saleSectionBank).contains(item).should('exist')
        })
    }

    dividendSection(elements, delivery){ //Still in developments may suffer changes
        if (delivery != null){
            cy.get(selectors.saleSection+' '+selectors.sectionDelivery).should('contain.value', delivery)
        }
        elements.forEach((item) => {
            cy.get(selectors.dividendSection).contains(item).should('exist')
        })
    }

    dividendSectionBank(elements){ //Still in developments may suffer changes
        elements.forEach((item) => {
            cy.get(selectors.dividendSectionBank).contains(item).should('exist')
        })
    }

    languageSection(elements){ //Still in developments may suffer changes
        elements.forEach((item) => {
            cy.get(selectors.languageSection).contains(item).should('exist')
        })
    }
}
export default accPreferencesSector