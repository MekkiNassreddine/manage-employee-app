const sql = require("../db/db.config");
const bcrypt = require('bcrypt');

// constructor
const Employee = function(employee) {
  this.id_employee = employee.id_employee;
  this.full_name = employee.full_name;
  this.email = employee.email;
  this.password = employee.password;
  this.id_card = employee.id_card;
  this.role = employee.role;
  this.nb_leaves = employee.nb_leaves;
  this.state = employee.state;
};

Employee.create = async (newEmployee, email) => {
  try {
    const [existingRows] = await sql.execute('SELECT * FROM employees WHERE email = ?', [newEmployee.email]);

    if (existingRows.length > 0) {
      // The email already exists, handle the error or return an appropriate response
      console.error('Email already exists:', newEmployee.email);
      //throw new Error('Email already exists');
      return null;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newEmployee.password, saltRounds);

    const [rows, fields] = await sql.execute(`
      INSERT INTO employees (full_name, email, password, id_card, role, nb_leaves, state)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      newEmployee.full_name,
      newEmployee.email,
      hashedPassword,
      newEmployee.id_card,
      newEmployee.role,
      newEmployee.nb_leaves,
      newEmployee.state,
    ]);

    const result = { id_employee: rows.insertId, ...newEmployee };
    console.log('Registered employee:', result);
    return result;
  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }
};

Employee.login = async (email, password) => {
  try {
    const [existingRows] = await sql.execute('SELECT * FROM employees WHERE email = ?', [email]);

    if (existingRows.length === 0) {
      console.error('Email not Found');
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, existingRows[0].password);

    if (isPasswordValid) {
      console.log("Found Employee: ", existingRows[0]);
      return existingRows[0] 
    } else {
      console.log("Invalid password");
      return null;
    }
  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }
};

Employee.findByIdCard = async (id) => {
  try {
    const [existingRows] = await sql.execute('SELECT * FROM employees WHERE id_card = ?', [id]);

    if (existingRows.length === 0) {
      console.error('national ID card not found');
      return null;
    }  else  {
      console.log("Found Employee: ", existingRows[0]);
      return existingRows[0] 
    }
  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }
};

Employee.getAllEmployees = async () => {
  try {
    const [existingRows] = await sql.execute('SELECT * FROM employees ');

    if (existingRows.length === 0) {
      console.error('Not found Employees');
      return null;
    }  else  {
      return existingRows 
    }
  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }
};

Employee.updateById = async (id) => {
  try {
    const [existingRows] = await sql.execute('SELECT * FROM employees WHERE id_card = ?', [id]);
 
    if (existingRows.length === 0) {
      return null;
    } else {
      if (existingRows[0].nb_leaves === 3) {
        const [rows, fields] = await sql.execute(`
        UPDATE employees 
        SET nb_leaves=?, state=? 
        WHERE id_card = ?
      `, [
        3,
        newState,
        id,
      ]);
        return [null, null]; 
      }
        let newState = '';
        let newNbLeaves = 0;

      if (existingRows[0].state === 'On Work') {
        newState = 'On Vacation';
        newNbLeaves = existingRows[0].nb_leaves + 1; 
      } else {
        newState = 'On Work';
        newNbLeaves = existingRows[0].nb_leaves;
      }
      
      const [rows, fields] = await sql.execute(`
        UPDATE employees 
        SET nb_leaves=?, state=? 
        WHERE id_card = ?
      `, [
        newNbLeaves,
        newState,
        id,
      ]);

      const updatedEmployee = { id: id, ...existingRows[0], nb_leaves: newNbLeaves, state: newState };
      console.log('Updated employee:', updatedEmployee);
      return [null, updatedEmployee];
    }

  } catch (err) {
    console.error('Error:', err.message);
    return [err, null];
  }
};


Employee.removeById = async (id) => {
  try {
    const [rows, fields] = await sql.execute('DELETE FROM employees WHERE id_card = ?', [id]);

    if (rows.affectedRows === 0) {
      console.error(`Not found Employee with id ${id}.`);
      return null;
    }

    console.log(`Deleted employee with id ${id}.`);
    return { message: 'Employee deleted successfully.' };
  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }
};


Employee.updateAdminPassword = async () => {
  try {
    const role = 'ADMIN';
    const [existingRows] = await sql.execute('SELECT * FROM employees WHERE role = ?', [role]);

    if (existingRows.length === 0) {
      console.error('Employee with role ADMIN not found');
      return null;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('0000', saltRounds);

    const [rows, fields] = await sql.execute(`
      UPDATE employees 
      SET password = ? 
      WHERE id_employee = ?
    `, [hashedPassword, existingRows[0].id_employee]);
    const updatedEmployee = { id: existingRows[0].id, ...existingRows[0] };
    return updatedEmployee;

  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }
};

module.exports = Employee;
