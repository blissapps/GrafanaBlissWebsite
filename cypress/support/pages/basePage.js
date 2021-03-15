/**
 * This is the basePage class with all basic methods we can use across all the pages
 */
class BasePage {

  /**
   * Get an element by passing a text
   * 
   * @param {string} text text to get the element
   * 
   * @returns the element if found
   */
  getElementByText(text){
    return cy.xpath(`//*[normalize-space(text()) = '${text}']`)
  }
  
  /**
   * Get an element by passing a text and a specific html tag
   * 
   * @param {*} tag html tag
   * @param {*} text text to check
   * 
   * @returns the element if found
   */
    getElementByTagAndText(tag, text){
    return cy.xpath(`//${tag}[normalize-space(text()) = '${text}']`)
  }

  /**
   * Get the first element containing some text
   * 
   * @param {string} text text to check if a element contain it
   * @returns 
   */
  getElementByContainsText(text){
    return cy.contains(text)
  }

  /**
   * Check url
   * 
   * @param {string} url The entire url or a part of it
   * 
   * @returns The assertion if the url exists or not
   */
  checkUrl(url){
    return cy.url().should('include', url)
  }

  /**
   * Select an item in a select box
   * 
   * @param {string} selectBoxId select box Id in Jquery Selector
   * @param {string} selectText text of the element to be selected
   * 
   * @returns the element selected
   */
  selectById(selectBoxId, selectText) {
    return cy.get(selectBoxId).select(selectText);
  }

  /**
   * Type a text in a input field
   * 
   * @param {string} inputId input id in Jquery Selector
   * @param {string} value  value to be typed in the input
   */
  typeInputValueById(inputId, value) {
    cy.get(inputId).type(value);
  }

  /**
   * Type a text in a text area field
   * 
   * @param {string} textAreaId text area id in Jquery Selector
   * @param {string} value value to be typed in the input
   */
  typeTextAreaValueById(textAreaId, value) {
    cy.get(textAreaId).type(value);
  }

  /**
   * Click in a element by passing the element text
   * 
   * @param {*} text element text to be clicked

   */
  clickElementByText(text){
    return this.getElementByText(text).click()
  }

  /**
   * Selects a tab
   * 
   * @param {String} tabName Name of the tab you want to go in
   */
  selectTab(tabName){
    cy.xpath(`//div[@class='tabs-bar']//span[text()='${tabName}']`).click()
  }

  /**
   * Click in the first apperance of a text in a table of hearth-data-container type
   *  
   * @param {*} text text bo be clicked in the table
   */
  clickDataByTextInTable(text){
    cy.xpath(`(//hearth-data-container//*[text() = '${text}'])[1]`).click()
  }

}

export default BasePage;
