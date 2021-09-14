package models

import (
	"time"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type Event struct {
	gorm.Model
	Title       string     `json:"title" binding:"required"`
	Description string     `json:"description" binding:"required"`
	Latitude    string     `json:"latitude"`
	Longitude   string     `json:"longitude"`
	StartAt     *time.Time `json:"start_at"`
	EndAt       *time.Time `json:"end_at"`
	Book        []Book
}
