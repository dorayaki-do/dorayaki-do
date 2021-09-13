package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type Book struct {
	gorm.Model
	Title        string `json:"title" binding:"required"`
	Author       string `json:"author" binding:"required"`
	Eventname    string `json:"eventname" binding:"required"`
	Epuburl      string `json:"epuburl" binding:"required"`
	Thumbnailurl string `json:"thumbnail" binding:"required"`
	Latitude     string `json:"latitude"`
	Longitude    string `json:"longitude"`
	Shopname     string `json:"shopname"`
	Users        []User `gorm:"many2many:my_book" json:"user"`
}
