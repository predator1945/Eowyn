#!/bin/bash

docker rm   nodeapp  --force

docker run -p 8081:8081 --network eowyn-net --name nodeapp -d nodeapp

docker logs -t -f nodeapp


