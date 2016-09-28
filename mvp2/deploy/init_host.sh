#!/usr/bin/env bash

# COPY COMPOSE FILE
cat ./docker-compose.yml | ssh coreos@seekstock.nz "cat > docker-compose.yml"
#cat node.env | ssh coreos@test.seekstock.nz "cat > node.env"
#cat mysql.env | ssh coreos@test.seekstock.nz "cat > mysql.env"

ssh coreos@test.seekstock .nz <<'ENDSSH'
# INSTALL COMPOSE
sudo mkdir -p /opt/bin
sudo mkdir -p /data/mysql
sudo curl -L `curl -s https://api.github.com/repos/docker/compose/releases/latest | jq -r '.assets[].browser_download_url | select(contains("Linux") and contains("x86_64"))'` > /opt/bin/docker-compose
sudo chmod +x /opt/bin/docker-compose
ENDSSH

echo "UPDATED HOST"

