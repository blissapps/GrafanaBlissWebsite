import BlissHome from '../support/pages/blissHome'

const blissHome = new BlissHome()
describe('Bliss Home Page Tests', () => {
  beforeEach(() => {
    cy.session('home', () => {
      cy.visit('/')
    })
    cy.visit('/')
  })

  context('General Validations', () => {
    it('Validate Top Bar Elements', () => {
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

    it('Validate Clickable elements', () => {
      blissHome.TopMenu.pagesRedirect('About')
      blissHome.TopMenu.pagesRedirect('Services')
      blissHome.TopMenu.pagesRedirect('Work')
      blissHome.TopMenu.pagesRedirect('Careers')
      blissHome.TopMenu.pagesRedirect('Blog')
      blissHome.TopMenu.pagesRedirect()
    })
  })
})

describe('Contact Page Validation', () => {
  beforeEach(() => {
    cy.session('contact', () => {
      cy.visit('/')
      blissHome.ContactPage.goToContact()
    })
    blissHome.ContactPage.goToContact()
  })

  context('General Validations', () => {
    it('Validate Contact Page Thumbnail', () => {
      blissHome.ContactPage.validateThumbnail()
    })

    it('Validate Locations', () => {
      blissHome.ContactPage.validateLocationsContainer()
    })

    it('Validate Email List', () => {
      blissHome.ContactPage.validateEmailContainer()
    })

    it('Validate Form Become CLient', () => {
      blissHome.ContactPage.validateForm('QA_first_name', 'QA_last_name', 'QA_email@test.com', '1')
      blissHome.ContactPage.validateBecameClient('QA Bliss Test', '910000000', 'This is a TEST performed by BLISS QA AT')
      blissHome.ContactPage.submitForm('check')
    })

    it('Validate Form Join Us', () => {
      blissHome.ContactPage.validateForm('QA_first_name', 'QA_last_name', 'QA_email@test.com', '2')
      blissHome.ContactPage.validateJoin('910000000', 'This is a TEST performed by BLISS QA AT')
      blissHome.ContactPage.submitForm('check')
    })

    it('Validate Form Other', () => {
      blissHome.ContactPage.validateForm('QA_first_name', 'QA_last_name', 'QA_email@test.com', '3')
      blissHome.ContactPage.validateEvrElse('910000000', 'This is a TEST performed by BLISS QA AT')
      blissHome.ContactPage.submitForm()
    })
  })
})

