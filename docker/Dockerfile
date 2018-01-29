FROM node:9.3.0-alpine
MAINTAINER Nattawin
RUN apk add --no-cache bash libzmq libc6-compat
EXPOSE 8080
COPY server.js .
CMD node server.js
