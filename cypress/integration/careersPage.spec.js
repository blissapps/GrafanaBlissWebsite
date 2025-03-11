import BlissHome from '../support/pages/blissHome'

const blissHome = new BlissHome()

describe('Bliss Services Page Tests', () => {
  beforeEach(() => {
    cy.session('navigate', () => {
      cy.visit('/')
      blissHome.CareersPage.goToCareers()
    })
    blissHome.CareersPage.goToCareers()
  })

  context('General Validations', () => {
    it('Check Thumbnail', () => {
      blissHome.CareersPage.validateThumbnail()
    })

    it('Validate Self Application Button', () => {
      blissHome.CareersPage.btnContact()
    })

    it('Check Stats Container', () => {
      blissHome.CareersPage.validateStatsContainer()
    })

    it('Check Benefits Container', () => {
      blissHome.CareersPage.validateBenefitsContainer()
    })

    it('Validate Events Container', () => {
      blissHome.CareersPage.validateEventsContainer()
    })
  })
})