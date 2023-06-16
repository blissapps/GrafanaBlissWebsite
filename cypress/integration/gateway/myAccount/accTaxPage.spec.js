import EquityGateway from '../../../support/pages/equityGateway';

const equityGateway = new EquityGateway()
describe('MyAcc TAX Sector Tests', () => {
    beforeEach(() => {
        equityGateway.LoginPage.login() //Workaround for now
        equityGateway.TopBar.accMenuClick(null, 'Tax Documents')
    })

    context('General Validations', () => {
        it('C30092728 - Page General Validations', () => {
            equityGateway.AccTaxPage.header('Tax documents')
            cy.fixture('gateway/myAccount/taxInfo').then((jsonObject) => {
                const stringArray = Object.values(jsonObject);
                equityGateway.AccTaxPage.infoSector(stringArray);
            })
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
            equityGateway.AccTaxPage.yearMenuSelect(3, '2020')
            equityGateway.AccTaxPage.reportsElements(elementsExist, 'exist') //Passing an array because in future developments it will receive more that
            equityGateway.AccTaxPage.reportsElements(elementsNotExist, 'not.exist')
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
            equityGateway.AccTaxPage.typeMenuSelect(2, '1089 Report')
            equityGateway.AccTaxPage.reportsElements(elementsExist, 'exist') //Passing an array because in future developments it will receive more that
            equityGateway.AccTaxPage.reportsElements(elementsNotExist, 'not.exist')
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
            equityGateway.AccTaxPage.yearMenuSelect(3, '2020')
            equityGateway.AccTaxPage.typeMenuSelect(2, '1089 Report')
            equityGateway.AccTaxPage.reportsElements(elementsExist, 'exist') //Passing an array because in future developments it will receive more that
            equityGateway.AccTaxPage.reportsElements(elementsExist, 'exist') //Passing an array because in future developments it will receive more that
            equityGateway.AccTaxPage.reportsElements(elementsNotExist, 'not.exist')
            equityGateway.AccTaxPage.reportsElements(elementsNotExist, 'not.exist')
        })

        it('Complex Filter Year Type Not Match', () => {
            const elementsExist = [
                'No results available'
            ]
            const elementsNotExist = [
                'Report - 2021',
                'Report - 2022'
            ]
            equityGateway.AccTaxPage.yearMenuSelect(1, '2022')
            equityGateway.AccTaxPage.typeMenuSelect(2, '1089 Report')
            equityGateway.AccTaxPage.reportsElements(elementsExist, 'exist') //Passing an array because in future developments it will receive more that
            equityGateway.AccTaxPage.reportsElements(elementsExist, 'exist') //Passing an array because in future developments it will receive more that
            equityGateway.AccTaxPage.reportsElements(elementsNotExist, 'not.exist')
            equityGateway.AccTaxPage.reportsElements(elementsNotExist, 'not.exist')
        })
    })
})