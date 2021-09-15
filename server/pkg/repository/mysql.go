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
	db.AutoMigrate(&models.Event{})
	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.Book{})
	db.AutoMigrate(&models.Event{})
}

func Seed(db *gorm.DB) {
	password, _ := bcrypt.GenerateFromPassword([]byte("password"), 0)

	book1 := models.Book{
		Title:        "テスト1",
		Author:       "テストユーザー1",
		Epuburl:      "test1",
		Thumbnailurl: "test1",
		EventID:      1,
		Latitude:    "35.69112748139285",
		Longitude:   "139.75755883982063",
	}

	book2 := models.Book{
		Title:        "テスト2",
		Author:       "テストユーザー2",
		Epuburl:      "test2",
		Thumbnailurl: "test2",
		Latitude:     "0",
		Longitude:    "0",
	}

	book3 := models.Book{
		Title:        "テスト3",
		Author:       "テストユーザー3",
		Epuburl:      "test3",
		Thumbnailurl: "test3",
		Latitude:     "0",
		Longitude:    "0",
	}

	user1 := models.User{
		Email:    "test1@example.com",
		Password: password,
		Nickname: "aoki",
		// Books:    []models.Book{book1, book2, book3},
	}

	user2 := models.User{
		Email:    "test2@example.com",
		Password: password,
		Nickname: "hanako",
		// Books:    []models.Book{book1, book2},
	}

	event1 := models.Event{
		Title:       "testevent",
		Description: "testdescription",
		Latitude:    "35.69112748139285",
		Longitude:   "139.75755883982063",
		Book:        []models.Book{book1},
	}

	event2 := models.Event{
		Title:       "testevent2",
		Description: "testdescription2",
		Latitude:    "0",
		Longitude:   "0",
		Book:        []models.Book{book2,book3},
	}

	db.Create(&event1)
	db.Create(&event2)
	// db.Create(&book1)
	// db.Create(&book2)
	// db.Create(&book3)
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
