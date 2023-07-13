import BasePage from '../../basePage'

const selectors = {
  reviewEstimatedProceeds: {
    id: '[data-test-id="sw-review-order-estimated-proceeds"]',
    elements: [
      'Shares to sell',
      'Estimated gross sale',
      'Estimated gross proceeds',
      'Estimated commissions',
      'FX cost',
      'Estimated exchange rate',
      'Estimated net proceeds',
      'Estimated net proceeds (EUR)'
    ]
  },
  orderDetail: {
    id: '[data-test-id="sw-review-order-order-detail"]',
    elements: ['Order request date', 'Order type']
  },
  fundDistribution: {
    id: '[data-test-id="sw-review-order-fund-distribution"]',
    elements: ['Estimated distribution date', 'Distribution currency', 'Distribution method', 'Bank account']
  },
  notes: {
    id: '[data-test-id="sw-review-order-notes"]',
    elements: ['h2', 'p.mt-4']
  },
  confirmation: {
    id: '[data-test-id="sw-review-order-confirmation"]',
    elements: ['h2', 'p.text-color-cool80.mt-2']
  },
  submitButton: '[data-test-id="sw-review-order-confirmation-btn-submit"]',
  modalClose: 'gs-button.eg-modal__close'
}

class salesWizReviewOrderPage extends BasePage {
  validateElements() {
    // Header Section
    cy.get('h1').contains('Review order').scrollIntoView().should('be.visible')
    cy.get('gs-notification').scrollIntoView().should('have.attr', 'type').and('equal', 'warning')
    //Content Section
    cy.get('section').contains('Review estimated proceeds').scrollIntoView().should('be.visible')
    cy.get('section').contains('Order detail').scrollIntoView().should('be.visible')
    cy.get('section').contains('Fund distribution').scrollIntoView().should('be.visible')
    cy.get('section').contains('Notes').scrollIntoView().should('be.visible')
    cy.get('section').contains('Confirmation').scrollIntoView().should('be.visible')
    //Checkbox and Submit Section
    cy.get('gs-checkbox').scrollIntoView().should('be.visible')
    cy.get('gs-button').contains('Submit Sale Order ').scrollIntoView().should('be.visible')
  }

  validateModalElements() {
    this.validateSectionContent('modal_ApprovalsAndPayments')
    this.validateSectionContent('modal_TradingTermsAndConditions')
    cy.get('gs-button').contains('Submit').should('be.visible')
    cy.get('gs-button').contains('Dismiss').should('be.visible')
    cy.get(selectors.modalClose).should('be.visible')
    cy.get('h1').contains('Terms and Conditions')
  }

  validateTableElements(tableIdentifier) {
    const evaluateFunction = (value) => {
      expect(value).to.not.be.equal('')
    }
    for (let i = 0; i < selectors[tableIdentifier].elements.length; i++) {
      this.getTableData(selectors[tableIdentifier].id, selectors[tableIdentifier].elements[i], evaluateFunction)
    }
  }

  getTableData(tableID, tableRowID, expression) {
    let text = 'NOT FOUND'
    cy.get(tableID)
      .contains(tableRowID)
      .parents('tr')
      .find('.eg-table__second-column-first-item')
      .then(($el) => {
        text = $el.text()

        return cy.wrap(text).as('dataValue').then(expression)
      })
  }

  validateSectionContent(sectionJsonID) {
    cy.fixture('gateway/salesWizard/orderPageSectionsComp').then((data) => {
      const sectionData = data[sectionJsonID]

      if (sectionData) {
        const allElements = sectionData.elements

        allElements.forEach((element) => {
          cy.get(sectionData.id).find(element.elementType).contains(element.elementText).scrollIntoView().should('be.visible')
        })
      } else {
        throw new Error(`Section ${sectionJsonID} not found.`)
      }
    })
  }

  validateSubmitButton(accepted = true) {
    accepted
      ? cy
          .get('gs-checkbox')
          .click()
          .then(() => {
            cy.get(selectors.submitButton).should('not.have.class', 'disabled').click()
          })
      : cy.get(selectors.submitButton).should('have.class', 'disabled')
  }

  validateModalSubmitButton(accepted = true) {
    accepted
      ? cy.get('gs-button').contains('Submit').should('have.css', 'background-color', 'rgb(0, 101, 255)')
      : cy.get('gs-button').contains('Submit').should('have.css', 'background-color', 'rgb(0, 101, 255)')
  }

  validateModalCloseButton() {
    cy.get(selectors.modalClose).click()
    this.validateElements()
  }

  validateModalDismissButton() {
    cy.get('gs-button').contains('Dismiss').click()
    this.validateElements()
  }

  clickCheckBoxByName(checkboxName) {
    cy.get('section').contains(checkboxName).siblings('div').children('gs-checkbox').click()
  }
}

export default salesWizReviewOrderPage
