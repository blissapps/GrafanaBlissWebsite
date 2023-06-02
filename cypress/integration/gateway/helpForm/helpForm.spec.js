import EquityGateway from '../../../support/pages/equityGateway'

const equityGateway = new EquityGateway()
describe('Help form page tests - Not Authenticated', () => {
  beforeEach(() => {
    const auth = false
    equityGateway.HelpForm.navigateToHelpDesk(auth)
  })
  context('General Forms Validations', () => {
    /** Related to User Stories
     * EGVFOUR-39, EGVFOUR-151
     **/
    it('C30092756, C30092759 - Helpdesk Screen Layout', () => {
      const auth = false
      equityGateway.HelpForm.validateFormElements(auth)
    })

    /** Related to User Stories
     * EGVFOUR-40
     */
    it('C30092757 - Helpdesk Screen Components', () => {
      equityGateway.HelpForm.fillInputElement('emailSubject', 'Automated Test')
      equityGateway.HelpForm.fillInputElement('emailMessage', 'Generating Automated Test Components Testing')
      equityGateway.HelpForm.fillInputElement('emailFirstLastName', 'MR Automated Test')
      equityGateway.HelpForm.fillInputElement('emailRequester', 'aut@test.org')
      equityGateway.HelpForm.validateElementAndClass('submitButton', 'disable', true)
    })

    /** Related to User Stories
     * EGVFOUR-40, EGVFOUR-199
     */
    it('C30092759, C30092760 - Subject Field Error Validations', () => {
      equityGateway.HelpForm.validateInputCustomError('emailSubject', 'SubjectTest', 'none')
      equityGateway.HelpForm.validateInputFieldCharsError('emailSubject', 55, ' Max length is 55. Please update the field to match the requirements\n')
    })

    /** Related to User Stories
     * EGVFOUR-40, EGVFOUR-199
     */
    it('C30092759, C30092761 - Message Field Error Validations', () => {
      equityGateway.HelpForm.validateInputCustomError('emailMessage', 'MessageTest', 'none')
      equityGateway.HelpForm.validateInputFieldCharsError('emailMessage', 500, ' Max length is 500. Please update the field to match the requirements\n')
    })

    /** Related to User Stories
     * EGVFOUR-40, EGVFOUR-199
     */
    it('C30092759, C30092764 - First and Last Name Field Error Validations', () => {
      equityGateway.HelpForm.validateInputCustomError('emailFirstLastName', 'Automated Test', 'none')
      equityGateway.HelpForm.validateInputCustomError('emailFirstLastName', 'MR. Automated Test', ' First and last name can only use: a-z A-Z 0-9 _ -.\n', false)
    })

    /** Related to User Stories
     * EGVFOUR-40, EGVFOUR-199
     */
    it('C30092759, C30092765 - Email Field Error Validations', () => {
      equityGateway.HelpForm.validateInputCustomError('emailRequester', 'mail', 'none')
      equityGateway.HelpForm.validateInputCustomError('emailRequester', 'mail.mail.org', " Email format should contain '@'.\n", false)
    })
  })
})

describe('Help form page tests - Authenticated', () => {
  beforeEach(() => {
    equityGateway.LoginPage.login() //Workaround for now
    //cy.loginWithUI(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER_AUTH'), Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
    equityGateway.HelpForm.navigateToHelpDesk()
  })

  context('General Forms Validations', () => {
    /** Related to User Stories
     * EGVFOUR-39, EGVFOUR-151
     */
    it('C30092756, C30092759 - Helpdesk Screen Layout', () => {
      equityGateway.HelpForm.validateFormElements()
    })

    /** Related to User Stories
     * EGVFOUR-40
     */
    it('C30092757 - Helpdesk Screen Components', () => {
      equityGateway.HelpForm.fillInputElement('emailSubject', 'Automated Test')
      equityGateway.HelpForm.fillInputElement('emailMessage', 'Generating Automated Test Components Testing')
      equityGateway.HelpForm.validateElementAndClass('submitButton', 'disable', true)
    })

    /** Related to User Stories
     * EGVFOUR-40, EGVFOUR-199
     */
    it('C30092759, C30092762 - Subject Field Error Validations', () => {
      equityGateway.HelpForm.validateInputCustomError('emailSubject', 'SubjectTest', 'none')
      equityGateway.HelpForm.validateInputFieldCharsError('emailSubject', 55, ' Max length is 55. Please update the field to match the requirements\n')
    })

    /** Related to User Stories
     * EGVFOUR-40, EGVFOUR-199
     */
    it('C30092759, C30092763 - Message Field Error Validations', () => {
      equityGateway.HelpForm.validateInputCustomError('emailMessage', 'MessageTest', 'none')
      equityGateway.HelpForm.validateInputFieldCharsError('emailMessage', 500, ' Max length is 500. Please update the field to match the requirements\n')
    })
  })
})
