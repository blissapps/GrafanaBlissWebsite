[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

# Cypress automation framework for the new admin portal

### Suggested IDEs by [Cypress documentation](https://docs.cypress.io/guides/tooling/IDE-integration.html#Extensions-amp-Plugins):

- VsCode (Best option to work with Cypress and it's free). I strongly recommend you to use this one!
- Intellij (Alternative solution, also free)

### Official framework links:

- [Cypress website](https://www.cypress.io/).
- The API documentation is available [here](https://docs.cypress.io/api/api/table-of-contents.html).

### Global Shares wiki about Cypress (take a look before proceeding):

https://globalshares.atlassian.net/wiki/spaces/GCE/pages/2825716059/Cypress+Automation+Framework

---

<br>

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

## Installing the dependencies

Open the repo folder over CLI mode and install all dev dependencies using yarn. Just type:

> ```bash
> yarn
> ```

- Note for Windows users: If you get some error saying that the yarn cannot be loaded because running scripts is disabled, just execute this code bellow to change system policies:

> `Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser`

Once you run yarn, you will see something like this:

> ```bash
> yarn install v1.15.2
> info No lockfile found.
> [1/4] 🔍  Resolving packages...
> [2/4] 🚚  Fetching packages...
> [3/4] 🔗  Linking dependencies...
> [4/4] 🔨  Building fresh packages...
> success Saved lockfile.
> ```

---

<br>

## How to Run the tests with Cypress Interface

Cypress give us the ability to run tests with a test runner interface that allow us to debug and develop tests much more quickly
To do this, just run the following command:

> ```bash
> yarn cy:open
> ```

With this command, Cypress interface will be opened and you can select the browser and the exact file that you want to run. In addition, you are able to select to run all files directly clicking on "Run All Specs" Button.

## How to Run the tests with Cypress using CLI

We can create many personalized ways to run cypress. To do this, we need to create commands in the package.json file located in the root of this repo. So far, we have some commands to facilitate our day to day work, which are:

> ```bash
> # Starting the tests via CLI with the Chrome browser by default:
> yarn cy:run
>
> # Starting the tests via CLI in headless mode with the Chrome browser by default:
> yarn cy:run
>
> # Starting the tests via CLI in headless mode with the Chrome browser:
> cy:run:chrome
>
> # Starting the tests via CLI in headless mode with the Firefox browser:
> cy:run:firefox
>
> # Starting the tests via CLI in headless mode with the Edge browser:
> cy:run:edge
> ```

Remember that all those commands above can be totally adapted, modified, or even created according to the project current necessities

---

<br>

## Compilers and linters

Basically, we need to make sure we do not have any issue raised by the compilers before committing any code. So, we need to run all the compilers in this order:

```bash
# Run this typescript compiler first, if some error is found, fix it and it run again:
yarn compile

# Now, with no more errors from the previous one, run the ESLint and prettier:
yarn lint:fix

# Then, fix any issue raised and rerun the scripts above again just to make you are okay.

# If no issues were found, you can move forward to commit your code.
```

Please refer to this link to more information regarding compilers and linters details in this project: https://globalshares.atlassian.net/wiki/spaces/GCE/pages/2826076557/Compilers
