# P6_saumureau_thibaud

## Add your mongoDB connection and TOKEN

Create a file .env in the root project. In this file, you need to add a variable for your connection at MongoDB
```
ADMINFULL=mongodb+srv://<user>:<password>@cluster0.ffla6.mongodb.net/OPC-project_6?retryWrites=true&w=majority
```

And the Token variable
```
TOKENPASS=<your token here>
```

## Start the API

Install external dependencies : 
```
$ npm install
```  

Start the server
```
$ nodemon server
``` 

API should be available at http://localhost:3000/

## Start the web server

For the front-end folder, click here and follow the instructions
https://github.com/OpenClassrooms-Student-Center/dwj-projet6