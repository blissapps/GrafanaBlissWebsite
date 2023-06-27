import BasePage from '../../../basePage'

const selectors = {
    btnClose: 'a[data-test-id="sw-top-bar-btn-close"]',
    btnBack: 'gs-button[data-test-id="sw-top-bar-btn-back"]',
    btnNext: 'gs-button[data-test-id="sw-top-bar-btn-next"]',
    progressBar: 'gs-progress-indicator[type="determinate"]'
}

class salesWizTopBar extends BasePage {
    btnNext(click){
        if (click === 'click') {
            cy.get(selectors.btnNext).should('be.visible').click()
        } else if (click === undefined || click === null) {
            cy.get(selectors.btnNext).contains('Next')
        } else {
            throw new Error('Unexpected "btnNext(click)" statement, Status: ' + click)
        }

    }

    btnBack(click){
        if (click === 'click') {
            cy.get(selectors.btnBack).should('be.visible').click()
        } else if (click === undefined || click === null) {
            cy.get(selectors.btnBack).contains('Back')
        } else {
            throw new Error('Unexpected "btnBack(click)" statement, Status: ' + click)
        }
    }

    btnClose(click){
        if (click === 'click') {
            cy.get(selectors.btnClose).should('be.visible').click()
            cy.url().should('include', '/dashboard')
        } else if (click === undefined || click === null) {
            cy.get(selectors.btnClose).contains('Close')
        } else {
            throw new Error('Unexpected "btnClose(click)" statement, Status: ' + click)
        }
    }

    progressBar(progressStep){
        if (progressStep === undefined || null) {
            cy.get(selectors.progressBar).should('be.visible')
        } else {
            let valuePercentage
            switch (progressStep) {
                case 1:
                    valuePercentage = /0+%/
                    break
                case 2:
                    valuePercentage = /16\.[0-9]+%/
                    break
                case 3:
                    valuePercentage = /33\.[0-9]+%/
                    break
                case 4:
                    valuePercentage = /50+%/
                    break
                case 5:
                    valuePercentage = /66\.[0-9]+%/
                    break
                case 6:
                    valuePercentage = /83\.[0-9]+%/
                    break
                case 7:
                    valuePercentage = /100+%/
                    break
                default:
                    throw new Error('Unexpected "progressStep" statement, Status: ' + progressStep)
            }
            cy.get(selectors.progressBar+' > div > div').should(($div) => {
                const { width } = $div[0].style;
                expect(width).to.match(valuePercentage)
            })
        }
    }
}
export default salesWizTopBar