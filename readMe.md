# WhatsKonsole [![N|Solid](http://icons.iconarchive.com/icons/dtafalonso/android-l/128/WhatsApp-icon.png)]()

The Project gives you a command line interface to connect people in your community 
over WhatsApp.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

Chrome browser, Go environment to run the back-end.


### Installing Backend


```
$ sudo apt-get install golang
```
```
$ go get github.com/julienschmidt/httprouter
```
```
$ go get github.com/go-sql-driver/mysql
```

## Running Server

Move to backend directory and run followng command.

```
$ go run server.go
```

## Running Console

* Open web.whatsapp.com on chrome and Login
* Open Chrome Console.
* Run Konsole.js for the group you want to turn into a console.


## Commands Supported

* **Broadcasting Message to all Group Participants via Bot**
 ```apple js
$ sudo -g groupName,Message    
```

* **Sending Direct Message to a user via Bot**
```
$ sudo -i userId,Message
```

## Scripts and their Usage

* **Konsole.js** - Turns a group into console.
* **groupInfo.js** - Feeds information of users in particular group into DataBase.
* **PushMessage.js** - Seeds all unread Messages send to bot into a listening group.



## Deployment

The project uses EC2 Windows Instance to run scripts.


## Built With

* [Javascript](https://www.javascript.com/) - Used to create scripts to interact with whatsapp API.
* [Golang](https://golang.org/) - Used to create endpoints
* [Mysql](https://www.mysql.com/) - Used as database.


## Dataflow

```apple js

Command------->Bot Scripts at AWS process it----->Intitiate Response----->Execution

```


## Workflow

Master is our holy grail, Never directly push into master, create a pull request .

## Authors

* **Divyanshu Srivastava**  - [Github](https://github.com/newts7) - [Resume](https://newts7.github.io/resume.pdf)



## License

This project is licensed under the MIT License. 

## Risk factors

The cellphone from which bot is registered should be connected to internet.
