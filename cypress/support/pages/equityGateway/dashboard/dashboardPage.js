import BasePage from '../../basePage'

const selectors = {
  headName: 'h1',
  activityWidget: '[data-test-id="dbrd-activity"]',
  activityUrl: '[data-test-id="dbrd-activity-link-view-all"]',
  footer: '.eg-footer'
}

class DashboardPage extends BasePage {
  home(acc1stName, activityElements) {
    cy.get(selectors.headName).contains(`Hello, ${acc1stName}`)

    if (activityElements !== undefined) {
      activityElements.forEach((item) => {
        cy.get(selectors.activityWidget).contains(item).should('exist')
      })
    }

    cy.get(selectors.activityUrl).should(($element) => {
      const url = $element.attr('href')
      expect(url).to.contain('/activity')
    })
  }

  checkPageUrl() {
    this.checkUrl('/dashboard')
  }

  clickViewAllActivity() {
    cy.get(selectors.activityUrl).click()
  }
}

export default DashboardPage