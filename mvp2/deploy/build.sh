#!/usr/bin/env bash

# BUILD SCRIPT
cd ..
git fetch --all
git reset --hard origin/master
revision=$(git log --oneline -1)
echo ${revision}
sed -i -- "s/\[ssRevision\]/${revision}/g" ./client/index.html
echo "BUILDING IMAGE"
gulp
docker build --rm=true --disable-content-trust -t seekstock/web:latest .  #SPECIFY DOCKER REPO

cd deploy/test
docker-compose up -d

echo "UNIT TESTING"
docker exec test_node_1 mocha app/test/unit/**.*

echo "PUSHING IMAGE"
docker push seekstock/web:latest #DOCKER REPO

echo "DEPLOYING"
echo "COPY NEW COMPOSE FILE"
cat ./docker-compose.yml | ssh coreos@test.seekstock.nz "cat > docker-compose.yml"
#SPECIFY PATH TO COMPOSE FILE AND HOST
#SSH KEY

#OPEN REMOTE SHELL SESSION
echo "Updating remote image and restarting docker-compose"
ssh coreos@test.seekstock.nz "sudo docker pull --disable-content-trust seekstock/web:latest && sudo docker-compose up -d"
echo "DEPLOYED" && echo ${revision}
echo "CLEANING UP"
#ssh coreos@test.seekstock.nz "sudo docker rmi -f $(sudo docker images --filter "dangling=true" -q --no-trunc)"