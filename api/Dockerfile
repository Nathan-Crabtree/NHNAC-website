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

# Bundle app source. 
# NOTE: Include more file locations if needed as project increases in size. - Zane
RUN mkdir src
COPY src/* src/
COPY server.js server.js
COPY users.json users.json

# Change ownership of folder
RUN chown docker /usr/src/app

# Expose the server to the host machine

# Run this command on startup
ENTRYPOINT ["npm","build"]

# Switch user
USER docker