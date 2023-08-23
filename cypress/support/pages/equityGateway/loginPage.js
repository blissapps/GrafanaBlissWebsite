import BasePage from '../basePage'
import AccDetails from './accDetails/accDetails'

const accDetails = new AccDetails()

/**
 * Do not change default values
 */
let actionPerformed = false
let accCheckTimer = false
let customizedUser = false
let accCheck = 'acc1'

const selectors = {
  inputNameField: 'input[placeholder="Username"]',
  inputPasswordField: 'input[placeholder="Password"]',
  loginBtn: 'gs-button[type="default"][size="large"]',
  mismatch: 'gs-notification[type="error"] .message',
  optCodeField: '#Code',
  validateOtpButton: 'button[value="send"]',
  accDetails: '.w-3 > .medium'
}

class LoginPage extends BasePage {
  checkPageUrl() {
    this.checkUrl(Cypress.env('EQUITY_GATEWAY_BASE_URL'))
  }

  errorToast() {
    cy.contains(selectors.mismatch, 'You entered an incorrect username or password.')
  }

  login(user, pw) {
    let userToUse
    let pwToUse

    if (user !== undefined) {
      const defaultUser1 = Cypress.env('EQUITY_GATEWAY_DEFAULT_USER1_AUTH').toString()
      const defaultUser2 = Cypress.env('EQUITY_GATEWAY_DEFAULT_USER2_AUTH').toString()

      if (user !== defaultUser1 && user !== defaultUser2) {
        customizedUser = true
        cy.log('Customized Login Detected: Login is set to use the provided ACC')
        userToUse = user
        if (pw !== undefined) {
          pwToUse = pw
        } else {
          pwToUse = Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH')
        }
      } else {
        throw new Error('Login Problem Occurred: Provided ACC is reserved for exclusive use and cannot be set as a custom ACC')
      }
    } else {
      userToUse = Cypress.env('EQUITY_GATEWAY_DEFAULT_USER1_AUTH')
      pwToUse = Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH')
    }

    cy.log('Defined USER: ' + userToUse)
    cy.log('Defined PW: ' + pwToUse)

    if (actionPerformed === false || customizedUser === true) {
      this._loginWithSession(userToUse, pwToUse)
    } else if (actionPerformed === true) {
      if (accCheckTimer === false && customizedUser === false) {
        accCheckTimer = true
        // @ts-ignore
        setTimeout(() => {
          accCheck = 'acc1'
          accCheckTimer = false
        }, 5 * 60 * 1000) // 5 minutes
      }
      if (accCheck === 'acc2') {
        userToUse = Cypress.env('EQUITY_GATEWAY_DEFAULT_USER2_AUTH')
      }
      this._loginWithSession(userToUse, pwToUse)
    }

    customizedUser = false
    this.lastUser = userToUse
    //Retrieve/Check User Account Data
    if (user === undefined){
      accDetails.accDataCollect(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER1_AUTH').toString())
    } else {
      accDetails.accDataCollect(user)
    }

    return {
      user: this.lastUser
    }
  }

  getLoggedUser() {
    //FIXME PROVISORY ACC NAME ITS NOT SAME AS LOGIN NAME
    let returnName
    if (this.lastUser === Cypress.env('EQUITY_GATEWAY_DEFAULT_USER1_AUTH')) {
      returnName = 'Cassius'
    } else {
      returnName = 'Aryan'
    }

    return returnName
  }

  /**
   * INFO Function _loginWithSession
   * @private
   */
  _loginWithSession(user, pw) {
    let verify = 0

    cy.visit(Cypress.env('EQUITY_GATEWAY_BASE_URL'))

    if (user !== null) {
      cy.get(selectors.inputNameField).clear({ force: true }).type(user)
      verify += 1
    }
    if (pw !== null) {
      cy.get(selectors.inputPasswordField).clear({ force: true }).type(pw)
      verify += 1
    }

    cy.get(selectors.loginBtn).contains('Login').click({ force: true })

    if (verify === 2 && Cypress.env('EQUITY_GATEWAY_LOGIN_AUTH_VERIFICATION') === 'active' && customizedUser === false) {
      //Account Backup Active
      this.count = 0
      this.maxAttempts = 12
      this._checkURL(Cypress.env('EQUITY_GATEWAY_BASE_URL') + '/dashboard')
    } else if (verify === 2) {
      //Account Backup Disable
      cy.location('pathname').should('eq', '/dashboard')
    }
  }

  /**
   * INFO Function _checkURL
   * @private
   *
   * Carefully working on this function, it includes some conditions and recursion,
   * you can end up into an ** INFINITE LOOP **
   */
  _checkURL(targetURL) {
    cy.url().then((url) => {
      if (url.includes(targetURL)) {
        //check url if it matches
        cy.location('pathname').should('eq', '/dashboard')
        cy.log(`URL includes: "${targetURL}"`)
      } else {
        // @ts-ignore
        if (this.count < this.maxAttempts) {
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(450)
          // @ts-ignore
          this.count++
          this._checkURL(targetURL) // Recursive call to checkURL() function
        } else {
          // Perform actions or assertions for failure case here
          if (accCheck === 'acc1') {
            actionPerformed = true
            accCheck = 'acc2'
            cy.log('Login Problem Occurred: logging in with backup ACC2: ' + Cypress.env('EQUITY_GATEWAY_DEFAULT_USER2_AUTH'))
            this.login(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER2_AUTH'), Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
          } else if (accCheck === 'acc2') {
            throw new Error('Login Problem Occurred: Unable to Login with any configured Account')
          }
        }
      }
    })
  }

  /**
   * TO BE DEPRECATED
   */
  getAccInfo() {
    return cy.fixture('gateway/salesWizard/summaryFlow').then((jsonObject) => {
      const {
        security: { securityName: sName, securityPosition: sPosition, stockName: sStockName },
        shareGroup: { shareName: sShareName },
        amountShares2sell: { shares2sell: s2sell, totalShares: sTotalShares, availableShares: sAvailableShares, availableWithRestrictionsShares: sAvailableWihRestrictions },
        orderType: { orderName: oName }
      } = jsonObject

      return {
        securityName: sName,
        securityPosition: sPosition,
        shareName: sShareName,
        stockName: sStockName,
        shares2sell: s2sell,
        totalShares: sTotalShares,
        availableShares: sAvailableShares,
        availableWihRestrictions: sAvailableWihRestrictions,
        orderName: oName
      }
    })
  }
}

export default LoginPage