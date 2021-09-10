package repository

import (
	"fmt"
	"time"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type DBClient struct {
	Conn *gorm.DB
}

func NewDBClient(user, password, host string, port int, dbName string) *DBClient {
	gorm.NowFunc = func() time.Time {
		return time.Now().Truncate(time.Second)
	}

	conn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True", user, password, host, port, dbName)
	db, err := gorm.Open("mysql", conn)

	if err != nil {
		panic(err)
	}

	return &DBClient{
		Conn: db,
	}
}
