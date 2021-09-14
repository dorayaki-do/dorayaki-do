package controllers

import (
	"log"
	"net/http"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/dorayaki-do/dorayaki-do/pkg/forms/api"
	models "github.com/dorayaki-do/dorayaki-do/pkg/models/repository"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
)

func GetBook(c *gin.Context) {
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

func GetEpubUrl(c *gin.Context) {
	id := c.Param("id")
	userSess := sessions.Default(c)
	nickname := userSess.Get("user")

	epubKey, err := models.GetEpubUrlByBookID(nickname, id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record Not Found"})
		return
	}
	sess, err := session.NewSession()
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "AWS Session error"})
		return
	}

	svc := s3.New(sess)
	req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
		Bucket: aws.String("dorayaki-do-epub"),
		Key:    aws.String(epubKey),
	})
	urlStr, err := req.Presign(5 * time.Minute)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Pre-signed url cannot create"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"epub_url": urlStr})
}
