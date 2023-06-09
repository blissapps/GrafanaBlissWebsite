import BasePage from '../../basePage'

// @ts-ignore
const selectors = {
    title: '.text-h2',
    profileName: '.mr-3 > .text-h5',
    profileSection: '#profile',
    profileSectionBirthPlace: 'input[placeholder="Place of birth"]',
    profileSectionBirthDate: 'input[placeholder="Date of birth"]',
    profileSectionCitizenship: 'input[placeholder="Citizenship"]',
    profileSectionNationality: 'input[placeholder="Nationality"]',
    taxSection: '#tax',
    taxSectionCountry: 'input[placeholder="Country of tax residence"]',
    taxSectionIdType: 'input[placeholder="Primary tax ID type"]',
    taxSectionIdNumber: 'input[placeholder="Primary tax ID number"]',
    identifiersSection: '#identifiers',
    identifiersSectionStockId: 'input[placeholder="Stockholder ID"]',
    identifiersSectionEmployeeId: 'input[placeholder="Employee ID"]',
    identifiersSectionExternalId: 'input[placeholder="External Participant ID"]',
    identifiersSectionTaxId: 'input[placeholder="Tax ID"]',
    identifiersSectionSocialId: 'input[placeholder="Social Security Number"]',
    contactSections: '#contacts',
    contactSectionsPersonalEmail: 'input[placeholder="personalEmailAddress"]',
    contactSectionsSuppliedEmail: 'input[placeholder="suppliedEmailAddress"]',
    contactSectionsHome: 'input[placeholder="Home"]',
    contactSectionsMobile: 'input[placeholder="Mobile"]',
    addressSection: '#address'
}

class accProfile extends BasePage {
    pageTitle(pageTitle){
        cy.get(selectors.title).contains(pageTitle)
    }
    accName(accName){
        cy.get(selectors.profileName).contains(accName)
    }
    profileContent(elements, birthPlace, birthDate, citizen, nation){
        if (elements && !birthPlace && !birthDate && !citizen && !nation) {
            elements.forEach((item) => {
                cy.get(selectors.profileSection).contains(item).should('exist')
            });
        } else if (!elements && birthPlace && birthDate && citizen && nation) {
            cy.get(selectors.profileSectionBirthPlace).should('include.value', birthPlace)
            cy.get(selectors.profileSectionBirthDate).should('have.value', birthDate)
            cy.get(selectors.profileSectionCitizenship).should('have.value', citizen)
            cy.get(selectors.profileSectionNationality).should('have.value', nation)
        } else {
            cy.wrap(false).should('be.true', 'Unexpected values')
        }

    }
    taxContent(elements, taxCountry, taxIdType, taxIdNumber){
        if (elements && !taxCountry && !taxIdType && !taxIdNumber) {
            elements.forEach((item) => {
                cy.get(selectors.taxSection).contains(item).should('exist')
            })
        } else if (!elements && taxCountry && taxIdType && taxIdNumber) {
            cy.get(selectors.taxSectionCountry).should('include.value', taxCountry)
            cy.get(selectors.taxSectionIdType).should('have.value', taxIdType)
            cy.get(selectors.taxSectionIdNumber).should('have.value', taxIdNumber)
        } else {
            cy.wrap(false).should('be.true', 'Unexpected values')
        }
    }
    identifiersContent(elements, stockId, employeeId, externalId, taxId, socialNumber){
        if (elements && !stockId && !employeeId && !externalId && !taxId && ! socialNumber) {
            elements.forEach((item) => {
                cy.get(selectors.identifiersSection).contains(item).should('exist')
            })
        } else if (!elements && stockId && employeeId && externalId && taxId && socialNumber) {
            cy.get(selectors.identifiersSectionStockId).should('have.value', stockId)
            cy.get(selectors.identifiersSectionEmployeeId).should('have.value', employeeId)
            cy.get(selectors.identifiersSectionExternalId).should('have.value', externalId)
            cy.get(selectors.identifiersSectionTaxId).should('have.value', taxId)
            cy.get(selectors.identifiersSectionSocialId).should('have.value', socialNumber)
        } else {
            cy.wrap(false).should('be.true', 'Unexpected values')
        }
    }
    contactContent(elements, personalEmail, suppliedEmail, home, mobile){
        if (elements && !personalEmail && !suppliedEmail && !mobile && !home) {
            elements.forEach((item) => {
                cy.get(selectors.contactSections).contains(item).should('exist')
            })
        } else if (!elements && personalEmail && suppliedEmail && mobile && home) {
            cy.get(selectors.contactSectionsPersonalEmail).should('have.value', personalEmail)
            cy.get(selectors.contactSectionsSuppliedEmail).should('have.value', suppliedEmail)
            cy.get(selectors.contactSectionsHome).should('have.value', home)
            cy.get(selectors.contactSectionsMobile).should('have.value', mobile)
        } else {
            cy.wrap(false).should('be.true', 'Unexpected values')
        }
    }
    addressContent(elements){
            elements.forEach((item) => {
                cy.get(selectors.addressSection).contains(item).should('exist')
            })
    }
}
export default accProfile