import BasePage from './basePage'

const selectors = {
  selectSubjectId: '#id_contact',
  emailInputId: '#email',
  orderReferenceInputId: '#id_order',
  message: '#message',
  alertSuccessMessage: '//p[@class="alert alert-success"]'
};

class ContactUsPage extends BasePage{
    
    /**
     * 
     * @param {string} subjectHeading Choose between 'Customer service' or 'Webmaster'
     */
    SendOutMessage(subjectHeading){
      this.selectById(selectors.selectSubjectId, subjectHeading)
      this.typeInputValueById(selectors.emailInputId, "test@test.com")
      this.typeInputValueById(selectors.orderReferenceInputId, "123456")
      this.typeTextAreaValueById(selectors.message, 'test test')
      this.clickButtonByText("Send")
    }

    /**
     * Get a successfully message after sending a correct message to the suport team
     */
    getSuccessfullySentMessageAlert(){
      return cy.xpath(selectors.alertSuccessMessage).contains("Your message has been successfully sent to our team.")
    }
    
  }
  
export default ContactUsPage;
