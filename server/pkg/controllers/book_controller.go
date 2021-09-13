package controllers

import (
	"net/http"

	"github.com/dorayaki-do/dorayaki-do/pkg/forms/api"
	models "github.com/dorayaki-do/dorayaki-do/pkg/models/repository"
	"github.com/gin-gonic/gin"
)

func Show(c *gin.Context) {
	id := c.Param("id")
	book, err := models.GetBookByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record Not Found"})
		return
	}
	response := &api.ResponseBook{
		Title:        book.Title,
		Thumbnailurl: book.Thumbnailurl,
	}
	c.JSON(http.StatusOK, response)
}
