# Creates a layer from node:alpine image.
FROM node:lts-alpine

# Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD commands
COPY package*.json ./
RUN npm install

WORKDIR /usr/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH="/usr/app/node_modules/.bin:${PATH}"

# Informs container runtime that the container listens on the specified network ports at runtime
EXPOSE 3000
