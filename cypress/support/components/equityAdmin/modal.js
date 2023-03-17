import BasePage from '../../pages/basePage'

const selectors = {
  modalPopup: '#modal-wrapper',
  modalTitle: '#modal-wrapper #modal-title',
  modalConfirmationMessage: '#modal-wrapper #confirm-message',
  modalDismissButton: '#modal-wrapper .modal-buttons #modal-dismiss-button',
  modalConfirmButton: '#modal-wrapper .modal-buttons #modal-confirm-button'
}

class Modal extends BasePage {
  /**
   * Assert a modal/popup is displayed on a page
   *
   * @param {boolean} displayed True is the default value to assert the modal is displayed, false otherwise
   */
  assertModalDisplayed(displayed = true) {
    displayed ? cy.get(selectors.modalPopup).should('be.visible') : cy.get(selectors.modalPopup).should('not.exist')
  }

  /**
   * Assert the content of the modal by sending the title and/or confirmation message
   *
   * @param {string} title The title displayed in the modal
   * @param {string} confirmationMessage  The confirmation message displayed in the modal
   */
  assertModalContent(title = '', confirmationMessage = '') {
    if (title === '' && confirmationMessage === '') {
      throw new Error('Option invalid for title and/or confirmation message. Check the parameters you are sending!')
    }

    title !== '' ? cy.get(selectors.modalTitle).should('contain', title) : null

    confirmationMessage !== '' ? cy.get(selectors.modalConfirmationMessage).should('have.text', confirmationMessage) : null
  }

  /**
   * Clicks in the button to confirm the modal
   */
  clickToConfirmModal() {
    cy.get(selectors.modalConfirmButton).click()
  }

  /**
   * Clicks in the button that cancels/dismiss the modal
   */
  clickToDismissModal() {
    cy.get(selectors.modalDismissButton).click()
  }
}

export default Modal
