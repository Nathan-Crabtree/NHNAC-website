# Dockerfile for api 

# Build off this base image
FROM node:latest

# Add user
RUN useradd docker

# Set up app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package.json
RUN npm install

# Bundle app source
RUN mkdir src
COPY src/* src/
COPY server.js server.js
COPY users.json users.json

# Change ownership of folder
RUN chown docker /usr/src/app

# Expose the server to the host machine
EXPOSE 8001

# Run this command on startup
ENTRYPOINT ["npm","start"]

# Switch user
USER docker