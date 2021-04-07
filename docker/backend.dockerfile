FROM amazonlinux:2.0.20210126.0

# Create working directories for the application
RUN mkdir /srv/app

# Set working directory
WORKDIR /srv

# Install node js
RUN curl -sL https://rpm.nodesource.com/setup_14.x | bash -
RUN yum install -y nodejs

# install dependencies
COPY src/backend/package*.json ./
RUN npm install

# set the path
ENV PATH /srv/node_modules/.bin:$PATH

# set workdir to /srv/app
WORKDIR /srv/app

EXPOSE 8000

RUN ls

CMD node app.js
