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

	book1 := models.Book{
		Title:        "テスト1",
		Author:       "テストユーザー1",
		Eventname:    "テストイベント1",
		Epuburl:      "test1",
		Thumbnailurl: "test1",
	}

	book2 := models.Book{
		Title:        "テスト2",
		Author:       "テストユーザー2",
		Eventname:    "テストイベント2",
		Epuburl:      "test2",
		Thumbnailurl: "test2",
	}

	user1 := models.User{
		Email:    "test1@example.com",
		Password: password,
		Nickname: "aoki",
		Books:    []models.Book{book1},
	}

	user2 := models.User{
		Email:    "test2@example.com",
		Password: password,
		Nickname: "hanako",
		Books:    []models.Book{book1, book2},
	}

	db.Create(&user1)
	db.Create(&user2)
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
