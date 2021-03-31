import BasePage from '../basePage'
import SearchBar from '../../components/searchBar'

const properties = {
  pageURL: '/settings/user-management'
}

const searchBar = new SearchBar()

class UserManagement extends BasePage {
  /**
   * Checks if the current page is User settings URL
   */
  checkUserManagementUrl() {
    this.checkUrl(properties.pageURL)
  }

  /**
   * Select a user from the table of users
   *
   * @param {string} username username text for the user to be searched
   */
  selectAnUser(username) {
    searchBar.search(username)
    cy.xpath(`//div[@class='data']//*[text()=${username}]`).click()
  }
}

export default UserManagement
