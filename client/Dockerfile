# Dockerfile for client

# Build off this base image
FROM httpd:latest

# Add user
RUN useradd docker

# Install app dependencies
COPY ./public-html/ /usr/local/apache2/htdocs/

# Set up working directory
WORKDIR /usr

# Change ownership of folder
RUN chown docker /usr

# When client container has been built and is running on server, switch user to docker via docker exec