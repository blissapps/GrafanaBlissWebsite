import EquityGateway from '../../../support/pages/equityGateway';

const equityGateway = new EquityGateway()
describe('My Account TAX Section', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login() //Workaround for now
        equityGateway.TopBar.accMenuClick('', '')
        equityGateway.AccBasePage.gotoPage('Tax documents', '/tax-documents')
    })

    context('General Validations', () => {
        it('C30092728 - Page General Validations', () => {
            equityGateway.AccTax.header('Tax documents')
            cy.fixture('gateway/myAccount/taxInfo').then((jsonObject) => {
                const stringArray = Object.values(jsonObject);
                equityGateway.AccTax.infoSector(stringArray);
            });
        })
    })

    context('Filter Validations', () => {
        it('Filter by Year', () => {
            const elementsExist = [
                'Report - 2020'
            ]
            const elementsNotExist = [
                'Report - 2021',
                'Report - 2022'
            ]
            equityGateway.AccTax.yearMenuSelect(3, '2020')
            equityGateway.AccTax.reportsElements(elementsExist, 'exist') //Passing an array because in future developments it will receive more that
            equityGateway.AccTax.reportsElements(elementsNotExist, 'not.exist')
        })

        it('Filter by Type', () => {
            const elementsExist = [
                'Report - 2020'
            ]
            const elementsNotExist = [
                'Report - 2021',
                'Report - 2022',
                'No results available'
            ]
            equityGateway.AccTax.typeMenuSelect(2, '1089 Report')
            equityGateway.AccTax.reportsElements(elementsExist, 'exist') //Passing an array because in future developments it will receive more that
            equityGateway.AccTax.reportsElements(elementsNotExist, 'not.exist')
        })

        it('Complex Filter Year Type Match', () => {
            const elementsExist = [
                'Report - 2020'
            ]
            const elementsNotExist = [
                'Report - 2021',
                'Report - 2022',
                'No results available'
            ]
            equityGateway.AccTax.yearMenuSelect(3, '2020')
            equityGateway.AccTax.typeMenuSelect(2, '1089 Report')
            equityGateway.AccTax.reportsElements(elementsExist, 'exist') //Passing an array because in future developments it will receive more that
            equityGateway.AccTax.reportsElements(elementsExist, 'exist') //Passing an array because in future developments it will receive more that
            equityGateway.AccTax.reportsElements(elementsNotExist, 'not.exist')
            equityGateway.AccTax.reportsElements(elementsNotExist, 'not.exist')
        })

        it('Complex Filter Year Type Not Match', () => {
            const elementsExist = [
                'No results available'
            ]
            const elementsNotExist = [
                'Report - 2021',
                'Report - 2022'
            ]
            equityGateway.AccTax.yearMenuSelect(1, '2022')
            equityGateway.AccTax.typeMenuSelect(2, '1089 Report')
            equityGateway.AccTax.reportsElements(elementsExist, 'exist') //Passing an array because in future developments it will receive more that
            equityGateway.AccTax.reportsElements(elementsExist, 'exist') //Passing an array because in future developments it will receive more that
            equityGateway.AccTax.reportsElements(elementsNotExist, 'not.exist')
            equityGateway.AccTax.reportsElements(elementsNotExist, 'not.exist')
        })
    })
})