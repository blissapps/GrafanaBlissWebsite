import BasePage from '../basePage'
import HomePage from '../equityAdmin/homePage'

const homePage = new HomePage()

const selectors = {
    //TODO
}

class Helpdesk extends BasePage {
    checkPageUrl() {
        this.checkUrl(Cypress.env('EQUITY_GATEWAY_BASE_URL')+'/help')
    }

    //TODO
}
export default Helpdesk