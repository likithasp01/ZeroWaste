const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'foodapp',
  password: 'foodpassword',
  database: 'zerowaste'
});

module.exports = pool.promise();
