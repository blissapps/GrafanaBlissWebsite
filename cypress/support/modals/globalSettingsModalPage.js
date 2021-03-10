import Common from '../pages/common'

const selectors = {
  headerTitle: '.header > h2'
}

const properties = {
  userManagementUrl: '/settings/user-management',
  groupManagementUrl: '/settings/group-management',
  roleManagementUrl: '/settings/role-management',
  dapManagementUrl: '/settings/dap-management',
}

class GlobalSettingsModalPage extends Common{

  /**
   * Check the settings url
   * 
   */
  checkSettingsUrl(){
    this.checkUrl(properties.groupManagementUrl)
  }

  /**
   * Check the modal title to assert the correct page
   * 
   * @returns The element if it exists
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
