import BasePage from '../../basePage'

const selectors = {
    goToActivityBtn: '.eg-activity-widget',
    pageTitle: '.text-h2',
    breadcrumb: '.mb-7 > .flex',
    progressSectorTileHeader: '.mb-8 > .p-5',
    progressCounter: '.mb-8 > .p-5 > .overline',
    tabsBarHeader: '.tabs-bar',
    tabsFilter: '.eg-upcoming__filters'
}

class Activity extends BasePage {
    gotoActivity(){
        cy.get(selectors.goToActivityBtn).contains('View all activity').should(($element) => {
            const url = $element.attr('href')
            expect(url).to.contain('/activity')
        })
        cy.get(selectors.goToActivityBtn).contains('View all activity').click()
    }
    breadcrumbNavi(){
        cy.get(selectors.breadcrumb).contains('Dashboard').click()
    }
    pageValidation(page_title, sector1_title, sector2_title1, sector2_title2){
        cy.get(selectors.goToActivityBtn).contains(page_title)
        cy.get(selectors.progressSectorTileHeader).contains(sector1_title)
        cy.get(selectors.tabsBarHeader).within(() => {
            cy.contains(sector2_title1)
            cy.contains(sector2_title2)
        })
    }
    progressCounter(label1, label2){
        cy.get(selectors.progressCounter).should('contain', 'showing '+label1+' of '+label2)
    }

    progressElements(num){
        // @ts-ignore
        cy.get('.mb-8 > :nth-child(n)').filter((index, element) => {
            return Cypress.$(element).is(':nth-child(n)');
        }).its('length').should('eq', num+2);
    }

    button(label){
        cy.contains('gs-button', label).click({ force: true })
    }

    tabsBarElements(elementArray){
        elementArray.forEach((item) => {
            cy.get(selectors.tabsFilter).contains(item).should('exist');
        });
    }
}
export default Activity