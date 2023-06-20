import BasePage from '../../basePage'

const selectors = {
    headName: '.text-h2',
    activityWidget: '.eg-activity-widget',
    activityUrl: '.eg-activity-widget > :nth-child(1) > .mr-2',
    footer: '.eg-footer'
}

class DashboardPage extends BasePage {
    home(acc1stName, activityElements){
        cy.get(selectors.headName).contains(`Hello, ${acc1stName}`)

        if (activityElements !== undefined){
            activityElements.forEach((item) => {
                cy.get(selectors.activityWidget).contains(item).should('exist')
            })
        }

        cy.get(selectors.activityUrl).should(($element) => {
            const url = $element.attr('href')
            expect(url).to.contain('/activity')
        })
    }

    checkPageUrl(){
        this.checkUrl('/dashboard')
    }
}
export default DashboardPage