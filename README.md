[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

# Welcome to Bliss Cypress automation framework
This is a slightly tweaked and enchanted Cypress Framework special built for Bliss Applications (www.blissapplications.com)
<br>
Our Framework is well organized extending PageObject Model using PageFactory Model in order to enhanced Test Run Performance (so it's recommended to follow our template concept)
Cypress Bliss Framework is also able to automatically generates reports (if enable), with a feature where they can be integrated on a MongoDB.
<br>
<br>
Current version *v2.2.5*

### Suggested IDEs by [Cypress documentation](https://docs.cypress.io/guides/tooling/IDE-integration.html#Extensions-amp-Plugins):
- VsCode
- Intellij

### Official Cypress framework links:
- [Cypress website](https://www.cypress.io/)
- The API documentation is available [here](https://docs.cypress.io/api/api/table-of-contents.html)

## Dependencies
You will need to install the Node.js to execute the project and also GIT version control.
<br>
- Download the latest Node available version (LTS is preferred) : [download here](https://nodejs.org/en/)
- Download the latest Git available version : [download here](https://git-scm.com/downloads)

---

## Before Run
Before run cypress you **must install** all dependencies.
<br>
You can to it directly by clicking on "Run Specs" Button:

> ```bash
> npm install yarn --force
> npm install --legacy-peer-deps
> yarn install --legacy-peer-deps
> ```

---

## How to Run the tests with Cypress Interface
With this command, Cypress interface will be opened, and you can select the browser and the exact file that you want to run. In addition, you are able to select to run all files directly clicking on "Run All Specs" Button.

> ```bash
> npx cypress open
> ```

---

## How to Run the tests in headless mode
Cypress give us the ability to run tests with a test runner interface that allow us to debug and develop tests much more quickly.
<br>
**NOTE:** That for report generation, in order to do not have command conflicts use Git Bash prompt, then run the following command:

> ```bash
> npx cypress run
> ```

---

## How to Open Test Reports
Our Framework reports can be seen on *test-results/index.html* via your preferred browser to have a user-friendly view.
<br>
**NOTE:** That in order to do not have command conflicts use Git Bash prompt, then use the following command to open it directly:
<br>

> ```bash
> start cypress/test-results/index.html
> ```
