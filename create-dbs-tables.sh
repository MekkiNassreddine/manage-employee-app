#!/bin/bash
echo "MySQL is ready. Creating databases and tables..."

# Create leaves_work_db
database_created_1=false

# Loop until the condition is true
while [ "$database_created_1" != true ]; do

  docker exec -i db mysql -h db -u root -p'root' <<EOF
  CREATE DATABASE IF NOT EXISTS leaves_work_db;
  USE leaves_work_db;
  CREATE TABLE IF NOT EXISTS leave_works (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_card_employee VARCHAR(10) NOT NULL,
    duration INT NOT NULL,
    start_date DATE NOT NULL,
    validate VARCHAR(100) NOT NULL,
    archives VARCHAR(100) 
  );
  FLUSH PRIVILEGES;
EOF

  # Check if the database and table were created successfully
  if [ $? -eq 0 ]; then
    database_created_1=true
    echo "Database and table created successfully. Exiting loop."
  else
    echo "Error creating database and table. Retrying..."
    # Add a delay before the next iteration (optional)
    sleep 2
  fi
done

sleep 3
echo ""
# Create databases and tables

echo "MySQL is ready. Creating databases and tables..."

database_created_2=false

# Loop until the condition is true
while [ "$database_created_2" != true ]; do
  # Run the database creation commands
docker exec -i db mysql -h db -u root -p'root' <<EOF
CREATE DATABASE IF NOT EXISTS employee_db;
USE employee_db;
CREATE TABLE IF NOT EXISTS employees (
  id_employee INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  id_card VARCHAR(10) NOT NULL,
  role VARCHAR(10) NOT NULL,
  nb_leaves INT NOT NULL,
  state VARCHAR(30) NOT NULL
);
  FLUSH PRIVILEGES;
EOF

  # Check if the database and table were created successfully
  if [ $? -eq 0 ]; then
    database_created_2=true
    echo "Database and table created successfully. Exiting loop."
  else
    echo "Error creating database and table. Retrying..."
    # Add a delay before the next iteration (optional)
    sleep 2
  fi
done

docker exec -i db mysql -h localhost -u root -p'root' employee_db -e "
    INSERT INTO employees (
        full_name, 
        email, 
        password, 
        id_card, 
        role, 
        nb_leaves, 
        state
    ) VALUES (
        'Mekki', 
        'nasreddine.meki@gmail.com', 
        'password123', -- Replace with the hashed password
        '1234567890',
        'ADMIN', 
        '0', 
        'On-Work'
    );
"

echo ""
