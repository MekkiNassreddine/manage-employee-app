const sql = require("./db.config");

// constructor
const LeaveWork = function(leaveWork) {
  this.id = leaveWork.id;
  this.id_card_employee = leaveWork.id_card_employee;
  this.duration = leaveWork.duration;
  this.start_date = leaveWork.start_date;
  this.validate = leaveWork.validate;
  this.archives = leaveWork.archives;
};


LeaveWork.createNewRequest = async (leaveWork) => {
  try {
    const [rows, fields] = await sql.execute(`
      INSERT INTO leave_works (id_card_employee, duration, start_date, validate, archives)
      VALUES (?, ?, ?, ?, ?)
    `, [
      leaveWork.id_card_employee,
      leaveWork.duration,
      leaveWork.start_date,
      leaveWork.validate,
      '',
    ]);

    const result = { i: rows.insertId, ...leaveWork };
    console.log('your request will be send to admin:', result);
    return result;
  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }
};

LeaveWork.findById = async (id) => {
  try {
    const [existingRows] = await sql.execute('SELECT * FROM leave_works WHERE id = ?', [id]);

    if (existingRows.length === 0) {
      console.error("Not found this leaves work !!");
      return null;
    }  else  {
      console.log("Found leaves work : ", existingRows[0]);
      return existingRows[0] 
    }
  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }
};

LeaveWork.findByIdCard = async (id) => {
  try {
    const [existingRows] = await sql.execute('SELECT * FROM leave_works WHERE id_card_employee = ?', [id]);
    console.log("Found Vacation: ", existingRows);
    if (existingRows.length === 0) {
      console.error("this emloyee is on work !!");
      return null;
    }  else  {
      console.log("Found Vacation: ", existingRows);
      return existingRows 
    }
  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }
};

LeaveWork.findReqByState = async (id) => {
  try {
    // Step 1: Fetch all rows for the given id
    const [existingRows] = await sql.execute('SELECT * FROM leave_works WHERE id_card_employee = ?', [id]);

    // Check if existingRows is defined and has elements
    if (!existingRows || existingRows.length === 0) {
      console.error("This employee is currently on work!");
      return null;
    }

    console.log(`Found ${existingRows.length} Vacation(s):`, existingRows);

    // Step 2: Filter rows based on the validate attribute
    const filteredRows = existingRows.filter(row => row.validate === 'Pending');

    if (filteredRows.length === 0) {
      console.error("No pending leave requests for this employee.");
      return null;
    }

    return filteredRows;
  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }
};



LeaveWork.getAllLeaveWorks = async () => {
  try {
    const [existingRows] = await sql.execute('SELECT * FROM leave_works');

    if (existingRows.length === 0) {
      return null;
    }  else  {
      return existingRows 
    }
  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }
};



LeaveWork.updateValideById  = async (id) => {
  try {
    const [existingRows] = await sql.execute('SELECT * FROM leave_works WHERE id = ?', [id]);

    if (existingRows.length === 0) {
      console.error("Not found this leaves work !!");
      return null;
    }  else  {
      const validateReq = "Validate";
      const archiveReq = "Archive";
      const [rows, fields] = await sql.execute(`
      UPDATE leave_works 
      SET 
      validate=?, archives=?
      WHERE id = ?
    `, [
        validateReq,
        archiveReq,
         id,
        ]);

      const updatedLeaveWork = { id: id, ...existingRows[0], validate: validateReq, archives: archiveReq };
      console.log(' request has been validated  :', updatedLeaveWork);
      return [null, updatedLeaveWork];
    }    

  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }
};

LeaveWork.updateRefuseById  = async (id) => {
  try {
    const [existingRows] = await sql.execute('SELECT * FROM leave_works WHERE id = ?', [id]);

    if (existingRows.length === 0) {
      console.error("Not found this leaves work !!");
      return null;
    }  else  {
      const validateReq = "Refused";
      const archiveReq = "Archive";
      const [rows, fields] = await sql.execute(`
      UPDATE leave_works 
      SET 
      validate=?, archives=?
      WHERE id = ?
    `, [
        validateReq,
        archiveReq,
         id,
        ]);

      const updatedLeaveWork = { id: id, ...existingRows[0], validate: validateReq, archives: archiveReq };
      console.log(' request has been validated  :', updatedLeaveWork);
      return [null, updatedLeaveWork];
    }    

  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }
};

LeaveWork.remove = async (id) => {
  try {
    const [rows, fields] = await sql.execute('DELETE FROM leave_works WHERE id_employee = ?', [id]);

    if (rows.affectedRows === 0) {
      return null;
    }

    return { message: 'leave work deleted successfully.' };
  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }
};

module.exports = LeaveWork;
