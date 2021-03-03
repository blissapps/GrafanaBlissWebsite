# Cypress basic sample

In this current repo you will be able to learn a bit more about [Cypress](https://www.cypress.io/). The API documentation is available [here](https://docs.cypress.io/api/api/table-of-contents.html). 

### Dependencies
You will need to install the Node.js to execute the project. Download the latest Node available version [here](https://nodejs.org/pt-br/download/). Also, you can install via cli (MAC or Linux) using the Node Version Manager with the following commands:

> ```bash
> curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
>
> nvm install node
>
> nvm use node
> # Checking the version
> npm -v
> ```

After the completed node's installation, you will need to clone this current repo.

> ```bash
> # Git Links
> https://github.com/laerteneto/cypress-sample-project
> ```

### Installing the dependencies 
Open the repo folder and install all dev dependencies using:
> ```bash
> yarn 
> ```

Note for Windows users: If you get some error saying that the yarn cannot be loaded because running scripts is disabled, just execute this code bellow to change system policies:

> ```Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser ```

You will see the following messages:
> ```bash
> yarn install v1.15.2
> info No lockfile found.
> [1/4] 🔍  Resolving packages...
> [2/4] 🚚  Fetching packages...
> [3/4] 🔗  Linking dependencies...
> [4/4] 🔨  Building fresh packages...
> success Saved lockfile.
> ```

### How to Run the tests with Cypress Interface

To run the specs with headed GUI and have a way to debug the tests start Cypress using: 

> ```bash
> yarn cy:open
> ```

With the last command above, Cypress interface will be open and you can select the browser and the exactly file that you want to run. In addition, you are able to select to run all files directly clicking on "Run All Specs" Button.

Also, you can run and follow all tests using the command below:
> ```bash
> yarn cy:run
> ```


### How to Run the tests with Cypress using CLI
The following command will run all the specs in headless mode.

> ```bash
> # Starting the tests via CLI
> yarn cy:run:headless
> ```


### Cypress with Docker
When we execute tests using our local resources, the tests take advantage of the host machine like browsers, memory and etc.

Using Docker you'll be able to customize your "machine configurations" without having any extra infrastructure. It's so simple to create Containers on the fly and add your tests into a Continuos Integration Environment.

For this case, the tests are running inside the container via dockerfile so, you can follow the next steps to see how to run tests with Docker.

### How to Run the tests with Docker
> ```bash
> # Into your cli 
> docker build -t cypress .
> ```