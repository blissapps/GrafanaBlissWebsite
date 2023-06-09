import BasePage from '../../basePage'

const selectors = {
    headName: '.text-h2',
    activityWidget: '.eg-activity-widget',
    activityUrl: '.eg-activity-widget > :nth-child(1) > .mr-2',
    footer: '.eg-footer'
}

class Dashboard extends BasePage {
    home(acc1stName){
        cy.get(selectors.headName).contains(`Hello, ${acc1stName}`)
        cy.get(selectors.activityWidget).contains('Activity')
        cy.get(selectors.activityWidget).contains('In progress')
        cy.get(selectors.activityWidget).contains('Upcoming')
        cy.get(selectors.activityUrl).should(($element) => {
            const url = $element.attr('href')
            expect(url).to.contain('/activity')
        })
    }

    footer(elementArray){
        elementArray.forEach((item) => {
            cy.get(selectors.footer).contains(item).should('exist');
        })
    }

    checkPageUrl(){
        this.checkUrl('/dashboard')
    }
}
export default Dashboard