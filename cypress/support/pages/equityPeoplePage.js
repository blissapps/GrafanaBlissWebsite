import Common from './common'
import SearchBar from '../components/searchBar'


const selectors = {
  editIconButton: '.record-actions > .mini',
  amountOfRecordsOnTable: '#peopleRecordCount',
  onePersonInTheRecordConfirmation: "//*[@id='peopleRecordCount' and normalize-space(text())='1 record(s)']"
}

const properties = {
  peopleURL: '/people'
}

const searchBar = new SearchBar;

class EquityPeoplePage extends Common{

  /**
   * Checks if the current page is Participants/People URL
   */
  checkPeopleUrl(){
    this.checkUrl(properties.peopleURL)
  }

    /**
   * Search for a participant using the search bar
   * 
   * @param {string} participantId Participant id to be searched
   */
   selectParticipantFromTheListToGetDetails(participantId){
    searchBar.search(participantId)
    cy.xpath(selectors.onePersonInTheRecordConfirmation) //making sure there is just one person returned before moving foward
    this.clickDataByTextInTable(participantId)
  }

  /**
   * Edit a participant from the list
   * 
   * @param {string} participantId Participant id to be searched
   */
  editParticipantDetails(participantId){
    this.selectParticipantFromTheListToGetDetails(participantId)
    cy.get(selectors.editIconButton).click()
  }
      
}
  
export default EquityPeoplePage;
