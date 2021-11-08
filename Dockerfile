# Pull image
FROM cypress/browsers:node16.5.0-chrome94-ff93
FROM cypress/browsers:node14.10.1-edge88

# Creating a directory inside container
RUN mkdir /testApp
WORKDIR /testApp

# Copying Cypress tests code from your repo/host to container
COPY . /testApp

# Running the tests
# RUN yarn && yarn cy:run
# You can use "docker build -t cypress ." to run as well