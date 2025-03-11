# Pull image
FROM cypress/included:13.8.0

# Creating a directory inside container
WORKDIR /blissWebsiteApp

# Copying Cypress tests code from your repo/host to container
COPY . /blissWebsiteApp

# Run dependencies
# RUN npm install --force

# Running the tests
RUN yarn && yarn cy:run
# You can use "docker build -t cypress ." to run as well