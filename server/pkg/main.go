package main

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/dorayaki-do/dorayaki-do/pkg/repository"

	"github.com/kelseyhightower/envconfig"

	"github.com/gin-gonic/gin"
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

	r := gin.New()

	r.GET("", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "This is Dorayaki API."})
	})

	db := repository.NewDBClient(dbInfo.Username, dbInfo.Password, dbInfo.Host, dbInfo.Port, dbInfo.DBName)
	defer db.Conn.Close()

	log.Println(r.Run(":8080"))
}
