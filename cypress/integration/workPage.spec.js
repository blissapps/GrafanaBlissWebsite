import BlissHome from '../support/pages/blissHome'

const blissHome = new BlissHome()

describe('Bliss Services Page Tests', () => {
  beforeEach(() => {
    cy.session('navigate', () => {
      cy.visit('/')
      blissHome.WorkPage.goToWork()
    })
    blissHome.WorkPage.goToWork()
  })

  context('General Validations', () => {
    it('Check Thumbnail', () => {
      blissHome.WorkPage.validateThumbnail()
    })

    it('Check Work Content', () => {
      blissHome.WorkPage.validateWorkContent()
    })

    it('Check Work Load More Button', () => {
      blissHome.WorkPage.btnWorkContent()
    })

    it('Check Brands Container Swiper', () => {
      blissHome.WorkPage.brandsContainer()
    })

    it('Validate Get in Touch Button', () => {
      blissHome.WorkPage.btnGetInTouch()
    })
  })
})