//TODO
// ------------------------------------------------------------- Components -------------------------------------------------------//
//TODO
// ----------------------------------------------------------------Pages -----------------------------------------------------------//
//Others
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
        this.LoginPage = new LoginPage()
    }
}

export default EquityGateway
