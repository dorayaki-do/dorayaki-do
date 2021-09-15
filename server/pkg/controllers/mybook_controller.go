package controllers

import (
	"net/http"
	"strconv"

	models "github.com/dorayaki-do/dorayaki-do/pkg/models/repository"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
)

func GetUint(c *gin.Context, key string) (uint, error) {
    i, err := strconv.Atoi(c.PostForm(key))
    return uint(i), err
}

func RegisterMyBook(c *gin.Context) {
	session := sessions.Default(c)
	nickname := session.Get("user")

	userID, err := models.GetUserIDByNickname(nickname)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to add book by userID"})
		return
	}

	type JsonRequest struct {
		BookID uint `json:"bookid"`
	}
	var json JsonRequest
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to add book by bookID"})
		return
	}
	
	err = models.PrepareMyBook(userID, json.BookID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record Not Found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"userid": userID, "bookid": json.BookID})
}