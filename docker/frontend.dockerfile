FROM nginx

# Directory to store frontend files
RUN mkdir /app

# set working directory
WORKDIR /app

# Copy nginx settings, rename default.conf to default.conf.bak
COPY ./docker/nginx.conf /etc/nginx/conf.d/
RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.bak
