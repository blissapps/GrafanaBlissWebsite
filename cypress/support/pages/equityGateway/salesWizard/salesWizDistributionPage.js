import BasePage from '../../basePage'

const selectors = {
  method: 'input[title=\'Method\']',
  currency: 'input[title=\'Currency\']',
  bankAccount: 'input[title=\'Bank account\']',
  selectorOption: 'gs-option',
  payrollInformation: 'div .information',
  bankAccountOption: 'Santander - G78NORTH 1234 5698 7267 45',
  bankAccountInfo: 'div.eg-distribution__address'
}

const methodOptions = ['Urgent wire', 'Wire', 'Residential address', 'Alternate address', 'Payroll']

const currencyOptions = ['Dollar ・ USD', 'Euro ・ EUR', 'Pound Sterling ・ GBP', 'Brazilian Real ・ BRL']

class salesWizDistributionPage extends BasePage {

  validatePageElements(){
    cy.get(selectors.method).should('be.enabled')
    cy.get(selectors.currency).should('be.enabled')
    this.checkSelectorOption(selectors.method, selectors.selectorOption, methodOptions)
    this.checkSelectorOption(selectors.currency, selectors.selectorOption, currencyOptions)
  }

  validatePayrollElements(){
    cy.get(selectors.method).should('be.enabled')
    cy.get(selectors.currency).should('be.enabled')
    this.selectElementByOption(selectors.method, selectors.selectorOption, 'Payroll')
    cy.get(selectors.payrollInformation).should('be.visible')
  }

  validateWireElements(urgency){
    const isUrgent = urgency ? 'Urgent wire' : 'Wire'
    cy.get(selectors.method).should('be.enabled')
    cy.get(selectors.currency).should('be.enabled')
    this.selectElementByOption(selectors.method, selectors.selectorOption, isUrgent)
    cy.get(selectors.bankAccount).should('be.enabled')
    this.selectElementByOption(selectors.bankAccount, selectors.selectorOption, selectors.bankAccountOption)
    cy.get(selectors.bankAccountInfo).should('be.visible')
    this.validateInformationUpdateLink()
  }

  validateAddressElements(addressType){
    cy.get(selectors.method).should('be.enabled')
    cy.get(selectors.currency).should('be.enabled')
    this.selectElementByOption(selectors.method, selectors.selectorOption, `${addressType} address`)
    cy.get(selectors.bankAccountInfo).should('be.visible')
    this.validateInformationUpdateLink()
  }

  checkSelectorOption(selector, optionSelectorType, options ){
    cy.get(selector).click()
    options.forEach(option => {
        cy.get(optionSelectorType).contains(option).should('be.visible')
    })
    cy.get(optionSelectorType).contains(options[0]).click()
  }

  selectElementByOption(selector, optionSelectorType, option) {
    cy.get(selector).click()
    cy.get(optionSelectorType).contains(option).click()
  }

  validateInformationUpdateLink(){
    cy.log('Step to validate the implementation of the information change info and link')
  }
}
export default salesWizDistributionPage
