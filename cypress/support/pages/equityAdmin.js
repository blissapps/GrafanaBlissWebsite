// ---------------------- Components --------------------------//
import ClientSwitchMenu from '../components/equityAdmin/clientSwitchMenu'
import ApplicationLeftMenuBar from '../components/equityAdmin/applicationLeftMenuBar'
import ProfileMenuNavBar from '../components/equityAdmin/profileMenuNavBar'
import SearchEngine from '../components/equityAdmin/searchEngine'
import SettingsMenuNavBar from '../components/equityAdmin/settingsMenuNavBar'

// --------------------------Pages ----------------------------//
// Statement Management
import ClientParticipantStatementsPage from './equityAdmin/globalSettingsPages/statementManagementPages/clientParticipantStatementsPage'
import ClientStatementsPage from './equityAdmin/globalSettingsPages/statementManagementPages/clientStatementsPage'
import ParticipantRegulatoryLinkagePage from './equityAdmin/globalSettingsPages/statementManagementPages/participantRegulatoryLinkagePage'

// User Management
import DapManagementPage from './equityAdmin/globalSettingsPages/userManagementPages/dapManagementPage'
import GroupManagementPage from './equityAdmin/globalSettingsPages/userManagementPages/groupManagementPage'
import RoleManagementPage from './equityAdmin/globalSettingsPages/userManagementPages/roleManagementPage'
import UserManagementPage from './equityAdmin/globalSettingsPages/userManagementPages/userManagementPage'

// Profile
import PersonalInformationPage from './equityAdmin/profilePages/personalInformationPage'
import PreferencesPage from './equityAdmin/profilePages/preferencesPage'
import SecurityPage from './equityAdmin/profilePages/securityPage'

// People Participants
import ClientPeoplePage from './equityAdmin/clientPeoplePages/clientPeoplePage'
import PersonalProfileOverviewPage from './equityAdmin/clientPeoplePages/peopleParticipantPages/personalProfilePages/personalProfileOverviewPage'
import PersonalProfileAddressAndContactPage from './equityAdmin/clientPeoplePages/peopleParticipantPages/personalProfilePages/personalProfileAddressAndContactPage'
import CompanyProfileOverviewPage from './equityAdmin/clientPeoplePages/peopleParticipantPages/companyProfilePages/companyProfileOverviewPage'
import PrimarySettingsSalesPage from './equityAdmin/clientPeoplePages/peopleParticipantPages/primarySettingsPages/primarySettingsSalesPage'
import SaleAndDividendPage from './equityAdmin/clientPeoplePages/peopleParticipantPages/saleAndDividendPage'
import TaxAndCommissionPage from './equityAdmin/clientPeoplePages/peopleParticipantPages/taxAndCommissionPage'

// Others
import LoginPage from './equityAdmin/loginPage'
import HomePage from './equityAdmin/homePage'
import UnauthorizedPage from './equityAdmin/unauthorizedPage'

/**
 * This is the main class the encapsulates all pages regarding the Equity Admin portal (Except base pages since they are not meant to be directly called).
 *
 * Because of this class, you don't need to import and create objects to all the pages, so you can just call this EquityAdmin class instead.
 *
 * All new pages regarding Equity Admin need to be added in here
 */
class EquityAdmin {
  constructor() {
    // ---------------------- Components --------------------------//
    this.clientSwitchMenu = new ClientSwitchMenu()
    this.applicationLeftMenuBar = new ApplicationLeftMenuBar()
    this.profileMenuNavBar = new ProfileMenuNavBar()
    this.searchEngine = new SearchEngine()
    this.settingsMenuNavBar = new SettingsMenuNavBar()

    // --------------------------Pages ----------------------------//
    // Statement Management
    this.clientParticipantStatementsPage = new ClientParticipantStatementsPage()
    this.clientStatementsPage = new ClientStatementsPage()
    this.participantRegulatoryLinkagePage = new ParticipantRegulatoryLinkagePage()

    // User Management
    this.dapManagementPage = new DapManagementPage()
    this.groupManagementPage = new GroupManagementPage()
    this.roleManagementPage = new RoleManagementPage()
    this.userManagementPage = new UserManagementPage()

    // Profile
    this.personalInformationPage = new PersonalInformationPage()
    this.preferencesPage = new PreferencesPage()
    this.securityPage = new SecurityPage()

    // People
    this.personalProfileOverviewPage = new PersonalProfileOverviewPage()
    this.personalProfileAddressAndContactPage = new PersonalProfileAddressAndContactPage()
    this.companyProfileOverviewPage = new CompanyProfileOverviewPage()
    this.primarySettingsSalesPage = new PrimarySettingsSalesPage()
    this.saleAndDividendPage = new SaleAndDividendPage()
    this.taxAndCommissionPage = new TaxAndCommissionPage()

    // Others
    this.loginPage = new LoginPage()
    this.clientPeoplePage = new ClientPeoplePage()
    this.homePage = new HomePage()
    this.unauthorizedPage = new UnauthorizedPage()
  }
}

export default EquityAdmin
