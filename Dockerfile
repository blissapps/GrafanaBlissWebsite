# Pull image
# example: FROM cypress/browsers:node13.6.0-chrome80-ff72
FROM cypress/browsers:node14.15.0-chrome86-ff82
FROM cypress/browsers:node14.10.1-edge88
# There is no official image for Firefox, so it needs to be downloaded manually by wget or curl


# Creating a directory inside container
RUN mkdir /testApp
WORKDIR /testApp

# Copying Cypress tests code from your repo/host to container
COPY . /testApp

# Running the tests
# RUN yarn && yarn cy:run

# You can use "docker build -t cypress ." to run