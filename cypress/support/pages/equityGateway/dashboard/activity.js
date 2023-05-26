import BasePage from '../../basePage'

const selectors = {
    viewActivity: '.eg-activity-widget',
    breadcrumb: '.mb-7 > .flex'
}

class Activity extends BasePage {
    gotoActivity(){
        cy.get(selectors.viewActivity).contains('View all activity').should(($element) => {
            const url = $element.attr('href')
            expect(url).to.contain('/activity')
        });
        cy.get(selectors.viewActivity).contains('View all activity').click()
    }
    breadcrumbNavi(){
        cy.get(selectors.breadcrumb).contains('Dashboard').click()
    }

    test(){
        //TODO
    }
}
export default Activity