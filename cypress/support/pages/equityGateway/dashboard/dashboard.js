import BasePage from '../../basePage'

const selectors = {
    headName: '.text-h2',
    activityWidget: '.eg-activity-widget',
    activityUrl: '.eg-activity-widget > :nth-child(1) > .mr-2',
    footer: '.eg-footer'
}

class Dashboard extends BasePage {
    home(acc_name){
        cy.get(selectors.headName).contains(`Hello, ${acc_name}`)
        cy.get(selectors.activityWidget).contains('Activity')
        cy.get(selectors.activityWidget).contains('In progress')
        cy.get(selectors.activityWidget).contains('Upcoming')
        cy.get(selectors.activityUrl).should(($element) => {
            const url = $element.attr('href')
            expect(url).to.contain('/activity')
        });
    }

    footer(){
        cy.get(selectors.footer).contains('Terms and Conditions').should(($element) => {
            const url = $element.attr('href')
            expect(url).to.contain('/terms-and-conditions')
        });
        cy.get(selectors.footer).contains('Privacy Policy').should(($element) => {
            const url = $element.attr('href')
            expect(url).to.contain('/privacy-policy')
        });
        cy.get(selectors.footer).contains('Help').should(($element) => {
            const url = $element.attr('href')
            expect(url).to.contain('/help')
        });
    }
}
export default Dashboard