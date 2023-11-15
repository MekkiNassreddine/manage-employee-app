const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'db', // Use the service name specified in docker-compose.yml
  user: 'root',
  password: 'root',
  database: 'leaves_work_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 20000, // Set a higher timeout value (milliseconds)
  port: 3306,
});


// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL');

  // Release the connection when done
  connection.release();
});

pool.query('SELECT 1', (err, results) => {
  if (err) {
    console.error('Error executing query:', err.message);
    return;
  }
  console.log('MySQL connection test successful:', results);
});

module.exports = pool.promise();

