package server

import (
	"github.com/dorayaki-do/dorayaki-do/pkg/route"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
	"net/http"
)

const (
	userKey = "user"
)

// Init is initialize server
func Init() {
	r := gin.New()

	store := sessions.NewCookieStore([]byte("secret"))
	r.Use(sessions.Sessions("user", store))

	router := r.Group("")
	route.SetUpRouter(router)
	auth := r.Group("", AuthRequired)
	route.SetUpAuthRouter(auth)

	r.Run(":8080")
}

// AuthRequired is a simple middleware to check the session
func AuthRequired(c *gin.Context) {
	session := sessions.Default(c)
	user := session.Get(userKey)
	if user == nil {
		// Abort the request with the appropriate error code
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}
	// Continue down the chain to handler etc
	c.Next()
}

// login is a handler that parses a form and checks for specific data
