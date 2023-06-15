import BasePage from '../../basePage'

const selectors = {
    headName: '.text-h2',
    activityWidget: '.eg-activity-widget',
    activityUrl: 'a.mr-2',
    footer: '.eg-footer'
}

class DashboardPage extends BasePage {
    home(acc1stName, activityElements){
        cy.get(selectors.headName).contains(`Hello, ${acc1stName}`)

        activityElements.forEach((item) => {
            cy.get(selectors.activityWidget).contains(item).should('exist');
        })

        cy.get(selectors.activityUrl).should(($element) => {
            const url = $element.attr('href')
            expect(url).to.contain('/activity')
        })
    }

    checkPageUrl(){
        this.checkUrl('/dashboard')
    }

    clickViewAllActivity(){
        cy.get(selectors.activityUrl).click()
    }
}
export default DashboardPage