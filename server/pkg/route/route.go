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
	rGetBook := r.Group("/user")
	{
		rGetBook.GET("/me/books", controllers.GetMyBooks)
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
