package repository

import (
	"fmt"
	"time"

	"golang.org/x/crypto/bcrypt"

	"github.com/dorayaki-do/dorayaki-do/pkg/models"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var DB *gorm.DB

func GetDB() *gorm.DB {
	return DB
}

func autoMigration(db *gorm.DB) {
	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.Book{})
}

func Seed(db *gorm.DB) {
	password, _ := bcrypt.GenerateFromPassword([]byte("password"), 2048)
	user := models.User{
		Email:    "test@example.com",
		Password: password,
		Nickname: "aoki",
	}

	book := models.Book{
		Title:        "テスト1",
		Author:       "テストユーザー1",
		Eventname:    "テストイベント1",
		Epuburl:      "test",
		Thumbnailurl: "test",
	}

	db.Create(&user)
	db.Create(&book)
}

func NewDBClient(user, password, host string, port int, dbName string) *gorm.DB {
	gorm.NowFunc = func() time.Time {
		return time.Now().Truncate(time.Second)
	}

	conn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True", user, password, host, port, dbName)
	database, err := gorm.Open("mysql", conn)

	DB = database

	if err != nil {
		panic(err)
	}

	autoMigration(DB)
	Seed(DB)

	return DB
}
