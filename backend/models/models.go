package models

import (

)
type User struct {
	 UserId string  `json:"UserId"`
	 GroupId string  `json:"GroupId"`
	 GroupName string `json:"GroupName"`
}

type Group struct {
	GroupId string `json:"GroupId"`
	GroupName string `json:"GroupName"`
}

type Participants struct {
	UserId string `json:"UserId"`
	GroupName string `json:"GroupName"`
}