package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// User is user models property
type User struct {
	gorm.Model
	Email    string `json:"email" binding:"required" gorm:"unique;not null"`
	Password []byte `json:"password" binding:"required"`
	Nickname string `json:"nickname" binding:"required"`
}
