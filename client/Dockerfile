# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:18.7.0 as build-stage

ARG service
ARG env

WORKDIR /app
COPY package*.json ./
RUN npm install 


RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.23.3
RUN apt update && apt install -y nginx-extras libnginx-mod-http-headers-more-filter
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/