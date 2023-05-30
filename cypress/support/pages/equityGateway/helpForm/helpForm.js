import BasePage from '../../basePage'

// @ts-ignore
const selectors = {
  dashboardHelp: 'div .flex.mb-6 > a',
  clientLogo: 'eg-company-logo > img',
  contactHeader: 'h1',
  contactText: '.eg-contact__text',
  phoneHeader: 'div .flex-column > h2',
  phoneSubTitleTop: 'div .col-12.lg\:col-6.flex.p-5 > :nth-child(2)',
  phoneSubTitleBot: 'div .flex-column .p-5 > p.pb-5',
  phoneBodyTop: '.overline',
  phoneBodyBot: 'div .mr-5 :nth-child(2)',
  emailTitle: 'div .grid :nth-child(1) > h2',
  emailSubject: 'gs-input-field',
  emailMessage: 'textarea.ng-untouched.ng-pristine.ng-valid',
  emailFirstLastName: '',
  emailRequester: '',
  submitButton: '',
  footerTermsAndConditions: 'footer > div > a:nth-child(1)',
  footerPrivacyPolicy: 'footer > div > a:nth-child(2)',
  footerGSCopy: 'footer > div > p',
  footerGSLogo: 'footer > div > img'
}

class HelpForm extends BasePage {
  //TODO EX: METHOD 1
  help() {
    cy.get(selectors.dashboardHelp).click()
    expect(cy.url).to.contain('/help')
    cy.get(selectors.clientLogo).should('have.attr', 'src')
    cy.get(selectors.contactHeader).contains('Contact Us')
    cy.get(selectors.contactText).contains('Enter a detailed description of your query below')
    cy.get(selectors.phoneHeader).contains('Reach us by phone')
    cy.get(selectors.phoneSubTitleTop).contains('Monday to Friday')
    cy.get(selectors.phoneSubTitleBot).contains('08:00 AM - 5:30 PM')
    cy.get(selectors.phoneBodyTop).contains('English')
    cy.get(selectors.phoneBodyBot).contains('+44 2034056932')
  }

  //TODO EX: METHOD 2
  filterContent() {
    //TODO
  }
}
export default HelpForm
