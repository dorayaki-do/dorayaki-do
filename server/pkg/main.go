package main

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/dorayaki-do/dorayaki-do/pkg/repository"
	"github.com/dorayaki-do/dorayaki-do/pkg/server"
	_ "github.com/jinzhu/gorm/dialects/mysql"

	"github.com/kelseyhightower/envconfig"
)

type DataBaseInfo struct {
	Engine   string `json:"engine"`
	Host     string `json:"host"`
	Port     int    `json:"port"`
	DBName   string `json:"dbname"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type Env struct {
	DBInfo string `envconfig:"DB_INFO" required:"true"`
}

func unmarshalDBInfo(s string) DataBaseInfo {
	var db DataBaseInfo
	if err := json.Unmarshal([]byte(s), &db); err != nil {
		panic(err)
	}

	return db
}

func main() {
	fmt.Println("Hello, Golang!")
	var env Env
	if err := envconfig.Process("", &env); err != nil {
		log.Println(err)
	}

	dbInfo := unmarshalDBInfo(env.DBInfo)
	db := repository.NewDBClient(dbInfo.Username, dbInfo.Password, dbInfo.Host, dbInfo.Port, dbInfo.DBName)
	server.Init()
	defer db.Close()
}
