import BlissHomePage from './home/blissHomePage'
import AboutUsPage from './home/aboutUsPage'
import ServicesPage from './home/servicesPage'
import WorkPage from './home/workPage'
import CareersPage from './home/carrersPage'
import BlogPage from './home/blogPage'

class BlissHome {
  constructor() {
    // -------------------------------------------------------------------------- Components --------------------------------------------------------------------//
    //Element Bars

    //Main Page

    // --------------------------------------------------------------------------------Pages ----------------------------------------------------------------------//
    this.BlissHomePage = new BlissHomePage()
    this.AboutUsPage = new AboutUsPage()
    this.ServicesPage = new ServicesPage()
    this.WorkPage = new WorkPage()
    this.CareersPage = new CareersPage()
    this.BlogPage = new BlogPage()
  }
}

export default BlissHome