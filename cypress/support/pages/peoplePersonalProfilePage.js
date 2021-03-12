import Common from "./common";

const properties = {
  pageURL: "/personal-profile",
};

class PeoplePersonalProfilePage extends Common {
  /**
   * Checks if the current page is the Personal Profile URL, which is accessed through Equity People page
   */
  checkPeoplePersonalProfileURL() {
    this.checkUrl(properties.pageURL);
  }
}

export default PeoplePersonalProfilePage;
