#!/bin/ash

echo "Waiting for mysql..."
until mysqladmin ping -h db --silent; do
	sleep 1
done

# air
go run pkg/main.go