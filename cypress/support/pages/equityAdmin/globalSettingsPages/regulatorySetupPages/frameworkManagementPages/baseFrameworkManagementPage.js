import BasePage from '../../../../basePage'

const selectors = {
  frameworkInputName: '#name input',
  frameworkInputNameInlineNotificationError: '#name div[class*="message"]',
  frameworkInputCode: '#code input',
  frameworkInputCodeInlineNotificationError: '#code div[class*="message"]',
  frameworkVisibilitySelector: '#visibility .select',
  frameworkVisibilityAllOption: '#option0',
  frameworkVisibilityResellerOption: '#option1',
  frameworkVisibilityClientOption: '#option2',
  createOrSaveButton: '#save-button.disabled',
  dismissButton: '#discard-button'
}

class BaseFrameworkManagementPage extends BasePage {
  /**
   * Change the Name of the current framework
   *
   * @param {string} frameworkName The name of the framework to fill the name input field
   */
  changeFrameworkName(frameworkName) {
    cy.get(selectors.frameworkInputName).as('frameworkInputName')
    cy.get('@frameworkInputName').should('be.visible').clear()

    frameworkName != '' ? cy.get('@frameworkInputName').should('be.visible').type(frameworkName) : null
    cy.forcedWait(300) // Necessary because sometimes the UI gets stuck if you use this method together with changeFrameworkCode
  }

  /**
   * Change the Code of the current framework
   *
   * @param {string} frameworkCode The code of the framework to fill the code input field
   */
  changeFrameworkCode(frameworkCode) {
    cy.get(selectors.frameworkInputCode).as('frameworkInputCode')
    cy.get('@frameworkInputCode').should('be.visible').clear()

    frameworkCode != '' ? cy.get('@frameworkInputCode').should('be.visible').type(frameworkCode) : null
    cy.forcedWait(300) // Necessary because sometimes the UI gets stuck if you use this method together with changeFrameworkName
  }

  /**
   * Change the Framework Visibility of the current framework
   *
   * @param {string} frameworkVisibilityOption The visibility option of the framework to be selected. It can be all, reseller, or client
   */
  changeFrameworkVisibility(frameworkVisibilityOption) {
    frameworkVisibilityOption = frameworkVisibilityOption.toLowerCase()
    cy.get(selectors.frameworkVisibilitySelector).find('input').click()

    switch (frameworkVisibilityOption) {
      case 'all':
        cy.get(selectors.frameworkVisibilityAllOption).click()
        break

      case 'reseller':
        cy.get(selectors.frameworkVisibilityResellerOption).click()
        break

      case 'client':
        cy.get(selectors.frameworkVisibilityClientOption).click()
        break

      default:
        throw new Error('Option for frameworkVisibilityOption is invalid!')
    }
  }

  // ----------------------------------------------------------------- ASSERTIONS -------------------------------------------------------------------- //

  /**
   * Assert an error message is displayed below the framework NAME field
   *
   * @param {string} textToValidate Send a text different than '' if you want to verify the text in the error message
   * @param {boolean} displayed Assert if an error message is displayed right bellow the input field
   */
  assertErrorMessageForNameInputFieldIsDisplayed(textToValidate = '', displayed = true) {
    displayed ? cy.get(selectors.frameworkInputNameInlineNotificationError).should('be.visible') : cy.get(selectors.frameworkInputNameInlineNotificationError).should('not.exist')

    textToValidate != '' ? cy.get(selectors.frameworkInputNameInlineNotificationError).should('contain.text', textToValidate) : null
  }

  /**
   * Assert an error message is displayed below the framework CODE field
   *
   * @param {string} textToValidate Send a text different than '' if you want to verify the text in the error message
   * @param {boolean} displayed Assert if an error message is displayed right bellow the input field
   */
  assertErrorMessageForCodeInputFieldIsDisplayed(textToValidate = '', displayed = true) {
    displayed ? cy.get(selectors.frameworkInputCodeInlineNotificationError).should('be.visible') : cy.get(selectors.frameworkInputCodeInlineNotificationError).should('not.exist')

    textToValidate != '' ? cy.get(selectors.frameworkInputCodeInlineNotificationError).should('contain.text', textToValidate) : null
  }

  /**
   * Assert if the Create or Save button is enabled
   *
   * @param {boolean} enabled True is the default value to assert the Create button is enabled, send false to validate otherwise
   */
  assertCreateOrSaveButtonEnabled(enabled = true) {
    if (enabled) {
      cy.get(selectors.createOrSaveButton).should('be.visible')
      cy.get(selectors.createOrSaveButton + '.disabled').should('not.exist')
    } else {
      cy.get(selectors.createOrSaveButton + '.disabled').should('be.visible')
    }
  }

  /**
   * Assert if the Dismiss button is enabled
   *
   * @param {boolean} enabled True is the default value to assert the Dismiss button is enabled, send false to validate otherwise
   */
  assertDismissButtonEnabled(enabled = true) {
    if (enabled) {
      cy.get(selectors.dismissButton).should('be.visible')
      cy.get(selectors.dismissButton + '.disabled').should('not.exist')
    } else {
      cy.get(selectors.dismissButton + '.disabled').should('be.visible')
    }
  }
}

export default BaseFrameworkManagementPage
