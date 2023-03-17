import BasePeopleParticipantPage from '../basePeopleParticipantPage'

const properties = {
  pageURL: 'company-profile/company-information'
}

const selectors = {
  relationshipToCompanyField: '#relationshipToCompanyField input',
  optionEmployee: '#optionEmployee',
  optionNonEmployee: '#optionNonEmployee',
  hireDateInputField: '#hireDateField input',
  departmentField: '#departmentField',
  departmentInputField: '#departmentField input',
  sectionField: '#sectionField',
  sectionInputField: '#sectionField input',
  branchField: '#branchField',
  branchInputField: '#branchField input',
  businessUnitField: '#businessUnitField',
  businessUnitInputField: '#businessUnitField input',
  companyLocationField: '#companyLocationField',
  companyLocationInputField: '#companyLocationField input',
  companyCodeField: '#companyCodeField',
  companyCodeInputField: '#companyCodeField input',
  subsidiaryNameField: '#subsidiaryNameField',
  subsidiaryNameInputField: '#subsidiaryNameField input',
  subsidiaryCodeField: '#subsidiaryCodeField',
  subsidiaryCodeInputField: '#subsidiaryCodeField input',
  billingCodeField: '#billingCodeField',
  billingCodeInputField: '#billingCodeField input',
  jobTitleField: '#jobTitleField',
  jobTitleInputField: '#jobTitleField input',
  brokerOfficerCodeField: '#brokerOfficerCodeField',
  brokerOfficerCodeInputField: '#brokerOfficerCodeField input',
  founderCheckbox: '#isFounderField',
  officerCheckbox: '#isOfficerField',
  directorCheckbox: '#isDirectorField',
  namedExecutiveCheckbox: '#isNamedExecutiveField',
  blackoutInsiderCheckbox: '#isBlackoutInsiderField',
  internationalMobileEmployeeCheckbox: '#isInternationalMobileEmployeeField',
  section16InsiderCheckbox: '#isSection16InsiderField',
  codeStaffCheckbox: '#isCodeStaffField',
  PDMRCheckbox: '#isPDMRField',
  OSACheckbox: '#isOSAField'
}

class CompanyProfileOverviewPage extends BasePeopleParticipantPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrl(properties.pageURL)
  }

  // --------------------------------------------------------------------------- ASSERTIONS  ----------------------------------------------------------------------------- //
  /**
   * Assert if an error message is displayed for a field in the company page
   *
   * @param {string} inputFieldName Input field name to validate if there is an error message for it
   * @param {string} errorMessage  Send the error message text in case you want to validate the content of the message. Send nothing to not validate the content
   * @param {boolean} displayed True to validate if the error message is displayed, and false for otherwise
   */
  assertErrorMessageIsDisplayedInCompanyFields(inputFieldName, errorMessage = '', displayed = true) {
    inputFieldName = inputFieldName.toLowerCase()

    switch (inputFieldName) {
      case 'department':
        this.assertErrorMessageDisplayedInParticipantField(selectors.departmentField, errorMessage, displayed)
        break

      case 'section':
        this.assertErrorMessageDisplayedInParticipantField(selectors.sectionField, errorMessage, displayed)
        break

      case 'branch':
        this.assertErrorMessageDisplayedInParticipantField(selectors.branchField, errorMessage, displayed)
        break

      case 'business unit':
        this.assertErrorMessageDisplayedInParticipantField(selectors.businessUnitField, errorMessage, displayed)
        break

      case 'company location':
        this.assertErrorMessageDisplayedInParticipantField(selectors.companyLocationField, errorMessage, displayed)
        break

      case 'company code':
        this.assertErrorMessageDisplayedInParticipantField(selectors.companyCodeField, errorMessage, displayed)
        break

      case 'subsidiary name':
        this.assertErrorMessageDisplayedInParticipantField(selectors.subsidiaryNameField, errorMessage, displayed)
        break

      case 'subsidiary code':
        this.assertErrorMessageDisplayedInParticipantField(selectors.subsidiaryCodeField, errorMessage, displayed)
        break

      case 'billing code':
        this.assertErrorMessageDisplayedInParticipantField(selectors.billingCodeField, errorMessage, displayed)
        break

      case 'job title':
        this.assertErrorMessageDisplayedInParticipantField(selectors.jobTitleField, errorMessage, displayed)
        break

      case 'broker officer code':
        this.assertErrorMessageDisplayedInParticipantField(selectors.brokerOfficerCodeField, errorMessage, displayed)
        break

      default:
        throw new Error('Option invalid for the input name: ' + inputFieldName + ' Please, try again!')
    }
  }

  // --------------------------------------------------------------------------- OTHERS  ----------------------------------------------------------------------------- //

  /**
   * Fill out the company info of a participant in the Company Overview page
   *
   * @param {string} relationshipToCompany Relationship to Company field
   * @param {string} hireDate Hire Date field
   * @param {string} department Department field
   * @param {string} section Section field
   * @param {string} branch Branch field
   * @param {string} businessUnit Business Unit field
   * @param {string} companyLocation Company Location field
   * @param {string} companyCode Company code field
   * @param {string} subsidiaryName Subsidiary Name field
   * @param {string} subsidiaryCode Subsidiary Code field
   * @param {string} billingCode Billing Code field
   */
  fillOutCompanyInfo(
    relationshipToCompany = '',
    hireDate = '',
    department = '',
    section = '',
    branch = '',
    businessUnit = '',
    companyLocation = '',
    companyCode = '',
    subsidiaryName = '',
    subsidiaryCode = '',
    billingCode = ''
  ) {
    // Relationship to Company
    if (relationshipToCompany !== '') {
      relationshipToCompany = relationshipToCompany.toLowerCase()
      cy.get(selectors.relationshipToCompanyField).click()
      if (relationshipToCompany === 'employee') {
        cy.get(selectors.optionEmployee).click()
      } else if (relationshipToCompany === 'non employee') {
        cy.get(selectors.optionNonEmployee).click()
      } else {
        throw new Error('Company relationship option not valid. Please, choose a valid option. It can be employee, or non employee')
      }
    }

    // Hire Date
    if (hireDate !== '') {
      cy.get(selectors.hireDateInputField).clear().type(hireDate)
    }

    // Department
    if (department !== '') {
      cy.get(selectors.departmentInputField).clear().type(department)
    }

    // Section
    if (section !== '') {
      cy.get(selectors.sectionInputField).clear().type(section)
    }

    // Branch
    if (branch !== '') {
      cy.get(selectors.branchInputField).clear().type(branch)
    }

    // Business Unit
    if (businessUnit !== '') {
      cy.get(selectors.businessUnitInputField).clear().type(businessUnit)
    }

    // Company Location
    if (companyLocation !== '') {
      cy.get(selectors.companyLocationInputField).clear().type(companyLocation)
    }

    // Company Code
    if (companyCode !== '') {
      cy.get(selectors.companyCodeInputField).clear().type(companyCode)
    }

    // Subsidiary Name
    if (subsidiaryName !== '') {
      cy.get(selectors.subsidiaryNameInputField).clear().type(subsidiaryName)
    }

    // Subsidiary Code
    if (subsidiaryCode !== '') {
      cy.get(selectors.subsidiaryCodeInputField).clear().type(subsidiaryCode)
    }

    // Billing Code
    if (billingCode !== '') {
      cy.get(selectors.billingCodeInputField).clear().type(billingCode)
    }
  }

  /**
   * Fill out the Role section fields of a participant in the Company Overview page
   *
   * @param {string} jobTitle Job Title field
   * @param {string} brokerOfficerCode Broker Officer Code field. Max 10 chars
   * @param {boolean} founder True to click in the Founder checkbox, false is the default value to skip (to don't click on it)
   * @param {boolean} officer True to click in the Officer checkbox, false is the default value to skip (to don't click on it)
   * @param {boolean} director True to click in the Director checkbox, false is the default value to skip (to don't click on it)
   * @param {boolean} namedExecutive True to click in the Named Executive checkbox, false is the default value to skip (to don't click on it)
   * @param {boolean} blackoutInsider True to click in the Blackout Insider checkbox, false is the default value to skip (to don't click on it)
   * @param {boolean} internationalMobileEmployee True to click in the International Mobile Employee checkbox, false is the default value to skip (to don't click on it)
   * @param {boolean} section16Insider True to click in the Section 16 Insider checkbox, false is the default value to skip (to don't click on it)
   * @param {boolean} codeStaff True to click in the Code Staff checkbox, false is the default value to skip (to don't click on it)
   * @param {boolean} PDMR True to click in the PDMR checkbox, false is the default value to skip (to don't click on it)
   * @param {boolean} OSA True to click in the OSA checkbox, false is the default value to skip (to don't click on it)
   */
  fillOutRole(
    jobTitle = '',
    brokerOfficerCode = '',
    founder = false,
    officer = false,
    director = false,
    namedExecutive = false,
    blackoutInsider = false,
    internationalMobileEmployee = false,
    section16Insider = false,
    codeStaff = false,
    PDMR = false,
    OSA = false
  ) {
    // Job Title
    if (jobTitle !== '') {
      cy.get(selectors.jobTitleInputField).clear().type(jobTitle)
    }

    // Broker Officer Code
    if (brokerOfficerCode !== '') {
      cy.get(selectors.brokerOfficerCodeInputField).clear().type(brokerOfficerCode)
    }

    // Founder
    if (founder) {
      cy.get(selectors.founderCheckbox).click()
    }

    // Officer
    if (officer) {
      cy.get(selectors.officerCheckbox).click()
    }

    // Director
    if (director) {
      cy.get(selectors.directorCheckbox).click()
    }

    // Named Executive
    if (namedExecutive) {
      cy.get(selectors.namedExecutiveCheckbox).click()
    }

    // Blackout Insider
    if (blackoutInsider) {
      cy.get(selectors.blackoutInsiderCheckbox).click()
    }

    // International Mobile Employee
    if (internationalMobileEmployee) {
      cy.get(selectors.internationalMobileEmployeeCheckbox).click()
    }

    // Section 16 Insider
    if (section16Insider) {
      cy.get(selectors.section16InsiderCheckbox).click()
    }

    // Code Staff
    if (codeStaff) {
      cy.get(selectors.codeStaffCheckbox).click()
    }

    // PDMR
    if (PDMR) {
      cy.get(selectors.PDMRCheckbox).click()
    }

    // OSA
    if (OSA) {
      cy.get(selectors.OSACheckbox).click()
    }
  }
}

export default CompanyProfileOverviewPage
