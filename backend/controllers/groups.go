package controllers

import (
	"net/http"
	"github.com/julienschmidt/httprouter"
	"fmt"
)

type  GroupController struct{

}

func NewGroupController() (*GroupController) {
	return &GroupController{}
}

func(gc GroupController)GetGroups(res http.ResponseWriter,req *http.Request,p httprouter.Params){

	fmt.Println("Hello it's me!")
}

func (gc GroupController)GetGroupParticipants(res http.ResponseWriter,req *http.Request,p httprouter.Params){
	/*to be done*/
}

func(gc GroupController)UserAllGroup(res http.ResponseWriter,req *http.Request, p httprouter.Params){

}

func(gc GroupController)UserAllGroupActivity(res http.ResponseWriter,req *http.Request, p httprouter.Params){

}


