package main

import (
	"github.com/julienschmidt/httprouter"
	"fmt"
	"./controllers"
	"log"
	"net/http"
)

func main(){
	gc:=controllers.NewGroupController()

	router:=httprouter.New()

	router.GET("/alldata/",gc.GetAllData) //completed

	router.GET("/groups/",gc.GetAllGroups)//completed
	router.GET("/groups/groupinfo/:groupId/participants/",gc.GetGroupParticipants) //completed
	router.GET("/groups/userinfo/:userId/groups",gc.GetGroupByUser) //completed

	router.POST("/user",gc.AddUser) //completed

//	router.GET("/activity/:userId/groups/",gc.UserAllGroupActivity) to be done

	fmt.Println("Server is running!")
	log.Fatal(http.ListenAndServe(":8080",router))

}

