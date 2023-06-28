import BasePage from '../../basePage'

const selectors = {
    pageHeader: '.eg-security > h2',
    pageInfo: '.mt-3',
    cardSector: 'gs-radio-button-option[data-test-id="sw-radio-btn-1"]',
    cardElementp1: ':nth-child',
    cardElementp2: ' > .wrapper',
    stockDerivation: ' > .w-full > .justify-content-start > .mb-4 > .eg-security__class-container > .flex-row > .flex > .text-small',
    stockValue: ' > .w-full > .justify-content-start > .mb-4 > .eg-security__class-container > .pr-5',
    confirmationModal: '.eg-modal__modal',
    btnConfirmationModalCancel: 'gs-button[type="icon"]',
    btnConfirmationModalConfirm: 'gs-button[appearance="flat"][size="large"]'
}

class salesWizSecurityPage extends BasePage {
    pageTitle(title){
        cy.get(selectors.pageHeader).should('have.text', title)
    }

    pageInfo(pageInfo){
        cy.get(selectors.pageInfo).should('have.text', pageInfo)
    }

    cardClick(cardNumber){
        selectors.cardSector = `gs-radio-button-option[data-test-id="sw-radio-btn-${cardNumber}"]`
        cy.get(selectors.cardSector).click()
    }

    cardConfirmationModal(confirmORcancel){
        switch (confirmORcancel) {
            case 'confirm':
                cy.get(selectors.confirmationModal).should('be.visible')
                cy.get(selectors.btnConfirmationModalConfirm).contains('Confirm').click({ force: true })
                break
            case 'cancel':
                cy.get(selectors.confirmationModal).should('be.visible')
                cy.get(selectors.btnConfirmationModalCancel).contains('Confirm').click({ force: true })
                break
            default:
                throw new Error('Unexpected "confirmORcancel" statement, Status: ' + confirmORcancel)
        }
    }

    cardValidation(cardNumber, generalItems, currency, currencyValue, stockDerivation){
        let sharesValueRgx
        selectors.cardSector = `gs-radio-button-option[data-test-id="sw-radio-btn-${cardNumber}"]`
        const shareDerivation = {
            sharesDerivationPositiveRgx: /\+[0-9]*\.[0-9]+ \(\+ [0-9]*\.[0-9]+%\)/,
            sharesDerivationNegativeRgx: /-[0-9]*\.[0-9]+ \(- [0-9]*\.[0-9]+%\)/
        }

        generalItems.forEach((item) => {
            cy.get(selectors.cardSector)
                .contains(item)
                .should('exist')
        })

        switch (currency) {
            case 'USD':
                sharesValueRgx = new RegExp(`\\$${currencyValue} USD`)
                cy.get(selectors.cardSector+selectors.cardElementp2+selectors.stockValue)
                    .invoke('text')
                    .should('match', sharesValueRgx)
                break
            case 'EUR':
                sharesValueRgx = new RegExp(`\\u20AC${currencyValue} EUR`)
                cy.get(selectors.cardSector+selectors.cardElementp2+selectors.stockValue)
                    .invoke('text')
                    .should('match', sharesValueRgx)
                break
            case 'GBP':
                sharesValueRgx = new RegExp(`\\£${currencyValue} GBP`);
                cy.get(selectors.cardSector+selectors.cardElementp2+selectors.stockValue)
                    .invoke('text')
                    .should('match', sharesValueRgx)
                break
            case 'BRL':
                sharesValueRgx = new RegExp(`\\R\\$${currencyValue} BRL`)
                cy.get(selectors.cardSector+selectors.cardElementp2+selectors.stockValue)
                    .invoke('text')
                    .should('match', sharesValueRgx)
                break
            default:
                throw new Error('Passed "currencyValue" statement was not expected')
        }

        switch (stockDerivation) {
            case 'UP':
                cy.get(selectors.cardSector+selectors.cardElementp2+selectors.stockDerivation)
                    .invoke('text')
                    .should('match', shareDerivation.sharesDerivationPositiveRgx)
                break

            case 'DOWN':
                cy.get(selectors.cardSector+selectors.cardElementp2+selectors.stockDerivation)
                    .invoke('text')
                    .should('match', shareDerivation.sharesDerivationNegativeRgx)
                break
            default:
                throw new Error('Passed "stockDerivation" statement was not expected')
        }
    }
}
export default salesWizSecurityPage