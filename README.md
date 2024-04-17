# Introduction

This project use docker and traefik. You can run this project without docker but the documentation is focused on docker installation.

# Installation with docker

## Requirements

You need to install docker and have a traefik installed as reverse proxy.
First install docker:
```
yay docker
```

You can find more information about treafik here : https://www.digitalocean.com/community/tutorials/how-to-use-traefik-v2-as-a-reverse-proxy-for-docker-containers-on-ubuntu-20-04

## Get the projet and set configurations files

Get the projet:
```
mkdir bieristo
cd bieristo
git clone git@github.com:madef/bieristo-front.git
cd bieristo-front
```

Copy sample files:
```
cp docker/docker-compose.override.yml.sample docker/docker-compose.override.yml
cp docker/env/development.sample docker/env/development
```

Edit environments files:
```
vim docker/docker-compose.override.yml
vim docker/env/development
```

## Start container
Start the containers:
```
make start
```


## Check installation

Check installation is ok, by loading the url https://bieristo.local.
