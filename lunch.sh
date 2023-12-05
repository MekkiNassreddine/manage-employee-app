#!/bin/bash
clear
echo "========== Clean up Docker resources =========="
docker-compose -f ${PWD}/docker-compose-mysql.yaml down --remove-orphans
docker-compose -f ${PWD}/docker-compose.yaml down --remove-orphans

echo "========== Start MySQL container =========="
docker-compose -f ${PWD}/docker-compose-mysql.yaml up -d

sleep 5
echo ""
echo ""
docker ps -a
echo ""
echo ""
echo "========== Start MySQL container =========="
# Wait for MySQL container to be ready

while ! docker exec db mysqladmin ping -hlocalhost --silent -uroot -proot; do
    echo "Waiting for MySQL to be ready..."
    sleep 2
done

echo ""
# Create databases and tables
#./create-employee-db.sh
echo ""
./create-dbs-tables.sh

echo ""
echo ""
echo "========== Start microservices containers =========="
docker-compose -f ${PWD}/docker-compose.yaml up --build

docker-compose -f ${PWD}/docker-compose-mysql.yaml down --remove-orphans
docker-compose -f ${PWD}/docker-compose.yaml down --remove-orphans



