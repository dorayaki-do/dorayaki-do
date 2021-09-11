GOCMD=go
GOBUILD=$(GOCMD) build -a -trimpath

.PHONY: loc
loc:
	docker-compose up --build

.PHONY: build
	docker-compose build

.PHONY: migrate-force
migrate-force:
	docker run \
		-v $(PWD)/build/mysql/migrations:/migrations \
		--network host migrate/migrate \
		-path=/migrations/ \
		-database "mysql://dorayaki:password@tcp(localhost:3306)/dorayaki" \
		force $(version)

.PHONY: migrate-local
migrate-local:
	docker run \
		-v $(PWD)/build/mysql/migrations:/migrations \
		--network host migrate/migrate \
		-path=/migrations/ \
		-database "mysql://dorayaki:password@tcp(localhost:3306)/dorayaki" \
		up

.PHONY: migrate-down-local
migrate-down-local:
	docker run \
		-v $(PWD)/build/mysql/migrations:/migrations \
		--network host migrate/migrate \
		-path=/migrations/ \
		-database "mysql://dorayaki:password@tcp(localhost:3306)/dorayaki" \
		down 1

.PHONY: create-migration-file
create-migration-file:
	docker run -v $(PWD)/build/mysql/migrations:/migrations  migrate/migrate create --ext sql -dir /migrations $(name)
