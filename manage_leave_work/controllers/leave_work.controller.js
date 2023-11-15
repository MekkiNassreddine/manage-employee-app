const LeaveWork = require("../models/leave_work.model.js");
require('body-parser');

// Create and Save a new Employee

exports.createLeaveWork = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    const parts = req.body.start_date.split('/');
    const mysqlFormattedDate = `${parts[2]}-${parts[0]}-${parts[1]}`;

    console.log(mysqlFormattedDate)

    const leaveWork = new LeaveWork({
      id_card_employee: req.body.id_card_employee,
      duration: req.body.duration,
      start_date: mysqlFormattedDate,
      type: req.body.type
    });

    const result = await LeaveWork.createNewRequest(leaveWork);

    if(result){
      res.send(result);
    }
    else 
     res.status(500).send({
        message: "error when adding your request  !!"
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Employee."
    });
  }
};

// Retrieve all Leaves works from the database 
exports.findAllLeavesWork = async (req, res) => {
  try {
    const data = await LeaveWork.getAllLeaveWorks();

    if (!data || data.length === 0) {
      res.status(404).json({ message: "No Leaves Work found." });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
};



exports.findByIdCard = async (req, res) => {
  try{
    const result = await LeaveWork.findByIdCard(req.params.id);
    if (!result ) {
      res.status(404).json({ message: `Not found Employee with id Card : ${req.params.id}.` });
    } else {
      res.status(200).json(result);
    }
  }catch(err){
    console.error("Error:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.findLeaveById = async (req, res) => {
  try{
    const result = await LeaveWork.findById(req.params.id);
    if (!result ) {
      res.status(404).json({ message: `Not Leave of work with id : ${req.params.id}.` });
    } else {
      res.status(200).json(result);
    }
  }catch(err){
    console.error("Error:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update a Employees identified by the id in the request
exports.validRequest = async (req, res) => {
  try{
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const parts = req.body.start_date.split('/');
  const mysqlFormattedDate = `${parts[2]}-${parts[0]}-${parts[1]}`;

  console.log(mysqlFormattedDate)

  const leaveWork = new LeaveWork({
    id_card_employee: req.body.id_card_employee,
    duration: req.body.duration,
    start_date: mysqlFormattedDate,
    type: req.body.type
  });

  const result = await LeaveWork.updateById(req.params.id, leaveWork);

  if (!result ) {
    res.status(404).json({ message: `No Leave work found with Id : ${req.params.id}.` });
  } else {
  
    res.status(200).json({ message: `Leave work with Id : ${req.params.id} has been updated.` });
  }

  }catch(err){
    console.error("Error:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.deleteLeaveWork = async (req, res) => {
  try {
    const result = await LeaveWork.remove(req.params.id);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: `No found Leaves Work with Id Card.` });
    } else {
      res.status(200).json({ message: `Leaves Work has been deleted.` });
    }
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

