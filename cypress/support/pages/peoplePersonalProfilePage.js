import BasePage from "./basePage";

const properties = {
  pageURL: "/personal-profile",
};

class PeoplePersonalProfilePage extends BasePage {
  /**
   * Checks if the current page is the Personal Profile URL, which is accessed through Equity People page
   */
  checkPeoplePersonalProfileURL() {
    this.checkUrl(properties.pageURL);
  }
}

export default PeoplePersonalProfilePage;
