import BlissHome from '../../support/pages/blissHome'

const blissHome = new BlissHome()
describe('Bliss Home Page Tests', () => {
  beforeEach(() => {
    blissHome.BlissHomePage.goToHome()
  })

  context('General Validations', () => {
    it('Check Home Menu', () => {
      blissHome.BlissHomePage.checkTestObject(0)
    })

    it('Check Home Banner', () => {
      blissHome.BlissHomePage.checkTestObject(0)
    })

    it('Check Home Buttons', () => {
      blissHome.BlissHomePage.checkTestObject(0)
    })
  })

  context('Navigation Bar Validation', () => {
    it('Check Home Form', () => {
      blissHome.BlissHomePage.checkForm()
    })
  })

  context('ReachOut Form Validation', () => {
    it('Check AboutUs Page', () => {
      blissHome.BlissHomePage.checkPage('aboutUs')
    })

    it('Check Work Page', () => {
      blissHome.BlissHomePage.checkPage('work')
    })

    it('Check Careers Page', () => {
      blissHome.BlissHomePage.checkPage('careers')
      blissHome.BlissHomePage.checkTestObject(9)
    })

    it('Check Contact Page', () => {
      blissHome.BlissHomePage.checkPage('contact')
    })

    it('Check Blog Page', () => {
      blissHome.BlissHomePage.checkPage('blog')
    })
  })
})

describe('Bliss Contact Form Page Tests', () => {
  beforeEach(() => {
    blissHome.BlissHomePage.goToHome()
  })

  context('General Validations', () => {
    it('Check Contact Form Page', () => {
      blissHome.BlissHomePage.checkTestObject(0)
    })

    it('Check Home Banner', () => {
      blissHome.BlissHomePage.checkTestObject(0)
    })

    it('Check Home Form', () => {
      blissHome.BlissHomePage.checkPage('contact')
      blissHome.BlissHomePage.fillForm()
    })
  })
})

