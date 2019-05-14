# DokaBase Project.

Semester Project For Databases Course.
6th Semester 2018-2019

## Team
  - Antonios Valmas (0311634)
  - Panagiotis Loulakis (03116121)
  - Joseph Panagiotopoulos (03116063)

## Technologies
  - BackEnd: NodeJS (ExpressJS)
  - FrontEnd: AngularJS
  - Template Engine: PUG
  - Database: MySQL
  - Operating System (Server): Ubuntu 
  - Package Manager: npm

## Requirements
- NodeJs: 8.10
- ExpressJS: 4.16
- MySQL: 5.7
- Ubuntu: 18.04
- npm: 3.5

## Installation
#### Node JS
```sh
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

#### npm
```sh
$ sudo apt update
$ sudo apt install npm
```

#### MySQL
```sh
$ sudo apt update
$ sudo apt install mysql-server
$ sudo mysql_secure_installation
```

#### ExpressJS
```sh
$ npm install express-generator -g
```

## Set Up Local Enviroment
1. Clone the project to your Computer.
    ```sh
    $ git clone https://github.com/Killergamestudios/DBProject.git
    $ cd DBProject
    ```
2. Install Dependacies:
    ```sh
    $ npm install 
    ```
3. Start nodeJs server
    ```sh
    npm start
    ```
##### Notes:
- Server is running on port 3000: http://localhost:3000/
- Make sure MySQL server is running:
    ```sh    
    $ service mysql status 
    ```