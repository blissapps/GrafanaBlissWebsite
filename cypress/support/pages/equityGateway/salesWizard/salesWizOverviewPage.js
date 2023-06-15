import BasePage from '../../basePage'

const selectors = {
    overview: '.eg-overview'
}

// @ts-ignore
class salesWizOverviewPage extends BasePage {
    pageElementsValidation(elements){
        elements.forEach((item) => {
            cy.get(selectors.overview).contains(item).should('exist');
        });
    }
}
// @ts-ignore
export default salesWizOverviewPage