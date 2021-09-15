package route

import (
	"github.com/dorayaki-do/dorayaki-do/pkg/controllers"
	"github.com/gin-gonic/gin"
)

func SetUpAuthRouter(r *gin.RouterGroup) {
	rLogout := r.Group("/logout")
	{
		rLogout.POST("", controllers.Logout)
	}
	rUser := r.Group("/users/me")
	{
		rUser.GET("/books", controllers.GetMyBooks)
		rUser.GET("/books/:id", controllers.GetBook)
		rUser.GET("/books/:id/epub", controllers.GetEpubUrl)
		rUser.POST("/books", controllers.RegisterMyBook)
	}
}

func SetUpRouter(r *gin.RouterGroup) {
	rSignup := r.Group("/signup")
	{
		rSignup.POST("", controllers.SignUp)
	}
	rLogin := r.Group("/login")
	{
		rLogin.POST("", controllers.Login)
	}
}
