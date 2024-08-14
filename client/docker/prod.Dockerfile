FROM node:latest as builder

WORKDIR /usr/app
ARG APP_VERSION

ENV PATH="/usr/app/node_modules/.bin:${PATH}"
ENV REACT_APP_GOOGLE_REDIRECT_URI=https://app.microkit.net/api/users/auth/google/callback
ENV REACT_APP_SENTRY_URL=https://9497b84f97a2441e8a646587bb417ab5@o1405792.ingest.sentry.io/6739180
ENV REACT_APP_SMARTLOOK_TOKEN=5570542f3713caff23cae6270206c56bdd1236fe
ENV REACT_APP_ITEM_TYPES="['string','number','boolean']"
ENV REACT_APP_OPERATORS_LIST='{"number":["equals","not equal","greater than","less than","greater than or equals","less than or equals"],"string":["is","is not","contains","does not contain"],"boolean":["is"]}'
ENV REACT_APP_TARGET_GROUP_TYPES='[{"name":"Rule Base","value":1},{"name":"Switch Board","value":2}]'
ENV REACT_APP_DEFAULT_ENVIRONMENT_DATA="[{\"name\":\"Development\",\"key\":\"development\",\"type\":1,\"description\":\"\",\"position\": 2,\"color\":\"\#9EE86A\"},{\"name\":\"Staging\", \"key\":\"staging\", \"type\":3,\"description\":\"\",\"position\": 2,\"color\":\"\#0E44F0\"},{\"name\":\"Production\",\"key\":\"production\",\"type\":4,\"description\":\"\",\"position\": 3, \"color\":\"\#EF2FA2\"}]"
ENV REACT_APP_PLANS="[     {         \"key\": \"pro_yearly\",         \"name\": \"Pro Yearly\",         \"provider_plan_id\": \"39986\",         \"users\": 25,         \"project\": 10000,         \"mau\": 10,         \"max_mau\": 300,         \"environment\": 10000,         \"price\": 25     },     {         \"key\": \"pro_monthly\",         \"name\": \"Pro Monthly\",         \"provider_plan_id\": \"39947\",         \"users\": 25,         \"project\": 10000,         \"mau\": 10,         \"max_mau\": 300,         \"environment\": 10000,         \"price\": 30     },     {         \"key\": \"basic_yearly\",         \"name\": \"Basic Yearly\",         \"provider_plan_id\": \"39985\",         \"users\": 3,         \"project\": 2,         \"mau\": 1,         \"max_mau\": 10,         \"environment\": 5,         \"price\": 8     },     {         \"key\": \"basic_monthly\",         \"name\": \"Basic Monthly\",         \"provider_plan_id\": \"39816\",         \"users\": 3,         \"project\": 2,         \"mau\": 1,         \"max_mau\": 10,         \"environment\": 5,         \"price\": 10     } ]"
ENV REACT_APP_ENV_TYPES='[{"name":"Development","value":"1"},{"name":"Testing","value":"2"},{"name":"Staging","value":"3"},{"name":"Production","value":"4"}]'
ENV REACT_APP_APP_VERSION=$APP_VERSION

ADD . /usr/app
RUN npm i
RUN npm run build

FROM nginx:alpine
# copy nginx.conf
COPY ./docker/customers-app.nginx.conf /etc/nginx/conf.d/customers-app.conf
# static files for the web
RUN mkdir -p /var/www/frontend/customers-app

ENV SERVER_HOST_NAME=server
ENV SERVER_PORT=8000
ENV CLIENT_PORT=80

COPY --from=builder /usr/app/build /var/www/frontend/customers-app


EXPOSE 80
