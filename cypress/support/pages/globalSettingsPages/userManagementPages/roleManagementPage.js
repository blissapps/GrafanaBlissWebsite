import BaseManagementPage from './baseManagementPage'
import Utils from '../../../utils'

const properties = {
  pageURL: '/settings/role-management'
}

const selectors = {
  activeRolesList: 'gs-tab[data-test-id=activeTab] #roleList gs-list',
  inactiveRolesList: 'gs-tab[data-test-id=inactiveTab] #roleList gs-list',
  rolesDisplayed: '#roleList gs-list a[id*="role_',
  newRoleBtn: 'gs-button[data-test-id=create-role]',
  roleId: '#role_'
}

const apiInterceptions = {
  pageLoadedRequest: 'https://api.stonly.com/api/v2/widget/integration?*'
}

const utils = new Utils()

class RoleManagementPage extends BaseManagementPage {
  /**
   * Checks if the current pageLoad is Role management URL
   */
  checkRoleManagementUrl() {
    this.checkUrl(properties.pageURL)
  }

  // ----------------------------------------------- GETS --------------------------------------------- //

  /**
   * Get a role by sending the role ID.
   *
   * @param {Number} roleId role id number.
   *
   * @returns The role element
   */
  getRoleById(roleId) {
    return cy.get(selectors.roleId + roleId)
  }

  // ----------------------------------------------- CLICKS --------------------------------------------- //

  /**
   * Click in the new role button and change the current default role name
   *
   * @param {String} roleName Name given to replace the default 'New Role' name that comes by default
   */
  clickToCreateRoleWithNewName(roleName) {
    cy.get(selectors.newRoleBtn).click()
    this.modifyEntityName(roleName, 'New Role')
  }

  /**
   * Click in a role by sending the role ID.
   *
   * @param {Number} roleId Role id number.
   */
  clickRole(roleId) {
    this.getRoleById(roleId).click()
  }

  // --------------------------------------- ASSERTIONS --------------------------------------------- //

  /**
   * Assert a list of roles is displayed under the correlated Active tab.
   */
  assertActiveRolesAreDisplayed() {
    cy.get(selectors.activeRolesList).should('be.visible')
  }

  /**
   * Assert a list of roles is displayed under the correlated Inactive tab.
   */
  assertInactiveRolesAreDisplayed() {
    cy.get(selectors.inactiveRolesList).should('be.visible')
  }

  assertRolesInAlphabeticalOrder() {
    this.assertElementsInAlphabeticalOrder(selectors.rolesDisplayed)
  }

  // ----------------------------------------------- PERMISSIONS --------------------------------------------- //

  /**
   * Insert or remove permissions of a selected role
   *
   * @param {String} permissionName Permission name of a role
   * @param {Array} permissionsKind Array containing the permissions, for this permission are allowed ['view', 'update', 'create', 'delete']
   * @param {Boolean} insertPermission True to insert permission, false to remove
   *
   * @example:
   * insertOrRemoveAccessFiltersPermissions('accessfilters', ['delete']) -> It inserts the permission delete in the access filter permission
   * insertOrRemoveAccessFiltersPermissions('settings', ['update'], false) -> It removes the permission update in the settings permission
   */
  insertOrRemoveAccessFiltersPermissions(permissionName, permissionsKind, insertPermission = true) {
    // Manipulate permissionName and permissionsKind, so we do not need to be worried about capitalization nor blank spaces
    permissionName = permissionName.replaceAll(' ', '').toLowerCase()
    permissionsKind = permissionsKind.map(permission => permission.replaceAll(' ', '').toLowerCase())

    // Verify array integrity
    if (utils.arrayHasDuplicates(permissionsKind) || permissionsKind.length > 4) {
      throw new Error('A permission type must be unique and the max amount of permissions is 4.')
    }

    // Choose permission name
    cy.log('PERMISSION CHOSEN WAS: ' + permissionName)
    switch (permissionName) {
      case 'accessfilters':
        cy.get('tr[name=permission_accessfilters] td').as('permission')
        break

      case 'api':
        cy.get('tr[name=permission_api]').as('permission')
        break

      case 'bi':
        cy.get('tr[name=permission_bi]').as('permission')
        break

      case 'categories':
        cy.get('tr[name=permission_categories]').as('permission')
        break

      case 'clients':
        cy.get('tr[name=permission_clients]').as('permission')
        break

      case 'clients_modules':
        cy.get('tr[name=permission_clients_modules]').as('permission')
        break

      case 'companysecurity':
        cy.get('tr[name=permission_companysecurity]').as('permission')
        break

      case 'companysecuritycurrentvalue':
        cy.get('tr[name=permission_companysecuritycurrentvalue]').as('permission')
        break

      case 'contents':
        cy.get('tr[name=permission_contents]').as('permission')
        break

      case 'contributions':
        cy.get('tr[name=permission_contributions]').as('permission')
        break

      case 'emails':
        cy.get('tr[name=permission_emails]').as('permission')
        break

      case 'grants':
        cy.get('tr[name=permission_grants]').as('permission')
        break

      case 'groups':
        cy.get('tr[name=permission_groups]').as('permission')
        break

      case 'mobile':
        cy.get('tr[name=permission_mobile]').as('permission')
        break

      case 'participants':
        cy.get('tr[name=permission_participants]').as('permission')
        break

      case 'participants_account':
        cy.get('tr[name=permission_participants_account]').as('permission')
        break

      case 'participants_bankaccounts':
        cy.get('tr[name=permission_participants_bankaccounts]').as('permission')
        break

      case 'participants_compliance':
        cy.get('tr[name=permission_participants_compliance]').as('permission')
        break

      case 'participants_dividends':
        cy.get('tr[name=permission_participants_dividends]').as('permission')
        break

      case 'participants_events':
        cy.get('tr[name=permission_participants_events]').as('permission')
        break

      case 'participants_financialreporting':
        cy.get('tr[name=permission_participants_financialreporting]').as('permission')
        break

      case 'participants_gateway':
        cy.get('tr[name=permission_participants_gateway]').as('permission')
        break

      case 'participants_linkage':
        cy.get('tr[name=permission_participants_linkage]').as('permission')
        break

      case 'participants_onbehalf':
        cy.get('tr[name=permission_participants_onbehalf]').as('permission')
        break

      case 'participants_partners':
        cy.get('tr[name=permission_participants_partners]').as('permission')
        break

      case 'participants_restrictions':
        cy.get('tr[name=permission_participants_restrictions]').as('permission')
        break

      case 'participants_sharemanagement':
        cy.get('tr[name=permission_participants_sharemanagement]').as('permission')
        break

      case 'participants_sharetransactions':
        cy.get('tr[name=permission_participants_sharetransactions]').as('permission')
        break

      case 'participants_tax':
        cy.get('tr[name=permission_participants_tax]').as('permission')
        break

      case 'participants_trading':
        cy.get('tr[name=permission_participants_trading]').as('permission')
        break

      case 'partner_account':
        cy.get('tr[name=permission_partner_account]').as('permission')
        break

      case 'partner_custodyaccountmovement':
        cy.get('tr[name=permission_partner_custodyaccountmovement]').as('permission')
        break

      case 'partners':
        cy.get('tr[name=permission_partners]').as('permission')
        break

      case 'payrollschedules':
        cy.get('tr[name=permission_payrollschedules]').as('permission')
        break

      case 'plans':
        cy.get('tr[name=permission_plans]').as('permission')
        break

      case 'purchaseplans':
        cy.get('tr[name=permission_purchaseplans]').as('permission')
        break

      case 'roles':
        cy.get('tr[name=permission_roles]').as('permission')
        break

      case 'settings':
        cy.get('tr[name=permission_settings]').as('permission')
        break

      case 'shareissuances':
        cy.get('tr[name=permission_shareissuances]').as('permission')
        break

      case 'sms':
        cy.get('tr[name=permission_sms]').as('permission')
        break

      case 'tags':
        cy.get('tr[name=permission_tags]').as('permission')
        break

      case 'tenants':
        cy.get('tr[name=permission_tenants]').as('permission')
        break

      case 'terminationrequests':
        cy.get('tr[name=permission_terminationrequests]').as('permission')
        break

      case 'terminationtypes':
        cy.get('tr[name=permission_terminationtypes]').as('permission')
        break

      case 'termsandconditions':
        cy.get('tr[name=permission_termsandconditions]').as('permission')
        break

      case 'transactions':
        cy.get('tr[name=permission_transactions]').as('permission')
        break

      case 'transactionwindows':
        cy.get('tr[name=permission_transactionwindows]').as('permission')
        break

      case 'users':
        cy.get('tr[name=permission_api]').as('permission')
        break

      case 'vestingschedules':
        cy.get('tr[name=permission_vestingschedules]').as('permission')
        break

      default:
        throw new Error('Please, provide a valid permission name!')
    }

    // Variable to control if we are gonna insert or remove the permission
    let verifyActiveState = ''
    insertPermission ? (verifyActiveState = ':not([class*= active])') : (verifyActiveState = '[class*= active]')

    // Insert or remove the permissions
    for (let i = 0; i < permissionsKind.length; i++) {
      switch (permissionsKind[i]) {
        case 'view':
          cy.get('@permission')
            .find('gs-checkbox[name = view]' + verifyActiveState)
            .scrollIntoView()
            .click()
          break

        case 'update':
          cy.get('@permission')
            .find('gs-checkbox[name = update]' + verifyActiveState)
            .scrollIntoView()
            .click()
          break

        case 'create':
          cy.get('@permission')
            .find('gs-checkbox[name = create]' + verifyActiveState)
            .scrollIntoView()
            .click()
          break

        case 'delete':
          cy.get('@permission')
            .find('gs-checkbox[name = delete]' + verifyActiveState)
            .scrollIntoView()
            .click()
          break

        default:
          throw new Error('Please, provide a valid permission for this one!')
      }
    }
  }

  // ---------------------------------------  INTERCEPTIONS --------------------------------------------- //
  /**
   * Waits until the page is loaded. This is a specific behavior of this page
   */
  waitUntilPageIsLoaded() {
    cy.intercept('GET', apiInterceptions.pageLoadedRequest).as('pageLoaded')
    cy.wait('@pageLoaded', { requestTimeout: 10000 })
  }
}

export default RoleManagementPage
