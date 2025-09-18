wasteconst mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'foodapp',
  password: 'pass',
  database: 'projectname'
});

module.exports = pool.promise();
