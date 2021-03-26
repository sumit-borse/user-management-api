var mySql = require('mysql');


getConnection = () =>{
    var myConnection = mySql.createConnection({
        host: "localhost",
        user: 'root',
        password: 'password',
        database: 'userDetails',
        port: "3306"
    })
    
    return myConnection;
}

module.exports={
    getConnection: getConnection
}