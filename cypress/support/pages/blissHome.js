import BlissHomePage from './home/blissHomePage'
import AboutUsPage from './home/aboutUsPage'
import ServicesPage from './home/servicesPage'
import WorkPage from './home/workPage'
import CareersPage from './home/carrersPage'
import BlogPage from './home/blogPage'
import ContactPage from './home/contactPage'
import TopMenu from './elementBars/topMenu'

class BlissHome {
  constructor() {
    // -------------------------------------------------------------------------- Components --------------------------------------------------------------------//
    //Element Bars
    this.TopMenu = new TopMenu()

    // --------------------------------------------------------------------------------Pages ----------------------------------------------------------------------//
    this.BlissHomePage = new BlissHomePage()
    this.AboutUsPage = new AboutUsPage()
    this.ServicesPage = new ServicesPage()
    this.WorkPage = new WorkPage()
    this.CareersPage = new CareersPage()
    this.BlogPage = new BlogPage()
    this.ContactPage = new ContactPage()
  }
}

BlissHome.BlissHomePage = undefined

export default BlissHome