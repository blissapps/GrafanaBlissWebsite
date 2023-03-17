import BaseNewOrEditRuleL4Page from './baseNewOrEditRuleL4Page'

const properties = {
  pageURL: '/rule/new?ruleType='
}

class NewRuleL4Page extends BaseNewOrEditRuleL4Page {
  /**
   * Checks if the current page is the one in properties.pageURL
   *
   * @param {string} ruleType The ruleType placed in the URL. It can be public, private, or otc
   */
  checkPageUrl(ruleType) {
    ruleType = ruleType.toLowerCase()

    const possibleRules = ['public', 'private', 'otc']

    if (possibleRules.includes(ruleType)) {
      this.checkUrl(properties.pageURL + ruleType)
    } else {
      throw new Error('Option invalid. Rules can oly be public, private, or otc')
    }
  }
}

export default NewRuleL4Page
