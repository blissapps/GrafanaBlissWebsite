import BasePage from '../basePage'

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

  errorToast(){
    cy.contains(selectors.mismatch, 'You entered an incorrect username or password.')
  }

  login(user, pw) {
    let userToUse
    let pwToUse

    cy.visit(Cypress.env('EQUITY_GATEWAY_BASE_URL'))

    if (user === undefined || pw === undefined || user === null || pw === null) {
      userToUse = Cypress.env('EQUITY_GATEWAY_DEFAULT_USER1_AUTH')
      pwToUse = Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH')
    } else {
      if (user !== Cypress.env('EQUITY_GATEWAY_DEFAULT_USER1_AUTH').toString() && user !== Cypress.env('EQUITY_GATEWAY_DEFAULT_USER2_AUTH').toString()){
        customizedUser = true
        cy.log('Customized Login Detected: Login are set to use the provided ACC')
      }
      userToUse = user
      pwToUse = pw
    }

    if (actionPerformed === false || customizedUser === true) {
      this._loginWithSession(userToUse, pwToUse)
    } else if (actionPerformed === true) {
      if (accCheckTimer === false && customizedUser === false) {
        accCheckTimer = true
        // @ts-ignore
        setTimeout(() => {
          accCheck = 'acc1'
          accCheckTimer = false
        }, 5 * 60 * 1000); // 5 minutes
      }
      if (accCheck === 'acc2') {
        userToUse = Cypress.env('EQUITY_GATEWAY_DEFAULT_USER2_AUTH')
      }
      this._loginWithSession(userToUse, pwToUse)
    }

    customizedUser = false
    this.lastUser = userToUse

  return {
      user: this.lastUser
    }
  }

  getLastUser() {
    //FIXME PROVISORY ACC NAME ITS NOT SAME AS LOGIN NAME
    let returnName
    if (this.lastUser === Cypress.env('EQUITY_GATEWAY_DEFAULT_USER1_AUTH')){
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

      if (user !== '') {
        cy.get(selectors.inputNameField).clear({ force: true }).type(user)
        verify += 1
      }
      if (pw !== '') {
        cy.get(selectors.inputPasswordField).clear({ force: true }).type(pw)
        verify += 1
      }

      cy.get(selectors.loginBtn).contains('Login').click({ force: true })

      if (verify === 2 && Cypress.env('EQUITY_GATEWAY_LOGIN_AUTH_VERIFICATION') === 'active' && customizedUser === false) {
        this.count = 0
        this.maxAttempts = 10
        this._checkURL(Cypress.env('EQUITY_GATEWAY_BASE_URL')+'/dashboard')
      }
  }

  /**
   * INFO Function _checkURL
   * @private
   *
   * Carefully working on this function, it includes some conditions and recursion,
   * you can end up in an ** INFINITE LOOP **
   */
  _checkURL(targetURL) {
    cy.url().then((url) => {
      if (url.includes(targetURL)) {
        //check url if it matches
        cy.log(`URL includes "${targetURL}"`)
      } else {
        // @ts-ignore
        if (this.count < this.maxAttempts) {
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(450); // Wait for 1 second before checking the URL again
          // @ts-ignore
          this.count++
          this._checkURL(targetURL); // Recursive call to checkURL() function
        } else {
          // Perform actions or assertions for failure case here
          if (accCheck === 'acc1'){
            actionPerformed = true
            accCheck = 'acc2'
            cy.log('Login Problem Occurred: logging in with backup ACC2: '+Cypress.env('EQUITY_GATEWAY_DEFAULT_USER2_AUTH'))
            this.login(Cypress.env('EQUITY_GATEWAY_DEFAULT_USER2_AUTH'), Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
          } else if (accCheck === 'acc2') {
            throw new Error('Login Problem Occurred: Unable to Login with any configured Account')
          }
        }
      }
    })
  }
}

export default LoginPage
