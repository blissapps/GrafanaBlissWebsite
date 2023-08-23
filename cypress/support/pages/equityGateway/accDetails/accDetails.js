import BasePage from '../../basePage'

/**
 * Do not change default values
 */
let actionPerformed = false
let userPreset = 'empty'

class accProfilePage extends BasePage {
  _getAccToken(user) {
    if (user === undefined || user === null) {
      user = Cypress.env('EQUITY_GATEWAY_DEFAULT_USER1_AUTH')
      cy.log('Request Warning: No user provided, using Default ACC USER1_AUTH')
    }

    const requestData = {
      client_id: 'integration',
      client_secret: 'businessapisecret',
      grant_type: 'password',
      username: user,
      password: Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH')
    }

    return new Cypress.Promise((resolve) => {
      cy.request({
        method: 'POST',
        url: 'https://api-authserver-alpha-25.gscloud.dev/connect/token',
        form: true,
        body: requestData
      }).then((response) => {
        expect(response.status).to.equal(200)
        const { access_token } = response.body
        resolve(access_token) // Resolve the promise with the access_token value
      })
    })
  }

  _getUserInfo(user) {
    return this._getAccToken(user).then((token) => {
      cy.request({
        method: 'GET',
        url: 'https://gatewaybff-alpha-25.gscloud.dev/api/v1.0/account/welcome',
        headers: {
          Authorization: `Bearer ${token}` //Attach the token as a Bearer token
        }
      })
        .then((response) => {
          expect(response.status).to.equal(200)
          // Write Fixture personal info
          cy.writeFile(`cypress/fixtures/gateway/accInfo/personalInfo${user}.json`, response.body)

          // Store the personUid
          // eslint-disable-next-line prefer-destructuring
          const { companyUuid } = response.body.assetOwner[0]

          cy.wrap(response).as('userInfo')

          //Chaining the second request
          return cy
            .request({
              method: 'GET',
              url: `https://gatewaybff-alpha-25.gscloud.dev/api/v1.0/Company/${companyUuid}/Security`,
              headers: {
                Authorization: `Bearer ${token}` //Attach the token as a Bearer token
              }
            })
            .as('security')
        })
        .then((securityResponse) => {
          // Write Fixture security info
          cy.writeFile(`cypress/fixtures/gateway/accInfo/securities${user}.json`, securityResponse.body)
        })
    })
  }

  accDataCollect(user) {
    if (userPreset === user){
      // Set actionPerformed during test execution time
      actionPerformed = true
    } else {
      userPreset = user
      actionPerformed = false
    }

    if (actionPerformed === false) {
      cy.log('Updating Account Details: ACC general Info, Shares and Securities')

      this._getUserInfo(user).then(() => {
        cy.get('@userInfo').then((response) => {
          // Get ACC general info - cy.log('ACC General Info: ' + JSON.stringify(response.body))
          // @ts-ignore
          cy.log('Person Name: ' + response.body.personFirstName + ' ' + response.body.personLastName)

          cy.get('@security').then((securityResponse) => {
            // Get ACC Securities - cy.log('Security Response: ' + JSON.stringify(securityResponse.body))

            // Extract ACC security names and log them with iteration number
            // @ts-ignore
            securityResponse.body.forEach(({ securityName }, index) => {
              cy.log(`Security Name (${index + 1}): ${securityName}`)
            })
          })
        })
      })
    } else {
      cy.log('Info Message: Account Data already up to date!')
    }
  }
}

export default accProfilePage