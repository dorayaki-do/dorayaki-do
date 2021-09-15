package server

import (
	"github.com/gin-contrib/cors"
	"net/http"
	"time"

	"github.com/dorayaki-do/dorayaki-do/pkg/route"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
)

const (
	userKey = "user"
)

// Init is initialize server
func Init() {
	r := gin.New()

	store := sessions.NewCookieStore([]byte("secret"))
	corsConfig := cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "DELETE", "PATCH", "PUT"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		AllowCredentials: false,
		MaxAge:           12 * time.Hour,
	}

	r.Use(cors.New(corsConfig))
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
	session.Set("user", "aoki")
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
