// @ts-ignore
//TODO
// ------------------------------------------------------------- Components -------------------------------------------------------//

//TODO
// ----------------------------------------------------------------Pages -----------------------------------------------------------//

//Dashboard
import Dashboard from './equityGateway/dashboard/dashboard'
import Portfolio from './equityGateway/dashboard/portfolio'
import SharesHeader from './equityGateway/dashboard/sharesHeader'
import Activity from './equityGateway/dashboard/activity'

//Help Form
import HelpForm from './equityGateway/helpForm/helpForm'

//Side Menu
import SideMenuBar from './equityGateway/sideMenuBar/sideMenuBar'

//Top Bar
import TopBar from './equityGateway/topBar/topBar'

//Application Pages Navigation
import PageNavi from './equityGateway/pageNavi/pageNavi'

// Others
import LoginPage from './equityGateway/loginPage'

/**
 * This is the main class the encapsulates all pages regarding the Equity Gateway portal (Except base pages since they are not meant to be directly called).
 *
 * Because of this class, you don't need to import and create objects to all the pages, so you can just call this EquityAdmin class instead.
 *
 * All new pages regarding Equity Gateway need to be added in here
 */
class EquityGateway {
    constructor() {
        //TODO
        // -------------------------------------------------------------------------- Components --------------------------------------------------------------------//

        //TODO
        // --------------------------------------------------------------------------------Pages ----------------------------------------------------------------------//
        //Dashboard
        this.SharesHeader = new SharesHeader()
        this.Dashboard = new Dashboard()
        this.Activity = new Activity()
        this.Portfolio = new Portfolio()

        //Help Form
        this.HelpForm = new HelpForm()

        //Side Menu
        this.SideMenuBar = new SideMenuBar()

        //TopBar
        this.TopBar = new TopBar()

        //Application Pages Navigation
        this.PageNavi = new PageNavi()

        //Others
        this.LoginPage = new LoginPage()
    }
}

export default EquityGateway
