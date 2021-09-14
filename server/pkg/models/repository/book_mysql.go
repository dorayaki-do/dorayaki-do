package models

import (
	"github.com/dorayaki-do/dorayaki-do/pkg/models"
	"github.com/dorayaki-do/dorayaki-do/pkg/repository"
)

func GetBookByID(id string) (models.Book, error) {
	var b models.Book

	if err := repository.DB.Where("id = ?", id).Find(&b).Error; err != nil {
		return b, err
	}
	return b, nil
}
