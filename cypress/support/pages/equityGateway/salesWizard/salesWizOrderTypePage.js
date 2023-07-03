import BasePage from '../../basePage'

/**
 * FIXME - Selectors that need to be fixed after ID development
 */

const selectors = {
  orderTypeTitle: 'header > h2',
  orderTypeButton: 'gs-radio-button-option',
  dayLimitOrder: '.border-color-accent > .wrapper > .bg-color-white > .cursor-auto > gs-input-field.ng-star-inserted > .input > .ng-untouched', //FIXME
  limitOrder: '.border-color-accent > .wrapper > .bg-color-white > .cursor-auto > :nth-child(2) > .input > .ng-untouched', //FIXME
  limitOrder2: ':nth-child(3) > .input > .ng-untouched', //FIXME
  closeBtn: ''
}

class salesWizOrderTypePage extends BasePage {
  /**
   * Validates if the elements are present in the page DOM
   */
  validatePageStructure() {
    cy.get(selectors.orderTypeTitle).scrollIntoView().contains('Order type')
    this.selectOrderTypeByName('Market Order')
    this.selectOrderTypeByName('Day limit order')
    this.selectOrderTypeByName("Limit Order - Good' til cancelled")
  }

  /**
   * Validates if the elements are displayed
   */
  validatePageInteractability() {
    cy.get(selectors.orderTypeTitle).contains('Order type').scrollIntoView().should('be.visible')
    this.selectOrderTypeByName('Market Order').scrollIntoView().should('be.visible')
    this.selectOrderTypeByName('Day limit order').scrollIntoView().should('be.visible')
    this.selectOrderTypeByName("Limit Order - Good' til cancelled").scrollIntoView().should('be.visible')
  }

  /**
   * @param {String} orderTypeName the name of the Order Type [card] to be selected
   * @returns the Order Type [card] element
   */
  selectOrderTypeByName(orderTypeName) {
    return cy.get(selectors.orderTypeButton).should('be.visible').contains(orderTypeName)
  }

  /**
   *
   * @param {String} orderTypeCard the Order Type [card] to select and fill the inputs
   */
  fillDayLimitInput(orderTypeCard) {
    if (orderTypeCard === 'Day Limit') {
      cy.get(selectors.dayLimitOrder).type('5')
    } else if (orderTypeCard === 'Limit Day Order') {
      cy.get(selectors.limitOrder).type('5')
      cy.get(selectors.limitOrder2).type('12-02-2026')
    }
  }

  /**
   * FIXME [SIMILAR VALIDATIONS NEED TO BE DONE FOR CALENDAR TYPE INPUT]
   * Method to validate the Top and Bottom Limits of the Day limit order input field
   * to be implemented and included in test flow as soon as the validations are being made
   */
  validateDayLimitInputLimits() {
    //Validate Top Limit
    cy.get('.input').type('13.27')
    // Validate errMsg
    // Validate nxtBtn is disabled

    //Validate Bottom Limit
    cy.get('.input').clear().type('4.64')
    // Validate errMsg
    // Validate nxtBtn is disabled
  }

  /**
   * FIXME [SIMILAR VALIDATIONS NEED TO BE DONE FOR CALENDAR TYPE INPUT]
   * Method to validate the type validation of the Day limit order input field
   * to be implemented and included in test flow as soon as the validations are being made
   */
  validateDayLimitInputType() {
    //Validate char input
    cy.get('.input').type('ASASA')
    // Validate errMsg
    // Validate nxtBtn is disabled

    //Validate special char input
    cy.get('.input').clear().type('##_A#"$')
    // Validate errMsg
    // Validate nxtBtn is disabled
  }

  /**
   * Method to validate the status proceeded after the correct information was filled and sent
   */
  validateMenuAdvanced() {
    cy.url().should('contain', '/sale-wizard/distribution')
  }
}
export default salesWizOrderTypePage
