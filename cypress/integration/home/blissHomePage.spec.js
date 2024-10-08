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

    it('Check Home Menu', () => {
      blissHome.BlissHomePage.checkPage()
    })

    it('Check HomePage Buttons', () => {
      blissHome.BlissHomePage.checkButtons()
    })

    it('Check Email Contact', () => {
      blissHome.BlissHomePage.checkForm()
    })

    it('Check Email Contact2', () => {
      blissHome.BlissHomePage.checkForm()
    })
  })

  context('Check Menu Navigation', () => {
    it('Check AboutUs Page', () => {
      blissHome.BlissHomePage.checkPage('aboutUs')
    })

    it('Check Work Page', () => {
      blissHome.BlissHomePage.checkPage('work')
    })

    it('Check Careers Page', () => {
      blissHome.BlissHomePage.checkPage('careers')
    })

    it('Check Contact Page', () => {
      blissHome.BlissHomePage.checkPage('contact')
    })

    it('Check Blog Page', () => {
      blissHome.BlissHomePage.checkPage('blog')
    })
  })
})

