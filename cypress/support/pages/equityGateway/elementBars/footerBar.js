import BasePage from '../../basePage'

const selectors = {
  footerSection: 'footer[automationid="eg-footer"]'
}

class footerBar extends BasePage {
  elementsValidation(footerElements) {
    footerElements.forEach((item) => {
      cy.get(selectors.footerSection).contains(item).should('exist')
    })
  }

  checkPage(pageName, href) {
    cy.get(selectors.footerSection)
      .contains(pageName)
      .should(($element) => {
        const url = $element.attr('href')
        expect(url).to.contain(href)
      })
    cy.get(selectors.footerSection).contains(pageName).click()
  }
}

export default footerBar