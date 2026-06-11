FROM jenkins/jenkins:lts

USER root

RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    docker.io

RUN usermod -aG docker jenkins

EXPOSE 8080
EXPOSE 50000