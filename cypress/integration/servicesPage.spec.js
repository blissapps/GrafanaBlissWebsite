import BlissHome from '../support/pages/blissHome'

const blissHome = new BlissHome()

describe('Bliss Services Page Tests', () => {
  beforeEach(() => {
    cy.session('navigate', () => {
      cy.visit('/')
      blissHome.ServicesPage.goToService()
    })
    blissHome.ServicesPage.goToService()
  })

  context('General Validations', () => {
    it('Check Thumbnail', () => {
      blissHome.ServicesPage.validateThumbnail()
    })

    it('Check Blog Content', () => {
      blissHome.ServicesPage.validateBlogContent()
    })

    it('Check Blog Bliss Image', () => {
      blissHome.ServicesPage.validateWorkImages()
    })

    it('Check Status Block Content', () => {
      blissHome.ServicesPage.validateStatsContainer()
    })

    it('Check Digital Solutions Content', () => {
      blissHome.ServicesPage.validateCardsBlock()
    })

    it('Check Locations Sector Content', () => {
      blissHome.ServicesPage.validateLocationsSector()
    })

    it('Validate Get in Touch  Button', () => {
      blissHome.ServicesPage.btnGetInTouch()
    })
  })
})