FROM jenkins/inbound-agent:alpine-jdk-17

USER root

RUN apk add --no-cache \
    bash \
    git \
    curl \
    jq \
    docker \
    nodejs \
    npm

RUN npm install -g \
    eslint \
    jest \
    supertest

RUN addgroup -S docker && adduser jenkins docker

USER jenkins
