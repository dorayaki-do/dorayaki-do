package api

import (
	"time"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type User struct {
	gorm.Model
	Email    string `json:"email" gorm:"unique;not null"`
	Password string `json:"password" binding:"required"`
	Nickname string `json:"nickname" binding:"required"`
}

type UserPasswordHashed struct {
	gorm.Model
	Email    string `json:"email" binding:"required" gorm:"unique;not null"`
	Password []byte `json:"password" binding:"required"`
	Nickname string `json:"nickname" binding:"required"`
}

type UserHaveBook struct {
	ID           uint
	Title        string
	Thumbnailurl string
}

type UserPartEvent struct {
	ID          uint
	Title       string
	Description string
	Latitude    string
	Longitude   string
	StartAt     *time.Time
	EndAt       *time.Time
}
