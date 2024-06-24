[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

# Cypress automation framework for the new admin portal

### Suggested IDEs by [Cypress documentation](https://docs.cypress.io/guides/tooling/IDE-integration.html#Extensions-amp-Plugins):

- VsCode (Best option to work with Cypress and it's free). I strongly recommend you to use this one!
- Intellij (Alternative solution, also free)

### Official framework links:

- [Cypress website](https://www.cypress.io/).
- The API documentation is available [here](https://docs.cypress.io/api/api/table-of-contents.html).

## Dependencies

You will need to install the Node.js to execute the project.
Download the latest Node available version [here](https://nodejs.org/en/).

Also, you can install via cli (MAC or Linux) using the Node Version Manager with the following commands:

> ```bash
> curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
>
> nvm install node
>
> nvm use node
> # Checking the version
> npm -v
> ```

After the completed node's installation, you will need to clone this current repo:

> ```bash
> # Repository link
> https://bitbucket.org/globalshares/gscypressautomationframework/src/master/
> ```

---

<br>

## How to Run the tests with Cypress Interface

Cypress give us the ability to run tests with a test runner interface that allow us to debug and develop tests much more quickly
To do this, just run the following command:

> ```bash
> npx cypress open
> ```

With this command, Cypress interface will be opened and you can select the browser and the exact file that you want to run. In addition, you are able to select to run all files directly clicking on "Run All Specs" Button.
