// @ts-ignore
// ------------------------------------------------------------- Components -------------------------------------------------------//

// ----------------------------------------------------------------Pages -----------------------------------------------------------//
//DashboardPage
import DashboardPage from './equityGateway/dashboard/dashboardPage'
import Portfolio from './equityGateway/dashboard/portfolio'
import SharesHeader from './equityGateway/dashboard/sharesHeader'
import ActivityPage from './equityGateway/dashboard/activityPage'

//Help Form
import HelpFormPage from './equityGateway/helpForm/helpFormPage'

//My Account
import AccSideMenu from './equityGateway/myAccount/accBase'
import AccPreferencesSector from './equityGateway/myAccount/accPreferencesSector';
import AccProfilePage from './equityGateway/myAccount/accProfilePage'
import AccTaxPage from './equityGateway/myAccount/accTaxPage'

//Side Menu
import SideMenuBar from './equityGateway/sideMenuBar/sideMenuBar'

//Top Bar
import TopBar from './equityGateway/topBar/topBar'

//Application Pages Navigation
import PageNavi from './equityGateway/pageNavi/pageNavi'

// Others
import LoginPage from './equityGateway/loginPage'
import LogoutPage from './equityGateway/logoutPage';

/**
 * This is the main class the encapsulates all pages regarding the Equity Gateway portal (Except base pages since they are not meant to be directly called).
 *
 * Because of this class, you don't need to import and create objects to all the pages, so you can just call this EquityAdmin class instead.
 *
 * All new pages regarding Equity Gateway need to be added in here
 */
class EquityGateway {
    constructor() {
        // -------------------------------------------------------------------------- Components --------------------------------------------------------------------//

        // --------------------------------------------------------------------------------Pages ----------------------------------------------------------------------//
        //DashboardPage
        this.SharesHeader = new SharesHeader()
        this.DashboardPage = new DashboardPage()
        this.ActivityPage = new ActivityPage()
        this.Portfolio = new Portfolio()

        //Help Form
        this.HelpForm = new HelpFormPage()

        //My Account
        this.AccSideMenu = new AccSideMenu()
        this.AccPreferencesSector = new AccPreferencesSector()
        this.AccProfilePage = new AccProfilePage()
        this.AccTaxPage = new AccTaxPage()

        //Side Menu
        this.SideMenuBar = new SideMenuBar()

        //TopBar
        this.TopBar = new TopBar()

        //Application Pages Navigation
        this.PageNavi = new PageNavi()

        //Others
        this.LoginPage = new LoginPage()
        this.LogoutPage = new LogoutPage()
    }
}

export default EquityGateway