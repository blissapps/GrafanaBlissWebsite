import EquityGateway from '../../support/pages/equityGateway';

const equityGateway = new EquityGateway()

describe('Login and Logout Tests', () => {
  context('General Login Successful Scenarios', () => {

    it.skip('Success Login ACC1', () => {
      cy.request({
        method: 'GET',
        url: 'https://eg-v4-alpha-25.gsapps.dev/dashboard',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjcxRkM4QTk2Qjk3OEREMDZENDY5RUNDRDkxOTZFNTdGIiwieDV0IjoiVmNTbE5mMzlZUnY5NER5NUpPZ2tFbzdVbm1RIiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwczovL2FwaS1hdXRoc2VydmVyLWFscGhhLTI1LmdzY2xvdWQuZGV2IiwibmJmIjoxNjg5MDY2NjQyLCJpYXQiOjE2ODkwNjY2NDIsImV4cCI6MTY4OTA4MTA0MiwiYXVkIjpbImF1dGhzZXJ2ZXJhcGkiLCJiYWNrZW5kYXBpIiwiYnVzaW5lc3NhcGkiLCJjb250ZW50c2FwaSJdLCJzY29wZSI6WyJhdXRoc2VydmVyYXBpIiwiYmFja2VuZGFwaSIsImJ1c2luZXNzYXBpIiwiY29udGVudHNhcGkiLCJwcm9maWxlIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdLCJjbGllbnRfaWQiOiJpbnRlZ3JhdGlvbiIsInN1YiI6IkFKVU9iVUtMRVdJQyIsImF1dGhfdGltZSI6MTY4OTA2NjY0MSwiaWRwIjoibG9jYWwiLCJsb2NhdGlvbiI6IlVLIiwiZW52aXJvbm1lbnRzIjoie1wiSWRcIjpcIlVLXCIsXCJVc2VySWRcIjoxMDY5NTQ3fSIsImNsaWVudElkIjoiNTE2IiwicGFydGljaXBhbnRJZCI6Ijk2NzY0OSJ9.h3fyjgvdbCxsyCEo_kNdTQ8OGSjYr-ZyrFy1wvSfod5jikpkL0RIpZ4gk8hEIGuhkzArd7c1ept5VohKvgx0w1tSqIChTYb59dWm3bF28VMrney8IpsSPXUkKbWHJ_daH7aBiTPzQqHC2r6VEjiUU-JaPhcN-rlzwG-b1scbXHJPcNqxS0XXBmKXf0NFZZWvOaxScUNfpCX7xK9j6oWBq6j3YFHF77ATqAxYnvxWa8kF0itE4-oprY_gqty3B4CNQCLVy1c5K53ntqksnjzCQXGTrj2uz6pa61PZKM1R9XwyUna_4yeqaU9JaWq9ypHW2IAFccFFL4p1zc6yAW8A8w'
        }
      })
    })

    it('Success Login ACC2', () => {
      //equityGateway.LoginPage.getBearerToken()
      equityGateway.LoginPage.login('Paul Fox')
    })

    it('Success Login ACC3', () => {
      equityGateway.LoginPage.login('Paulandera', Cypress.env('EQUITY_GATEWAY_DEFAULT_PASSWORD_AUTH'))
      equityGateway.DashboardPage.checkPageUrl()
    })
  })
})
