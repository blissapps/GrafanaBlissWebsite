import Common from "./common";

const properties = {
  pageURL: "/compliance",
};

class PeopleCompliancePage extends Common {
  /**
   * Checks if the current page is the Compliance URL, which is accessed through Equity People page
   */
  checkPeopleComplianceURL() {
    this.checkUrl(properties.pageURL);
  }
}

export default PeopleCompliancePage;
