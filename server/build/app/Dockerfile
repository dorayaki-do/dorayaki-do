FROM golang:1.17-alpine AS builder

ENV CGO_ENABLED 0
ENV GOOS linux
ENV GOARCH amd64

RUN apk update && \
	apk add --no-cache git mysql-client && \
	go get github.com/cosmtrek/air

WORKDIR /build
COPY go.mod go.sum /build/
RUN go mod download

COPY pkg /build/pkg
COPY build/app/start.sh .air.toml /build/

RUN go build -a -trimpath -o /usr/local/bin/app /build/pkg/main.go

FROM alpine:3.12
COPY --from=builder /usr/local/bin/app /usr/local/bin/app

ENTRYPOINT [ "/usr/local/bin/app" ]
