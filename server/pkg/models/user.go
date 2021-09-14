package models

import (
	"time"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

// User is user models property
type User struct {
	ID        uint `json:"id" gorm:"primary_key"`
	CreatedAt time.Time
	UpdatedAt time.Time
	Email     string `json:"email" binding:"required" gorm:"unique;not null"`
	Password  []byte `json:"password" binding:"required"`
	Nickname  string `json:"nickname" binding:"required"`
	Books     []Book `gorm:"many2many:my_book" json:"book"`
}
