import EquityGateway from '../../../support/pages/equityGateway';

const equityGateway = new EquityGateway()

describe('MyAcc Preferences Sector Tests', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login() //Workaround for now
    })

    context('Bank Account Validations', () => {
        /** Related to User Stories
         *  EGVFOUR-81
         */
        beforeEach(() => {
            equityGateway.AccBase.goToMyAccPage('Bank account')
        })

        it('General Page Validations', () => {
            equityGateway.AccPreferencesSector.bankAccGrlValidations(
                'Bank account',
                'Linked bank accounts (3)',
                '3/3 Bank account limit reached'
            )
        })

        it('C30092725 - Linked Accounts Validations', () => {
            cy.fixture('gateway/myAccount/linkedBankACC').then((jsonObject) => {
                const stringArray = Object.values(jsonObject);
                equityGateway.AccPreferencesSector.bankAccCards(stringArray);
            });
        })
    })

    context('Payments Validations', () => {
        /** Related to User Stories
         *  EGVFOUR-82
         */
        beforeEach(() => {
            equityGateway.AccBase.goToMyAccPage('Payments')
        })

        it('Page General Validations', () => {
            equityGateway.AccPreferencesSector.paymentsGrlValidations(
                'Payments',
                'Sale',
                'Dividend'
            )
        })

        it('C30092726 - Sale Distributions', () => {
            //TODO developments are not finished yet, waiting for DEV
            const elements = [
                'Distributions methods',
                'These are the methods in which you prefer to receive sale payments.',
                'Preferred delivery methods'
            ]
            /** Waiting for new Developments, for now it checks:
             * Section 1 or 2: 1=Distributions methods 2=Bank account
             * Elements: Array of anything that you want to verify inside that section,excluding "Preferred delivery methods"
             * Delivery: Refers to "Preferred delivery methods inside", for now its just 1 (not necessarily need to pass)
             */
            equityGateway.AccPreferencesSector.saleSection( elements, 'Wire Transfer')
        })

        it('C30092726 - Sale BankAcc', () => {
            //TODO developments are not finished yet, waiting for DEV
            const elements = [
                'Bank account',
                'Revolut • EURO (€)',
                '0192 (Personal account)',
                'Alison Smith'
            ]
            /** Waiting for new Developments, for now it checks:
             * Section 1 or 2: 1=Distributions methods 2=Bank account
             * Elements: Array of anything that you want to verify inside that section,excluding "Preferred delivery methods"
             * Delivery: Refers to "Preferred delivery methods inside", for now its just 1 (not necessarily need to pass)
             */
            equityGateway.AccPreferencesSector.saleSectionBank(elements)
        })

        it('C30092726 - Dividend Distributions', () => {
            //TODO developments are not finished yet, waiting for DEV
            const elements = [
                'Distributions methods',
                'These are the methods in which you prefer to receive sale payments.',
                'Preferred delivery methods'
            ]
            /** Waiting for new Developments, for now it checks:
             * Section 1 or 2: 1=Distributions methods 2=Bank account
             * Elements: Array of anything that you want to verify inside that section,excluding "Preferred delivery methods"
             * Delivery: Refers to "Preferred delivery methods inside", for now its just 1 (not necessarily need to pass)
             */
            equityGateway.AccPreferencesSector.dividendSection(elements, 'Wire Transfer')
        })

        it('C30092726 - Dividend BankAcc', () => {
            //TODO developments are not finished yet, waiting for DEV
            const elements = [
                'Bank account',
                'Revolut • EURO (€)',
                '0192 (Personal account)',
                'Alison Smith'
            ]
            /** Waiting for new Developments, for now it checks:
             * Section 1 or 2: 1=Distributions methods 2=Bank account
             * Elements: Array of anything that you want to verify inside that section,excluding "Preferred delivery methods"
             * Delivery: Refers to "Preferred delivery methods inside", for now its just 1 (not necessarily need to pass)
             */
            equityGateway.AccPreferencesSector.dividendSectionBank(elements)
        })
    })

    context('Language Validations', () => {
        /** Related to User Stories
         *  EGVFOUR-84
         */
        it('General Page validations', () => {
            //TODO developments are not finished yet, waiting for DEV
            const elements = [
                'Selected language',
                'EN - English',
                'English'
            ]
            equityGateway.AccBase.goToMyAccPage('Language')
            equityGateway.AccPreferencesSector.languageSection(elements)
        })
    })
})