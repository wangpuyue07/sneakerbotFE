#!/usr/bin/env bash
echo "build"
docker build --rm=true --disable-content-trust -t seekstock/web:latest .
echo "push"
docker push seekstock/web:latest
ssh coreos@test.seekstock.nz "sudo docker pull --disable-content-trust seekstock/web:latest && sudo docker-compose up -d"
#ssh coreos@worldbrand.seekstock.nz "sudo docker pull --disable-content-trust seekstock/web:latest && sudo docker-compose up -d"
#ssh coreos@glassons.seekstock.nz "sudo docker pull --disable-content-trust seekstock/web:latest && sudo docker-compose up -d"