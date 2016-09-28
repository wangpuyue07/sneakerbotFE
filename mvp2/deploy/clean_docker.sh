#!/bin/bash
#MAC VERSION

# remove exited containers:
docker ps --filter status=dead --filter status=exited -aq | xargs docker rm -v

# remove unused images:
docker images --no-trunc | grep '<none>' | awk '{ print $3 }' | xargs docker rmi
