# Pull image
FROM cypress/browsers:node13.6.0-chrome80-ff72
# Creating a directory inside container
RUN mkdir /testApp
WORKDIR /testApp
# Copying Cypress tests code from your repo/host to container
COPY . /testApp
# Running the tests
# RUN yarn && yarn cy:run

# You can use "docker build -t cypress ." to run