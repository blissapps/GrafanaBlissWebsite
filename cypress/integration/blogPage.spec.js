import BlissHome from '../support/pages/blissHome'

const blissHome = new BlissHome()

describe('Bliss Services Page Tests', () => {
  beforeEach(() => {
    cy.session('navigate', () => {
      cy.visit('/')
      blissHome.BlogPage.goToBlog()
    })
    blissHome.BlogPage.goToBlog()
  })

  context('General Validations', () => {
    it('Check Thumbnail', () => {
      blissHome.BlogPage.validateThumbnail()
    })

    it('Validate Filters Button', () => {
      blissHome.BlogPage.btnFilters()
    })

    it('Check Posts Container', () => {
      blissHome.BlogPage.validatePostsContainer()
    })

    it('Check Posts Load More Button', () => {
      blissHome.BlogPage.btnPostsLoadMore()
    })
  })
})