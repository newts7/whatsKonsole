package controllers

import (
	"net/http"
	"github.com/julienschmidt/httprouter"
	"fmt"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"../models"

	"encoding/json"
)

type  GroupController struct{

}

func NewGroupController() (*GroupController) {
	return &GroupController{}
}

func (gc GroupController)AddUser(res http.ResponseWriter,req *http.Request,p httprouter.Params){
	db, err := sql.Open("mysql", "root:hello123@/whatsKonsole?charset=utf8")
	if err!=nil{
		log.Fatal(err)
	}
	u:=models.User{}
	fmt.Println("HELLO")
	fmt.Println(req.Body)
	json.NewDecoder(req.Body).Decode(&u)
	fmt.Println(req.Body)
	fmt.Println(u)
	stmt, err := db.Prepare("INSERT IGNORE into users (userId,groupId,groupName) VALUES(?,?,?)")
	result, err := stmt.Exec(u.UserId,u.GroupId,u.GroupName)
	if err!=nil{
		fmt.Println(err)
	}
	fmt.Println(result)
defer  db.Close()
}



func(gc GroupController)GetAllData(res http.ResponseWriter,req *http.Request,p httprouter.Params){
	db, err := sql.Open("mysql", "root:hello123@/whatsKonsole?charset=utf8")
	if err!=nil{
		log.Fatal(err)
	}
	rows, err := db.Query("SELECT * FROM users")
	ures:=make([]models.User,0)
	u:=models.User{}
	for rows.Next(){
		var userId string
		var groupId string
		var groupName string
		err = rows.Scan(&userId, &groupId,&groupName)
		if err!=nil{
			log.Fatal(err)
		}

		u.UserId=userId
		u.GroupId=groupId
		u.GroupName=groupName
		ures=append(ures, u)
	}

	uj,err:=json.Marshal(ures)
	if err!=nil{
		log.Fatalln(err)
	}
	res.Header().Set("Content-Type", "application/json")
	res.WriteHeader(http.StatusOK)
	fmt.Fprintln(res,string(uj))
	defer db.Close()

fmt.Println("hello")
}

func(gc GroupController)GetAllGroups(res http.ResponseWriter,req *http.Request,p httprouter.Params){

	db, err := sql.Open("mysql", "root:hello123@/whatsKonsole?charset=utf8")
	if err!=nil{
		log.Fatal(err)
	}
	rows, err := db.Query("SELECT DISTINCT groupId,groupName from users")
	ures:=make([]models.Group,0)
	u:=models.Group{}
	for rows.Next(){
		var groupId string
		var groupName string
		err = rows.Scan(&groupId,&groupName)
		if err!=nil{
			log.Fatal(err)
		}

		u.GroupId=groupId
		u.GroupName=groupName
		ures=append(ures, u)
	}

	uj,err:=json.Marshal(ures)
	if err!=nil{
		log.Fatalln(err)
	}
	res.Header().Set("Content-Type", "application/json")
	res.WriteHeader(http.StatusOK)
	fmt.Fprintln(res,string(uj))
	defer db.Close()


}



func (gc GroupController)GetGroupParticipants(res http.ResponseWriter,req *http.Request,p httprouter.Params){

	var groupId=p.ByName("groupId")
	fmt.Println(groupId)

	db, err := sql.Open("mysql", "root:hello123@/whatsKonsole?charset=utf8")
	if err!=nil{
		log.Fatal(err)
	}

	queryStatement:="select DISTINCT userId,groupName from users WHERE groupId="+"\""+groupId+"\""
	rows, err := db.Query(queryStatement)
	ures:=make([]models.Participants,0)
	u:=models.Participants{}
	for rows.Next(){
		var userId string
		var groupName string
		err = rows.Scan(&userId,&groupName)
		if err!=nil{
			log.Fatal(err)
		}

		u.UserId=userId
		u.GroupName=groupName
		ures=append(ures, u)
	}

	uj,err:=json.Marshal(ures)
	if err!=nil{
		log.Fatalln(err)
	}
	res.Header().Set("Content-Type", "application/json")
	res.WriteHeader(http.StatusOK)
	fmt.Fprintln(res,string(uj))
	defer db.Close()

}

func(gc GroupController)GetGroupByUser(res http.ResponseWriter,req *http.Request, p httprouter.Params){
	/*to be done*/

	var userId=p.ByName("userId")
	fmt.Println(userId)

	db, err := sql.Open("mysql", "root:hello123@/whatsKonsole?charset=utf8")
	if err!=nil{
		log.Fatal(err)
	}

	queryStatement:="select DISTINCT userId,groupId,groupName from users WHERE userId="+"\""+userId+"\""
	rows, err := db.Query(queryStatement)
	ures:=make([]models.User,0)
	u:=models.User{}
	for rows.Next(){
		var userId string
		var groupId string
		var groupName string
		err = rows.Scan(&userId,&groupId,&groupName)
		if err!=nil{
			log.Fatal(err)
		}
		u.UserId=userId
		u.GroupId=groupId
		u.GroupName=groupName
		ures=append(ures, u)
	}

	uj,err:=json.Marshal(ures)
	if err!=nil{
		log.Fatalln(err)
	}
	res.Header().Set("Content-Type", "application/json")
	res.WriteHeader(http.StatusOK)
	fmt.Fprintln(res,string(uj))
	defer db.Close()


}

func(gc GroupController)UserAllGroupActivity(res http.ResponseWriter,req *http.Request, p httprouter.Params){
/*to be done*/
}


