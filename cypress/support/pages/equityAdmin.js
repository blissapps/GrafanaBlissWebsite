// ---------------------- Components --------------------------//
import ClientSwitchMenu from '../components/equityAdmin/clientSwitchMenu'
import LeftMenuNavBar from '../components/equityAdmin/leftMenuNavBar'
import ProfileMenuNavBar from '../components/equityAdmin/profileMenuNavBar'
import SearchBar from '../components/equityAdmin/searchBar'
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

// Others
import AuthLoginPage from './authLoginPage'
import EquityClientPeoplePage from './equityClientPeoplePage'
import HomePage from './homePage'

/**
 * This is the main class the encapsulates all pages regarding the Equity Admin portal.
 *
 * Because of this class, you don't need to import and create objects to all the pages, so you can just call this EquityAdmin class instead.
 *
 * All new pages regarding Equity Admin need to be added in here
 */
class EquityAdmin {
  constructor() {
    // ---------------------- Components --------------------------//
    this.clientSwitchMenu = new ClientSwitchMenu()
    this.leftMenuNavBar = new LeftMenuNavBar()
    this.profileMenuNavBar = new ProfileMenuNavBar()
    this.searchBar = new SearchBar()
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

    // Others
    this.authLoginPage = new AuthLoginPage()
    this.equityClientPeoplePage = new EquityClientPeoplePage()
    this.homePage = new HomePage()
  }
}

export default EquityAdmin
