import BlissHome from '../support/pages/blissHome'

const blissHome = new BlissHome()

describe('Bliss Home Page Tests', () => {
  beforeEach(() => {
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
      blissHome.AboutUsPage.validateBtnJoinUs()
    })
  })

  context('Navigation Bar Validation', () => {
  })
})