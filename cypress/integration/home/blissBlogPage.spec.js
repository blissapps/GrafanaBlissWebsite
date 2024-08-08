import BlissHome from '../../support/pages/blissHome'

const blissHome = new BlissHome()

describe('Bliss Blog Page Tests', () => {
  beforeEach(() => {
    blissHome.BlissHomePage.goToHome()
  })

  context('General Blog Page Validations', () => {
    it('Check General Elements Page', () => {
      blissHome.BlissHomePage.checkTestObject(9)
    })

    it('Check Images Banner', () => {
      blissHome.BlissHomePage.checkTestObject(5)
    })

    it('Check Buttons', () => {
      blissHome.BlissHomePage.checkTestObject(0)
    })

    it('Check Buttons Sector 2', () => {
      blissHome.BlissHomePage.checkTestObject(0)
    })

    it('Check Profile Description General Containers', () => {
      blissHome.BlissHomePage.checkTestObject(0)
    })

    it('Check Profile Description Phone Containers', () => {
      blissHome.BlissHomePage.checkTestObject(9)
    })
  })
})

describe('Bliss Blog Page Tests ACC2', () => {
  beforeEach(() => {
    blissHome.BlissHomePage.goToHome()
  })

  context('General Blog Page Validations', () => {
    it('Check General Elements Page', () => {
      blissHome.BlissHomePage.checkTestObject(5)
    })

    it('Check Profile Description General Containers', () => {
      blissHome.BlissHomePage.checkTestObject(0)
    })

    it('Check Images Banner', () => {
      blissHome.BlissHomePage.checkTestObject(5)
    })
  })
})