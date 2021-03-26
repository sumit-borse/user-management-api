var mysql = require('mysql');
var dbConnection= require('./databaseConnection');
var con=dbConnection.getConnection();

con.connect(function(err) {
    if (err)
        throw err;
    else
        console.log("Connected..");
});

var  displayAllUsers = function(callback) {
    var result = [];
    con.query('SELECT * FROM employee_details', function(err, res, fields)
    {
        if (err)  return callback(err);
        if(res.length){
        for(var i = 0; i<res.length; i++ ){     
                result.push(res[i]);
            }
        }
        callback(result);
    });
};

var  selectUser = function(id,callback) {
    var result = [];
    con.query('SELECT * FROM employee_details where id=?',[id], function(err, res, fields)
    {
        if (err)  return callback(err);
        if(res.length){
        for(var i = 0; i<res.length; i++ ){     
                result.push(res[i]);
            }
        }
        callback(result);
    });
};

var addNewUser = function (fn, ln, email, mobile, callback) {
    var qur = "insert into employee_details (firstName, lastName, emailId, mobileNumber) values (?,?,?,?)";
    console.log(fn);
    con.query(qur,[fn,ln,email,mobile], function(err, res){
        if(err)
            throw err;
        callback("Data Successfully inserted. Your Employee Id is : "+res.insertId);
    });
}

var updateUser = function (fn, ln, email, mobile,id, callback) {
    id=parseInt(id);
    var qur = "update employee_details set firstName=?, lastName=?, emailId=?, mobileNumber=? where id=?";
    console.log(fn);
    con.query(qur,[fn,ln,email,mobile,id], function(err, res){
        if(err)
            throw err;
        callback("Data Successfully Updated.");
    });
}



var deleteUser = function(id, callback){
    id=parseInt(id);
    var qur = "delete from employee_details where id=?";
    con.query(qur,[id], function(err, res){
        if(err)
            throw err;
        callback("Data Successfully Deleted.");
    });
}

 

module.exports = {
    displayAllUsers: displayAllUsers,
    addNewUser: addNewUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    selectUser: selectUser
}