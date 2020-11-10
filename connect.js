const mysql = require('mysql');

// Mysql middleware
const con = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: process.env.MYSQL_PASSWORD || 'root',
    database: 'rooyghem'
});

// Create connection with Mysql
con.connect((err)=> {
    if(err) return console.log('Error connecting to Mysql: ' + err.message);
    console.log('Connected to Mysql');
});

module.exports = con;
