// ------------------------------------------------------------- Components -------------------------------------------------------//
//Elements Bars
import FooterBar from './equityGateway/elementBars/footerBar'
    //Main Page
    import TopBar from './equityGateway/elementBars/mainPage/topBar'
    import MainPageSideMenu from './equityGateway/elementBars/mainPage/mainPageSideMenu'
    //My Account
    import MyAccSideMenu from './equityGateway/elementBars/myAcc/myAccSideMenu'
    import PersonInfoRMenu from './equityGateway/elementBars/myAcc/profileSection/personInfoRMenu'
    //Sales Wizard
    import SalesWizTopBar from './equityGateway/elementBars/salesWizard/salesWizTopBar'
    import SalesWizSideLmenu from './equityGateway/elementBars/salesWizard/salesWizSideLmenu'
    import SalesWizSideRmenu from './equityGateway/elementBars/salesWizard/salesWizSideRmenu'

// ----------------------------------------------------------------Pages -----------------------------------------------------------//
//DashboardPage
import DashboardPage from './equityGateway/dashboard/dashboardPage'
import Portfolio from './equityGateway/dashboard/portfolio'
import SharesHeader from './equityGateway/dashboard/sharesHeader'
import ActivityPage from './equityGateway/dashboard/activityPage'

//Help Form
import HelpFormPage from './equityGateway/helpForm/helpFormPage'

//My Account
import AccBase from './equityGateway/myAccount/accBase'
import AccPreferencesSector from './equityGateway/myAccount/accPreferencesSector';
import AccProfilePage from './equityGateway/myAccount/accProfilePage'
import AccTaxPage from './equityGateway/myAccount/accTaxPage'

//Application Pages Navigation
import PageNavi from './equityGateway/pageNavi/pageNavi'

//Sales Wizard
import SalesWizBase from './equityGateway/salesWizard/salesWizBase'
import SalesWizOverviewPage from './equityGateway/salesWizard/salesWizOverviewPage'
import SalesWizSecurityPage from './equityGateway/salesWizard/salesWizSecurityPage'
import SalesWizShareGroupPage from './equityGateway/salesWizard/salesWizShareGroupPage'
import SalesWizAmount2SellPage from './equityGateway/salesWizard/salesWizAmount2SellPage'
import SalesWizOrderTypePage from './equityGateway/salesWizard/salesWizOrderTypePage'
import SalesWizDistributionPage from './equityGateway/salesWizard/salesWizDistributionPage'
import SalesWizReviewOrderPage from './equityGateway/salesWizard/salesWizReviewOrderPage'

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
        //Element Bars
        this.FooterBar = new FooterBar()
            //Main Page
            this.TopBar = new TopBar()
            this.MainPageSideMenu = new MainPageSideMenu()
            //My Account
            this.MyAccSideMenu = new MyAccSideMenu()
            this.PersonInfoRMenu = new PersonInfoRMenu()
            //Sales Wizard
            this.SalesWizTopBar = new SalesWizTopBar()
            this.SalesWizSideLmenu = new SalesWizSideLmenu()
            this.SalesWizSideRmenu = new SalesWizSideRmenu()

        // --------------------------------------------------------------------------------Pages ----------------------------------------------------------------------//
        //DashboardPage
        this.SharesHeader = new SharesHeader()
        this.DashboardPage = new DashboardPage()
        this.ActivityPage = new ActivityPage()
        this.Portfolio = new Portfolio()

        //Help Form
        this.HelpForm = new HelpFormPage()

        //My Account
        this.AccBase = new AccBase()
        this.AccPreferencesSector = new AccPreferencesSector()
        this.AccProfilePage = new AccProfilePage()
        this.AccTaxPage = new AccTaxPage()

        //Application Pages Navigation
        this.PageNavi = new PageNavi()

        //Sales Wizard
        this.SalesWizBase = new SalesWizBase()
        this.SalesWizOverviewPage = new SalesWizOverviewPage()
        this.SalesWizSecurityPage = new SalesWizSecurityPage()
        this.SalesWizShareGroupPage = new SalesWizShareGroupPage()
        this.SalesWizAmount2SellPage = new SalesWizAmount2SellPage()
        this.SalesWizOrderTypePage = new SalesWizOrderTypePage()
        this.SalesWizDistributionPage = new SalesWizDistributionPage()
        this.SalesWizReviewOrderPage = new SalesWizReviewOrderPage()

        //Others
        this.LoginPage = new LoginPage()
        this.LogoutPage = new LogoutPage()
    }
}

export default EquityGateway