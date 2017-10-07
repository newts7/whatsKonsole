# WhatsKonsole

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


## Deployment

The project uses EC2 Windows Instance to run scripts.


## Built With

* [Javascript](https://www.javascript.com/) - Used to create scripts to interact with whatsapp API.
* [Golang](https://golang.org/) - Used to create endpoints
* [Mysql](https://www.mysql.com/) - Used to generate RSS Feeds


## Dataflow

```apple js

Command------->Bot Scripts at AWS process it----->Intitiate Response----->Execution

```


## Workflow

Master is our holy grail, Never directly push into master, create a pull request .

## Authors

* **Divyanshu Srivastava**  - [Github](https://github.com/newts7)



## License

This project is licensed under the MIT License. 

##Risk factors

The cellphone from which bot is registered should be connected to internet.
