const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'db', // Use the service name specified in docker-compose.yml
  user: 'root',
  password: 'root',
  database: 'employee_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 20000, // Set a higher timeout value (milliseconds)
  port: 3306,
});

// Check MySQL connection
pool.promise().getConnection()
  .then((connection) => {
    console.log('Connected to MySQL');

    // Release the connection when done
    connection.release();
  })
  .catch((err) => {
    console.error('Error connecting to MySQL:', err.message);
  });

module.exports = pool.promise();
