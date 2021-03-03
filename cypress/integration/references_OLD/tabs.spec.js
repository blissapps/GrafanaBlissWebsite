import BasePage from "../../support/pages/references_old/basePage";

describe("Tab execution", () => {
  const basePage = new BasePage();

  beforeEach(() => {
    // cy.visit("/");
    // basePage.typeInputValueById("#Username", "test-gsadmin-1")
    // basePage.typeInputValueById("#Password", "GShares12345")
    // basePage.clickElementByText("Sign In")
  });

  it(`C160892- Tab support with target=blank removal`, () => {
    // Login
    cy.visit("https://ea.dev.regression.rc/")
    basePage.typeInputValueById("#Username", "test-gsadmin-1")
    basePage.typeInputValueById("#Password", "GShares12345")
    basePage.clickElementByText("Sign In")
    
    // Access client and participants
    cy.get('.chosen-single > span').click()
    cy.xpath('//*[@id="client_chosen"]/div/div/input').type('HasPurchasePlan_SIP{enter}')
    cy.get(':nth-child(1) > .selectable > h4').click()
    cy.get(':nth-child(1) > .selectable').click()
    
    // Save url if we want to get it back
    let urlToComeBackAfterTab = cy.url().then(url => { urlToComeBackAfterTab = url});
    cy.then(() => console.log("++++++++++++++++++++++++++++++++++ " + urlToComeBackAfterTab))

    // Tab handling
    cy.xpath('//*[@id="FilteredList"]/div[2]/table/tbody/tr[38]/td[1]/a[2]').invoke('removeAttr', 'target').click()
    cy.url().should('contain', 'Participant')

    // Continue testing in the "NEW TAB"
    cy.get("#resourcesMenuItem").trigger('mouseover')
    cy.get("#calculatorsMenuItem").click({force: true})
    
    // Verifications
    cy.get("#_SaleOfSharesCalculator").click()
    cy.xpath("//td[@class='currency']//input").type("10")
    cy.xpath("(//td[@class='numberAlignment']//input)[1]").type("10")
    cy.xpath("(//td[@class='numberAlignment']//input)[2]").type("100").blur()
    cy.xpath("(//td[@class='currency noWrap grossgain'])[1]").should('have.text', 'EUR 1,000.00')
    cy.xpath("(//td[@class='currency noWrap capitalgainloss'])[1]").should('have.text','EUR 500.00')
    cy.xpath("(//td[@class='currency noWrap sharestaxes'])[1]").should('have.text','EUR 50.00')
    cy.xpath("(//td[@class='currency noWrap gainnet'])[1]").should('have.text','EUR 950.00')
    cy.get("#CompanySelectedSecurityId").select('GSK')
    
    // Going back to the previous page
    cy.visit("https://ea.dev.regression.rc/Participant/ListAll");
    // cy.visit(urlToComeBackAfterTab)
    cy.xpath('//*[@id="FilteredList"]/div[2]/table/tbody/tr[38]/td[1]/a[2]').trigger('mouseover')
    cy.xpath('//*[@id="FilteredList"]/div[2]/table/tbody/tr[38]/td[4]').should('have.text','Deal9 Deal9')
  });

  it.only(`C160892- Tab support with target=blank removal - Client without underscore`, () => {
    // Login
    cy.visit("https://ea.dev.regression.rc/")
    basePage.typeInputValueById("#Username", "test-gsadmin-1")
    basePage.typeInputValueById("#Password", "GShares12345")
    basePage.clickElementByText("Sign In")

    // Access client and participants
    cy.get('.chosen-single > span').click()
    cy.xpath('//*[@id="client_chosen"]/div/div/input').type('OrderManagementStatement{enter}')
    cy.get(':nth-child(1) > .selectable > h4').click()
    cy.get(':nth-child(1) > .selectable').click()
    
    // Save url if we want to get it back
    let urlToComeBackAfterTab = cy.url().then(url => { urlToComeBackAfterTab = url});
    cy.then(() => console.log("++++++++++++++++++++++++++++++++++ " + urlToComeBackAfterTab))

    // Tab handling
    cy.xpath('//*[@id="FilteredList"]/div[2]/table/tbody/tr[1]/td[1]/a[2]').invoke('removeAttr', 'target').click()
    cy.url().should('contain', 'Participant')

    // // Continue testing in the "NEW TAB"
    // cy.get("#resourcesMenuItem").trigger('mouseover')
    // cy.get("#calculatorsMenuItem").click({force: true})
    
    // // Verifications
    // cy.get("#_SaleOfSharesCalculator").click()
    // cy.xpath("//td[@class='currency']//input").type("10")
    // cy.xpath("(//td[@class='numberAlignment']//input)[1]").type("10")
    // cy.xpath("(//td[@class='numberAlignment']//input)[2]").type("100").blur()
    // cy.xpath("(//td[@class='currency noWrap grossgain'])[1]").should('have.text', 'EUR 1,000.00')
    // cy.xpath("(//td[@class='currency noWrap capitalgainloss'])[1]").should('have.text','EUR 500.00')
    // cy.xpath("(//td[@class='currency noWrap sharestaxes'])[1]").should('have.text','EUR 50.00')
    // cy.xpath("(//td[@class='currency noWrap gainnet'])[1]").should('have.text','EUR 950.00')
    // cy.get("#CompanySelectedSecurityId").select('GSK')
    
    // // Going back to the previous page
     cy.visit("https://ea.dev.regression.rc/Participant/ListAll");
     cy.get('.col-sm-10 > a').click()
    // // cy.visit(urlToComeBackAfterTab)
    // cy.xpath('//*[@id="FilteredList"]/div[2]/table/tbody/tr[38]/td[1]/a[2]').trigger('mouseover')
    // cy.xpath('//*[@id="FilteredList"]/div[2]/table/tbody/tr[38]/td[4]').should('have.text','Deal9 Deal9')
  });


  it.skip(`Test base url null`, () => {
      cy.visit("https://haspurchaseplan_sip.dev.regression.rc/en")
    //   cy.visit("www.google.com")
      cy.xpath("//h1[text() = 'Company EquityGateway']").should('be.visible')
  });


  it.skip(`C119375- Tab support with target=blank removal - client Activation_1`, () => {
    cy.get('.chosen-single > span').click()
    cy.xpath('//*[@id="client_chosen"]/div/div/input').type('Activation_1{enter}')
    cy.get(':nth-child(1) > .selectable > h4').click()
    cy.get(':nth-child(2) > .selectable > h4').click()

    // Tab handling
    cy.xpath('//*[@id="activate_-1"]').invoke('removeAttr', 'target').click()

    cy.get('#Username').type('gustavodsilva')
    cy.get('#Password').type('GShares12345!')
    cy.get('#ConfirmPassword').type('GShares12345!')
    
    cy.xpath("(//*[text() = 'What city were your born in?']/../following-sibling::div)[1]").type('Lisbon')
    cy.xpath("(//*[text() = 'What city were your born in?']/../following-sibling::div)[3]").type('blue')
    
    cy.get("#activateNextBtn").click()
  });
});
