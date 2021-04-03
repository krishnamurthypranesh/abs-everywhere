FROM nginx

# Directory to store frontend files
RUN mkdir /app

# set working directory
WORKDIR /app
