import Common from "./common";

const properties = {
  pageURL: "/tax-and-commission",
};

class PeopleTaxAndCommissionPage extends Common {
  /**
   * Checks if the current page is the Tax & Commission URL, which is accessed through Equity People page
   */
  checkPeopleTaxAndCommissionURL() {
    this.checkUrl(properties.pageURL);
  }
}

export default PeopleTaxAndCommissionPage;
