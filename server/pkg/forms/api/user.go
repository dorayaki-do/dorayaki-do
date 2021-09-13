package api

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type User struct {
	gorm.Model
	Email    string `json:"username" binding:"required" gorm:"unique;not null"`
	Password string `json:"password" binding:"required"`
	Nickname string `json:"name" binding:"required"`
}
