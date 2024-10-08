import BlissHomePage from './home/blissHomePage'
import ContactPage from './contact/contactPage'

class BlissHome {
  constructor() {
    // -------------------------------------------------------------------------- Components --------------------------------------------------------------------//
    //Element Bars

    //Main Page

    // --------------------------------------------------------------------------------Pages ----------------------------------------------------------------------//
    this.BlissHomePage = new BlissHomePage()
    this.ContactPage = new ContactPage()
  }
}

export default BlissHome