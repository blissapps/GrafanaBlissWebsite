import BlissHome from '../support/pages/blissHome'

const blissHome = new BlissHome()

describe('Bliss About US Page - Tests', () => {
  beforeEach(() => {
    cy.session('navigate', () => {
      cy.visit('/')
      blissHome.AboutUsPage.goToAboutUs()
    })
    blissHome.AboutUsPage.goToAboutUs()
  })

  context('General Validations', () => {
    it('Check Thumbnail', () => {
      blissHome.AboutUsPage.validateThumbnail()
    })

    it('Check Blog Content', () => {
      blissHome.AboutUsPage.validateBlogContent()
    })

    it('Check Blog Bliss Image', () => {
      blissHome.AboutUsPage.validateWorkImage()
    })

    it('Check Timeline Content', () => {
      blissHome.AboutUsPage.validateTimeline()
    })

    it('Check Clients Content', () => {
      blissHome.AboutUsPage.validateClientSlideShow()
    })

    it('Check Life at Bliss Content', () => {
      blissHome.AboutUsPage.validateLifeAtBliss()
    })

    it('Check Join Us Button', () => {
      blissHome.AboutUsPage.btnJoinUs()
    })
  })

  context('Navigation Bar Validation', () => {
  })
})