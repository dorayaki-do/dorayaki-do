package models

import (
	"github.com/dorayaki-do/dorayaki-do/pkg/models"
	"github.com/dorayaki-do/dorayaki-do/pkg/repository"
)

func PrepareMyBook(userid uint, bookid uint) error {
	db := repository.GetDB()

	var user models.User
	user.ID = userid

	var book models.Book
	book.ID = bookid

	err := db.Model(&user).Association("Books").Append(&book).Error
	return err
}

func GetUserIDByNickname(nickname interface{}) (uint, error) {
	var user models.User
	user.Nickname = nickname.(string)

	if err := repository.DB.Table("users").First(&user).Error; err != nil {
		return user.ID, err
	}
	return user.ID, nil
}