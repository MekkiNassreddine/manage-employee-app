module.exports = app => {
    const leaves = require("../controllers/leave_work.controller.js");
  
    var router = require("express").Router();
  
    // Create a new employees
    router.post("/request", leaves.createLeaveWork);
  
    // Retrieve all employees
    router.get("/", leaves.findAllLeavesWork);

  
    // Retrieve a single employee with id
    router.get("/:id", leaves.findLeaveById);

    // Retrieve a single employee with id_card
    router.get("/identify/:id", leaves.findByIdCard);
  
    // Update a employee with id
    router.put("/:id", leaves.validRequest);
  
    // Delete a employee with id
    router.delete("/:id", leaves.deleteLeaveWork);
 
    app.use('/leaves', router);
  };