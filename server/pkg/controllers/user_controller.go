package controllers

import (
	"log"
	"net/http"

	"github.com/dorayaki-do/dorayaki-do/pkg/repository"
	"github.com/gin-gonic/contrib/sessions"
	"golang.org/x/crypto/bcrypt"

	"github.com/dorayaki-do/dorayaki-do/pkg/forms/api"
	"github.com/dorayaki-do/dorayaki-do/pkg/models"
	repo "github.com/dorayaki-do/dorayaki-do/pkg/models/repository"
	"github.com/gin-gonic/gin"
)

const (
	userKey = "user"
)

func SignUp(c *gin.Context) {
	session := sessions.Default(c)
	var request api.User

	err := c.BindJSON(&request)
	if err != nil {
		// c.Status(http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad Request"})
		return
	}

	var passHashed []byte
	passHashed, err = bcrypt.GenerateFromPassword([]byte(request.Password), 0)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to hashing password"})
		return
	}
	user := api.UserPasswordHashed{
		Nickname: request.Nickname,
		Password: passHashed,
		Email:    request.Email,
	}
	err = repo.CreateUser(user)
	if err != nil {
		// c.Status(http.StatusBadRequest)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to save session"})
		return
	}

	session.Set(userKey, request.Nickname) // In real world usage you'd set this to the users ID
	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save session"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Successfully authenticated user"})
}

func Login(c *gin.Context) {
	session := sessions.Default(c)

	var request api.User
	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Parameters can't be empty"})
		return
	}

	tx := repository.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	var user models.User
	if err := tx.Table("users").Where(map[string]interface{}{"nickname": request.Nickname}).First(&user).Error; err != nil {
		tx.Rollback()
		log.Println(err)
		c.JSON(http.StatusBadRequest, map[string]interface{}{"detail": "ユーザ名またはパスワードが違います"})
		return
	}
	// Check for username and password match, usually from a database
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(request.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "ユーザ名またはパスワードが違います"})
		return
	}

	// Save the username in the session
	session.Set(userKey, request.Nickname) // In real world usage you'd set this to the users ID
	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save session"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Successfully authenticated user"})
}

// 確認できてないが、理論上はいけるはずです
func Logout(c *gin.Context) {
	session := sessions.Default(c)
	user := session.Get(userKey)
	if user == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid session token"})
		return
	}
	session.Delete(userKey)
	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save session"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Successfully logged out"})
}

// ユーザーが持っている本を全て返すAPI
func GetUserBook(c *gin.Context) {
	uid := c.Param("id")

	user, err := repo.GetBooksByID(uid)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad Request"})
	}

	response := user.Books

	c.JSON(http.StatusOK, response)
}
