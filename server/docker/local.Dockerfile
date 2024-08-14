# Creates a layer from node:alpine image.
FROM node:lts-alpine

# Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD commands
WORKDIR /usr/app

COPY package*.json ./
RUN npm install

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH="/usr/app/node_modules/.bin:${PATH}"

COPY entrypoint.sh /entrypoint.sh

# Export necessary port
EXPOSE 8000
