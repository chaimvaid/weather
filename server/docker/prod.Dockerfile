FROM node:lts-alpine as builder

WORKDIR /usr/app

ENV PATH="/usr/app/node_modules/.bin:${PATH}"
ADD . /usr/app
RUN npm i
CMD node_modules/.bin/sequelize db:migrate && node permissions-parser/run.js && node server.js

EXPOSE 8000
