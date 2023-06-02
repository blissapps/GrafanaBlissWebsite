import EquityGateway from '../../../support/pages/equityGateway';

const equityGateway = new EquityGateway()
describe('My Account Preferences Section', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login() //Workaround for now
        //FIXME PROVISORY MENU NAV IS BROKEN
        cy.window().then((win) => {
            // @ts-ignore
            win.location.href = 'https://eg-v4-alpha-25.gsapps.dev/my-account/profile/personal-information';
        });
    })

    context('Bank Account Validations', () => {
        /** Related to User Stories
         *  EGVFOUR-81
         */
        beforeEach(() => {
            equityGateway.AccBasePage.gotoPage('Bank account', '/bank-account')
        })

        it('Page General Validations', () => {
            equityGateway.AccPreferences.bankAccGrlValidations(
                'Bank account',
                'Linked bank accounts (3)',
                '3/3 Bank account limit reached'
            )
        })

        it('C30092725 - Page Validations', () => {
            cy.fixture('gateway/myAccount/linkedBankACC').then((jsonObject) => {
                const stringArray = Object.values(jsonObject);
                equityGateway.AccPreferences.bankAccCards(stringArray);
            });
        })
    })

    context('Payments Validations', () => {
        /** Related to User Stories
         *  EGVFOUR-82
         */
        beforeEach(() => {
            equityGateway.AccBasePage.gotoPage('Payments', '/payments')
        })

        it('Page General Validations', () => {
            equityGateway.AccPreferences.paymentsGrlValidations(
                'Payments',
                'Sale',
                'Dividend'
            )
        })

        it('C30092726 - Sale Distributions', () => {
            //TODO developments are not finished yet
            const elements = [
                'Distributions methods',
                'These are the methods in which you prefer to receive sale payments.',
                'Preferred delivery methods'
            ]
            /** Waiting for new Developments, for now its build to pass:
             * Section 1 or 2: 1=Distributions methods 2=Bank account
             * Elements: Array of anything that you want to verify inside that section,excluding "Preferred delivery methods"
             * Delivery: Refers to "Preferred delivery methods inside", for now its just 1 (not necessarily need to pass)
             */
            equityGateway.AccPreferences.saleSection(1, elements, 'Wire Transfer')
        })

        it('C30092726 - Sale BankAcc', () => {
            //TODO developments are not finished yet
            const elements = [
                'Bank account',
                'Revolut • EURO (€)',
                '0192 (Personal account)',
                'Alison Smith'
            ]
            /** Waiting for new Developments, for now its build to pass:
             * Section 1 or 2: 1=Distributions methods 2=Bank account
             * Elements: Array of anything that you want to verify inside that section,excluding "Preferred delivery methods"
             * Delivery: Refers to "Preferred delivery methods inside", for now its just 1 (not necessarily need to pass)
             */
            equityGateway.AccPreferences.saleSection(2, elements)
        })

        it('C30092726 - Dividend Distributions', () => {
            //TODO developments are not finished yet
            const elements = [
                'Distributions methods',
                'These are the methods in which you prefer to receive sale payments.',
                'Preferred delivery methods'
            ]
            /** Waiting for new Developments, for now its build to pass:
             * Section 1 or 2: 1=Distributions methods 2=Bank account
             * Elements: Array of anything that you want to verify inside that section,excluding "Preferred delivery methods"
             * Delivery: Refers to "Preferred delivery methods inside", for now its just 1 (not necessarily need to pass)
             */
            equityGateway.AccPreferences.dividendSection(1, elements, 'Wire Transfer')
        })

        it('C30092726 - Dividend BankAcc', () => {
            //TODO developments are not finished yet
            const elements = [
                'Bank account',
                'Revolut • EURO (€)',
                '0192 (Personal account)',
                'Alison Smith'
            ]
            /** Waiting for new Developments, for now its build to pass:
             * Section 1 or 2: 1=Distributions methods 2=Bank account
             * Elements: Array of anything that you want to verify inside that section,excluding "Preferred delivery methods"
             * Delivery: Refers to "Preferred delivery methods inside", for now its just 1 (not necessarily need to pass)
             */
            equityGateway.AccPreferences.dividendSection(2, elements)
        })
    })

    context('Language Validations', () => {
        /** Related to User Stories
         *  EGVFOUR-84
         */
        it('Page General validations', () => {
            //TODO developments are not finished yet
            const elements = [
                'Selected language',
                'EN - English',
                'English'
            ]
            equityGateway.AccBasePage.gotoPage('Language', '/language')
            equityGateway.AccPreferences.languageSection(elements)
        })
    })
})