// @ts-nocheck
import BasePage from '../../../basePage'

const selectors = {
  progressStepper: '[data-test-id="sw-left-bar"]'
}

class salesWizSideLmenu extends BasePage {
  validaTeSideStepperElement() {
    const stepperSteps = ['Overview', 'Security', 'Share group', 'Amount to sell', 'Order type', 'Distribution', 'Review order']

    cy.get(selectors.progressStepper).should('be.visible')

    stepperSteps.forEach((step) => {
      cy.get(selectors.progressStepper).contains(step).should('be.visible')
    })
  }

  validateStepperStatus(swStepToValidate, active = true) {
    const isActive = active ? 'eg-stepper--completed' : 'eg-stepper--disabled'

    cy.get(selectors.progressStepper).contains(swStepToValidate).should('have.class', isActive)
  }

  validateStepperActionability(swStepToValidate, backward = true, previousMenu = swStepToValidate) {
    cy.get(selectors.progressStepper).contains(swStepToValidate).click()
    if (backward) {
      cy.url().should('include', `sale-wizard/${swStepToValidate.replaceAll(' ', '-').toLowerCase()}`)
    } else {
      cy.url().should('include', `sale-wizard/${previousMenu.replaceAll(' ', '-').toLowerCase()}`)
    }
  }
}

export default salesWizSideLmenu
