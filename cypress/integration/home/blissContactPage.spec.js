import BlissHome from '../../support/pages/blissHome'

const blissHome = new BlissHome()

describe('Bliss Blog Page Tests', () => {
  beforeEach(() => {
    blissHome.ContactPage.goToAboutUs()
  })

  context('General Contact Page Validations', () => {
    it('Check Bliss Contacts', () => {
      blissHome.ContactPage.checkContacts()
    })

    it('Check Form', () => {
      blissHome.ContactPage.fillForm()
    })
  })
})