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
	rBook := r.Group("/book")
	{
		rBook.GET("/:id", controllers.Show)
	}
}
