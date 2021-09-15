package models

import (
	"github.com/dorayaki-do/dorayaki-do/pkg/models"
	"github.com/dorayaki-do/dorayaki-do/pkg/repository"
)

func GetBookByBookID(id string) (models.Book, error) {
	var b models.Book

	if err := repository.DB.Where("id = ?", id).Find(&b).Error; err != nil {
		return b, err
	}
	return b, nil
}

func GetEpubUrlByBookID(nickname interface{}, bookId string) (string, error) {
	type epubUrl struct {
		Epuburl string
	}
	var url epubUrl
	if err := repository.DB.
		Table("my_book").Select("books.epuburl").
		Joins("inner join books on my_book.book_id = books.id").
		Joins("inner join users on my_book.user_id = users.id").
		Where("books.id = ? and users.nickname = ?", bookId, nickname.(string)).First(&url).Error; err != nil {
		return url.Epuburl, nil
	}
	return url.Epuburl, nil
}

func GetBookByEventID(bookId string) ([]models.Book, error) {
	var books []models.Book
	if err := repository.DB.Model(&models.Book{}).
		Where("event_id = ?", bookId).Find(&books).Error; err != nil {
		return nil, err
	}
	return books, nil
}

func GetBookByUserID(nickname interface{}, bookId uint) (models.ReturnBook, error) {
	var b models.ReturnBook
	if err := repository.DB.
		Table("my_book").Select("books.title").
		Joins("inner join books on my_book.book_id = books.id").
		Joins("inner join users on my_book.user_id = users.id").
		Where("books.id = ? and users.nickname = ?", bookId, nickname.(string)).First(&b).Error; err != nil {
		return b, nil
	}
	return b, nil
}
