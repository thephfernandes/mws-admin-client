# Dockerfile
FROM node:12.19.0-alpine3.9 as build

ARG BASE_URL=http://localhost:7071/api
ARG HOST_KEY=sometoken
# create destination directory
RUN mkdir -p /usr/src/admin-portal-app
WORKDIR /usr/src/admin-portal-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/admin-portal-app/

ENV NUXT_ENV_API_URL=${BASE_URL}
ENV NUXT_ENV_X_FUNCTIONS_KEY=${HOST_KEY}

RUN yarn install
RUN yarn generate


FROM nginx:stable-alpine

WORKDIR /app/
COPY --from=build /usr/src/admin-portal-app/dist/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
