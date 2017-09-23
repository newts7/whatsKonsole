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
	router.GET("/groups/",gc.GetGroups)
	router.GET("/groups/groupinfo/:groupId/participants/",gc.GetGroupParticipants)
	router.GET("/groups/userinfo/:userId/",gc.UserAllGroup)


//	router.GET("/activity/:userId/groups/",gc.UserAllGroupActivity)

	fmt.Println("Server is running!")
	log.Fatal(http.ListenAndServe(":8080",router))

}

