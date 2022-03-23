import BasePeopleParticipantPage from '../basePeopleParticipantPage'

const properties = {
  pageURL: '/personal-profile/address-and-contact'
}

const addressOfResidenceSelectors = {
  stateInputField: ' #homeAddressField #stateField input'
}

class PersonalProfileAddressAndContactPage extends BasePeopleParticipantPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }

  /**
   * Fill out all the section Address of Residence with given parameters
   *
   * @param {string} address Address field to be filled. Send '' for don't fill nothing in this field
   * @param {string} addressLine2 Address Line 2 field to be filled. Send '' for don't fill nothing in this field
   * @param {string} addressLine3 Address Line 3 field to be filled. Send '' for don't fill nothing in this field
   * @param {string} postCode Post Code field to be filled. Send '' for don't fill nothing in this field
   * @param {string} city City field to be filled. Send '' for don't fill nothing in this field
   * @param {string} state State field to be filled. Send '' for don't fill nothing in this field
   * @param {string} country Country field to be filled. Send '' for don't fill nothing in this field
   */
  fillOutAddressOfResidenceSection(address = '', addressLine2 = '', addressLine3 = '', postCode = '', city = '', state = '', country = '') {
    if (address != '') {
      cy.log('To be implemented')
    }

    if (addressLine2 != '') {
      cy.log('To be implemented')
    }

    if (addressLine3 != '') {
      cy.log('To be implemented')
    }

    if (postCode != '') {
      cy.log('To be implemented')
    }

    if (city != '') {
      cy.log('To be implemented')
    }

    if (state != '') {
      cy.get(addressOfResidenceSelectors.stateInputField).type(state)
    }

    if (country != '') {
      cy.log('To be implemented')
    }
  }
}

export default PersonalProfileAddressAndContactPage
