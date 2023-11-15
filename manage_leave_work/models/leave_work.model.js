const sql = require("./db.config");

// constructor
const LeaveWork = function(leaveWork) {
  this.id = leaveWork.id;
  this.id_card_employee = leaveWork.id_card_employee;
  this.duration = leaveWork.duration;
  this.start_date = leaveWork.start_date;
  this.type = leaveWork.type;
};


LeaveWork.createNewRequest = async (leaveWork) => {
  try {

    const [rows, fields] = await sql.execute(`
      INSERT INTO leave_works (id_card_employee, duration, start_date, type)
      VALUES (?, ?, ?, ?)
    `, [
      leaveWork.id_card_employee,
      leaveWork.duration,
      leaveWork.start_date,
      leaveWork.type,
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

    if (existingRows.length === 0) {
      console.error("this emloyee is on work !!");
      return null;
    }  else  {
      console.log("Found Vacation: ", existingRows[0]);
      return existingRows[0] 
    }
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

LeaveWork.updateById  = async (id, leaveWork) => {
  try {
    const [rows, fields] = await sql.execute(`
      UPDATE leave_works 
      SET id_card_employee = ?,
      duration = ?,
      start_date = ?,
      type=?
      WHERE id_employee = ?
    `, [leaveWork.id_card_employee, 
        leaveWork.duration,
        leaveWork.start_date,
        leaveWork.type,
        leaveWork.id]);

    const updatedLeaveWork = { id: id, ...leaveWork };
    return updatedLeaveWork;

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
