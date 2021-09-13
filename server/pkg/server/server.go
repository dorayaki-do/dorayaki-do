package server

import (
	"github.com/dorayaki-do/dorayaki-do/pkg/controllers"
	"github.com/gin-gonic/gin"
)

// Init is initialize server
func Init() {
	r := router()
	r.Run(":8080")
}

func router() *gin.Engine {
	r := gin.Default()

	u := r.Group("/users")
	{
		ctrl := controllers.UserController{}
		u.GET("", ctrl.Index)
		u.POST("", ctrl.Create)
	}
	return r
}
