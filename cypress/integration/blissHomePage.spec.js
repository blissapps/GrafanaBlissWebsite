import BlissHome from '../support/pages/blissHome'

const blissHome = new BlissHome()
describe('Bliss Home Page Tests', () => {
  beforeEach(() => {
    cy.session('navigate', () => {
      cy.visit('/')
    })
    cy.visit('/')
  })

  context('General Validations', () => {
    it('Validate Top Bar', () => {
      blissHome.TopMenu.validateTopBar()
    })

    it('Check Thumbnail', () => {
      blissHome.BlissHomePage.validateThumbnail()
    })

    it('Validate Work Projects', () => {
      blissHome.BlissHomePage.workProjects()
    })

    it('Validate Work Projects Swiper', () => {
      blissHome.BlissHomePage.workProjectsSwiper()
    })

    it('Validate Services', () => {
      blissHome.BlissHomePage.validateServices()
    })

    it('Validate Digital Solutions Container', () => {
      blissHome.BlissHomePage.cardsContainer()
    })

    it('Validate Stats Container', () => {
      blissHome.BlissHomePage.statsContainer()
    })

    it('Validate Quotes Container', () => {
      blissHome.BlissHomePage.quotesContainer()
      blissHome.BlissHomePage.btnExploreWork()
      blissHome.WorkPage.validateThumbnail()
      blissHome.WorkPage.validateWorkContent()
    })
  })

  context('Validate Top Menu', () => {
    it('Validate Get In Touch Button', () => {
      blissHome.TopMenu.btnGetInTouch()
    })
  })
})

describe('Contact Page Validation', () => {
  beforeEach(() => {
    cy.session('navigate', () => {
      cy.visit('/')
      blissHome.ContactPage.goToContact()
    })
    blissHome.ContactPage.goToContact()
  })

  context.skip('General Validations', () => {
    it('Validate Contact Page Thumbnail', () => {
      blissHome.ContactPage.validateThumbnail()
    })

    it('Validate Locations', () => {
      blissHome.ContactPage.validateLocationsContainer()
    })

    it('Validate Email List', () => {
      blissHome.ContactPage.validateEmailContainer()
    })

    it('Validate Form', () => {
      blissHome.ContactPage.validateForm('QA_FIRST_NAME', 'QA_LAST_NAME', 'QA_EMAIL')
    })
  })
})

