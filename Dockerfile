FROM amazonlinux:2.0.20210126.0

# install development tools
#RUN yum group install "Development Tools" -y


# Install node js
RUN curl -sL https://rpm.nodesource.com/setup_14.x | bash -
RUN yum install -y nodejs


# Create working directories for the application
RUN mkdir /app
