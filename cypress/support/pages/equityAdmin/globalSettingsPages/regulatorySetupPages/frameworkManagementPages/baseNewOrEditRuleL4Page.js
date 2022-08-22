import BasePage from '../../../../basePage'

const selectors = {
  titleHeader: '#data-title',
  subtitleHeader: '#data-subtitle',
  ruleReferenceInput: '#ruleDescription input',
  selectAllTaxResidenceCheckBox: '#selectAllTaxResidence',
  taxResidenciesInputOptions: '#taxResidencies input',
  selectAllSecurityListingLocationCountriesCheckBox: '#selectAllSecurityCountries',
  securityListingLocationInputOptions: '#securityCountries input',
  brokerDealerInputOptions: '#regulatoryPartners input',
  saveButton: '#saveBtn',
  taxResidenciesClearAllButton: '#taxResidencies gs-button[title*= "Clear All"]',
  securityListingLocationClearAllButton: '#securityCountries gs-button[title*= "Clear All"]'
}

/**
 * Class created with common elements for both creating and editing a rule in L4 panel
 */
class BaseNewOrEditRuleL4Page extends BasePage {
  // ----------------------------------------------------------------- CLICKS -------------------------------------------------------------------- //

  /**
   * Clicks to save the rule by clicking in the Create or Save button in the L4 panel
   */
  clickToSaveTheRule() {
    cy.get(selectors.saveButton).click()
  }

  /**
   * Click in the Clear All Button for the Tax Residencies field
   */
  clickToClearAllTaxResidencies() {
    cy.get(selectors.taxResidenciesClearAllButton).click()
  }

  /**
   * Click in the Clear All Button for the Security Listing Location field
   */
  clickToClearAllSecurityListingLocations() {
    cy.get(selectors.securityListingLocationClearAllButton).click()
  }

  // ----------------------------------------------------------------- ASSERTIONS -------------------------------------------------------------------- //

  /**
   * Assert if the Tax Residencies list of countries is enabled or not
   *
   * @param {boolean} enabled True is the default value to assert if the list of countries is enabled to be picked. False to assert otherwise
   */
  assertTaxResidenciesListOfCountriesIsEnabled(enabled = true) {
    if (enabled) {
      cy.get(selectors.taxResidenciesInputOptions).should('be.visible')
      cy.get(selectors.taxResidenciesInputOptions + '.disabled').should('not.exist')
    } else {
      cy.get(selectors.taxResidenciesInputOptions + '.disabled').should('be.visible')
    }
  }

  /**
   * Assert the header title and subtitle from the L4 panel
   *
   * @param {string} title Send a text in here to assert the title displayed on the top L4 panel in bold. The default '' will skip the text content verification.
   * @param {string} subtitle Send a text in here to assert the subtitle displayed on the top L4 panel bellow the title. The default '' will skip the text content verification.
   * @param {boolean} displayed Assert if the headers are displayed or not.
   *
   * @example
   * assertHeaderTitleAndSubtitleDisplayed('New Public Security Rule', 'Set up the framework rule. All fields are mandatory') => Assert if the text are displayed as title and subtitle.
   * assertHeaderTitleAndSubtitleDisplayed('', '') => Assert only if there is a title and subtitle visible but it does not validates the text content.
   */
  assertHeaderTitleAndSubtitleDisplayedInTheL4Panel(title = '', subtitle = '', displayed = true) {
    if (displayed) {
      cy.get(selectors.titleHeader).should('be.visible')
      cy.get(selectors.subtitleHeader).should('be.visible')

      title !== '' ? cy.get(selectors.titleHeader).should('contain.text', title) : null
      subtitle !== '' ? cy.get(selectors.subtitleHeader).should('contain.text', subtitle) : null
    }
  }

  assertCreateOrSaveButtonIsEnabled(enabled = true) {
    if (enabled) {
      cy.get(selectors.saveButton).should('be.visible')
      cy.get(selectors.saveButton + '.disabled').should('not.exist')
    } else {
      cy.get(selectors.saveButton + '.disabled').should('be.visible')
    }
  }

  // ----------------------------------------------------------------- OTHERS -------------------------------------------------------------------- //

  /**
   * Type the rule reference in the Rule Reference field
   *
   * @param {string} reference the Reference to fill the Rule Reference field
   */
  modifyRuleReference(reference) {
    cy.get(selectors.ruleReferenceInput).clear().type(reference)
  }

  /**
   * Select the Tax Residencies
   *
   * @param {array} listOfCountriesToSelect List of countries to be select, example ['Brazil', 'India']
   * @param {boolean} selectAll True is the default value to select the checkbox to Select All Countries.
   */
  selectTaxResidences(listOfCountriesToSelect = [], selectAll = true) {
    if (listOfCountriesToSelect.length && selectAll) {
      throw new Error('You cannot send a list of countries and ask to selectAll at the same time')
    } else if (selectAll) {
      cy.get(selectors.selectAllTaxResidenceCheckBox).click()
    } else {
      listOfCountriesToSelect.forEach((country) => {
        cy.get(selectors.taxResidenciesInputOptions).clear({ force: true }).type(country, { force: true })
        cy.xpath(`//*[contains(@class, "select-panel")]//*[contains(@id, "option")]//div[normalize-space(text())="${country}"]`).click()
      })
    }
  }

  /**
   * Select the Security Listing Location
   *
   * @param {array} listOfCountriesToSelect List of countries to be select, example ['Brazil', 'India']
   * @param {boolean} selectAll True is the default value to select the checkbox to Select All Countries.
   */
  selectSecurityListingLocation(listOfCountriesToSelect = [], selectAll = true) {
    if (listOfCountriesToSelect.length && selectAll) {
      throw new Error('You cannot send a list of countries and ask to selectAll at the same time')
    } else if (selectAll) {
      cy.get(selectors.selectAllSecurityListingLocationCountriesCheckBox).click()
    } else {
      listOfCountriesToSelect.forEach((country) => {
        cy.get(selectors.securityListingLocationInputOptions).clear({ force: true }).type(country, { force: true })
        cy.xpath(`//*[contains(@class, "select-panel")]//*[contains(@id, "option")]//div[normalize-space(text())="${country}"]`).click()
      })
    }
  }

  /**
   * Selects a Broker-Dealer
   *
   * @param {string} brokerDealerName The name of the Broker Dealer to be selected
   */
  selectBrokerDealer(brokerDealerName) {
    cy.get(selectors.brokerDealerInputOptions).clear({ force: true }).type(brokerDealerName, { force: true })
    cy.xpath(`//*[contains(@class, "select-panel")]//*[contains(@id, "option")]//div[normalize-space(text())="${brokerDealerName}"]`).click()
  }
}

export default BaseNewOrEditRuleL4Page
