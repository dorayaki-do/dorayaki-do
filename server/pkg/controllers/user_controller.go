package controllers

import (
	"fmt"
	"net/http"

	"github.com/dorayaki-do/dorayaki-do/pkg/forms/api"
	models "github.com/dorayaki-do/dorayaki-do/pkg/models/repository"
	"github.com/gin-gonic/gin"
)

type UserController struct{}

func (pc UserController) Index(c *gin.Context) {
	var u api.User
	u.Nickname = c.Query("name")

	response, err := models.Get(u)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	c.JSON(200, response)
}

func (pc UserController) Create(c *gin.Context) {
	var request api.User

	err := c.BindJSON(&request)
	if err != nil {
		c.Status(http.StatusBadRequest)
	}

	err = models.Create(request)
	if err != nil {
		c.Status(http.StatusBadRequest)
	}
	c.JSON(200, "success")
}
