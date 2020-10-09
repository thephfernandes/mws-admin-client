# Dockerfile
FROM node:12.19.0-alpine3.9

# create destination directory
RUN mkdir -p /usr/src/admin-portal-app
WORKDIR /usr/src/admin-portal-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/admin-portal-app/
RUN npm install
RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "start" ]
