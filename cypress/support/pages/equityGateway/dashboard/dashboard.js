import BasePage from '../../basePage'

const selectors = {
    headName: '.text-h2',
    activityWidget: '.eg-activity-widget',
    activityUrl: '.eg-activity-widget > :nth-child(1) > .mr-2'
}

class dashboard extends BasePage {

    home(acc_name, href){
        cy.get(selectors.headName).contains(`Hello, ${acc_name}`)
        cy.get(selectors.activityWidget).contains('Activity')
        cy.get(selectors.activityWidget).contains('In progress')
        cy.get(selectors.activityWidget).contains('Upcoming')
        cy.get(selectors.activityUrl).should(($element) => {
            const url = $element.attr('href');
            expect(url).to.contain('/activity');
        });
        cy.url().should('contain', href);
    }
}
export default dashboard