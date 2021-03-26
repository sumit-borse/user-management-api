var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const cors = require('cors');
app.use(cors());

var sqlOreration = require('./sqlOperations');

app.get('/',function(req,res,next){
    res.send("Hi Sumit");
});

app.get('/getAllUsers', function (req, res){
    sqlOreration.displayAllUsers(function (result) {
        jsonData = JSON.stringify(result);
        console.log(jsonData);
        res.send(result);
    });
});

app.post('/getUsers',cors(), function (req, res){
    sqlOreration.selectUser(req.body.id, function (result) {
        jsonData = JSON.stringify(result);
        res.send(result);
    });
});

app.post('/addNewUser',cors(), function(req, res){
    sqlOreration.addNewUser(req.body.firstName,req.body.lastName,req.body.email,req.body.mobileNumber, function (result) {
    //sqlOreration.addNewUser("sumit","borse","sdb@qw.c","9900887766", function (result) {
        jsonData = JSON.stringify(result);
        res.send(jsonData);
    });
});

app.post('/updateUserDetails',cors(), function(req, res){
    sqlOreration.updateUser(req.body.firstName,req.body.lastName,req.body.email,req.body.mobileNumber, req.body.id, function (result) {
    //sqlOreration.updateUser("sumit","borse","sdb@qw.c","0000000000",'36', function (result) {
        jsonData = JSON.stringify(result);
        res.send(jsonData);
    });
});

app.post('/deleteUser',cors(), function(req, res){
    sqlOreration.deleteUser(req.body.id, function (result) {
    //sqlOreration.deleteUser('37', function (result) {
        jsonData = JSON.stringify(result);
        res.send(jsonData);
    });
});

app.listen(3001, function(){
    console.log("Server Statred");
});