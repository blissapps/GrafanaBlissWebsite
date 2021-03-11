import Common from '../pages/common'

const selectors = {
  headerTitle: '.header > h2',
  userHeaderTitle: '.title'
}

const properties = {
  userManagementUrl: '/settings/user-management',
  groupManagementUrl: '/settings/group-management',
  roleManagementUrl: '/settings/role-management',
  dapManagementUrl: '/settings/dap-management',
}

/**
 * This class refers to the "modals" that appears in Global Settings when the user access it over the left menu bar.
 */
class GlobalSettingsModalPage extends Common{

  /**
   * Check the group management url
   * 
   */
  checkGroupManagementsUrl(){
    this.checkUrl(properties.groupManagementUrl)
  }

  /**
   * Return the header title, so it can be asserted in the test
   * 
   * @returns The actual header title if it exists. Examples: Group, Users, 
   */
   checkModalHeaderTitle(){
    return cy.get(selectors.headerTitle)
  }

  /**
   * Selects a tab
   * 
   * @param {String} tabName Name of the tab you want to go in
   */
  selectTab(tabName){
    cy.xpath(`//div[@class='tabs-bar']//span[text()='${tabName}']`).click()
  }
      
}
  
export default GlobalSettingsModalPage;
