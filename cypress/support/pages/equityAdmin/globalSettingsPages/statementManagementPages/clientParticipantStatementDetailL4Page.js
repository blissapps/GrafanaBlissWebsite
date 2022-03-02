import BaseStatementManagementPage from './baseStatementsManagementPage'

const properties = {
  pageURL: /.?statement\/*client\/*.*[0-9]\/*statement.*[0-9]\/*participants\/.*[0-9]$/
}

const selectors = {
  nameOfParticipantHeader: 'gs-container-l4 div.statement-header',
  participantAvatar: 'gs-container-l4 div > gs-avatar',
  asOfDate: 'gs-container-l4 div.statement-info:nth-child(2)',
  currentStatus: 'gs-container-l4 div.statement-info:nth-child(3) > gs-badge',
  statementAuditTrailContainer: 'gs-container-l4 ul.audit-trail',
  statementAuditTrailElementsHistory: 'gs-container-l4 ul.audit-trail li',
  statementAuditTrailStatusBadge: 'gs-container-l4 ul.audit-trail li gs-badge',
  statementAuditTrailUser: '//gs-container-l4//div[@class="audit-detail-title"]/following-sibling::p',
  statementAuditTrailTimestamp: '//gs-container-l4//div[@class="audit-detail-title"]//p[last()]'
}

class ClientParticipantStatementDetailL4Page extends BaseStatementManagementPage {
  /**
   * Checks if the current page is the one in properties.pageURL
   */
  checkPageUrl() {
    this.checkUrlByRegex(properties.pageURL)
  }

  // -------------------------------------------------------------------------------------- ASSERTIONS --------------------------------------------------------------------------------- //

  /**
   * Assert the details in the Statement Detail L4 bar right after selecting a participant on the Participant Statements table
   *
   * @param {string} participantName Name of the participant
   * @param {string} participantAsOfDate Participant as of date
   * @param {string} participantCurrentStatus Participant current status displayed in the Badge. Attention: It is not in uppercase, so take a look in the HTML
   * @param {array} statusNameTrailList List of status to be verified in order decrescent
   * @param {array} nameUserTrailList List of names to be verified in order decrescent
   * @param {array} timestampTrailList List of timestamps to be verified in order decrescent
   *
   * @examples
   * assertParticipantStatementDetails('', '', '', [' Initiated', 'Initiated'], ['system', 'system'], ['07/09/2021 • 10:24:42', '11/05/2021 • 05:13:30'])
   *
   */
  assertParticipantStatementDetails(
    participantName = '',
    participantAsOfDate = '',
    participantCurrentStatus = '',
    statusNameTrailList = [],
    nameUserTrailList = [],
    timestampTrailList = []
  ) {
    if (participantName != '') {
      cy.get(selectors.nameOfParticipantHeader).should('contain.text', participantName)
    }

    if (participantAsOfDate != '') {
      cy.get(selectors.asOfDate).should('contain.text', participantAsOfDate)
    }

    if (participantCurrentStatus != '') {
      cy.get(selectors.currentStatus).should('contain.text', participantCurrentStatus)
    }

    if (statusNameTrailList.length != 0) {
      for (let i = 0; i < statusNameTrailList.length; i++) {
        cy.get(selectors.statementAuditTrailStatusBadge).eq(i).should('contain.text', statusNameTrailList[i])
      }
    }

    if (nameUserTrailList.length != 0) {
      for (let i = 0; i < nameUserTrailList.length; i++) {
        cy.xpath(selectors.statementAuditTrailUser).eq(i).should('contain.text', nameUserTrailList[i])
      }
    }

    if (timestampTrailList.length != 0) {
      for (let i = 0; i < timestampTrailList.length; i++) {
        cy.xpath(selectors.statementAuditTrailTimestamp).eq(i).should('contain.text', timestampTrailList[i])
      }
    }
  }
}

export default ClientParticipantStatementDetailL4Page
