package models

import (
	"github.com/dorayaki-do/dorayaki-do/pkg/forms/api"
	"github.com/dorayaki-do/dorayaki-do/pkg/models"
	"github.com/dorayaki-do/dorayaki-do/pkg/repository"
)

func GetUser(user api.User) ([]models.User, error) {
	db := repository.GetDB()

	var u []models.User

	if err := db.Where("name = ?", user.Nickname).Find(&u).Error; err != nil {
		return nil, err
	}
	return u, nil
}

func CreateUser(user api.UserPasswordHashed) error {
	db := repository.GetDB()

	err := db.Create(&models.User{Email: user.Email, Password: user.Password, Nickname: user.Nickname}).Error

	return err
}
