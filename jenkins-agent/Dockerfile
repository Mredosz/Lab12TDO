FROM jenkins/agent

USER root

RUN apt-get update && \
    apt-get install -y \
    bash \
    git \
    curl \
    jq \
    docker.io \
    nodejs \
    npm \
    && \
    apt-get clean

RUN npm install -g \
    eslint \
    jest \
    supertest

USER jenkins
