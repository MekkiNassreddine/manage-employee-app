module.exports = app => {
    const leaves = require("../controllers/leave_work.controller.js");
  
    var router = require("express").Router();
  
    // Create a new employees
    router.post("/request", leaves.createLeaveWork);
  
    // Retrieve all employees
    router.get("/requests", leaves.findAllLeavesWork);

  
    // Retrieve a single employee with id
    router.get("/:id", leaves.findLeaveById);

    // Retrieve a single employee with id_card
    router.get("/identify/:id", leaves.findByIdCard);
    router.get("/state/:id", leaves.RetrieveReqByState);
  
    // Update a employee with id
    router.put("/valide/:id", leaves.validRequest);

    // Update a employee with id
    router.put("/refuse/:id", leaves.refuseRequest);
  
    // Delete a employee with id
    router.delete("/:id", leaves.deleteLeaveWork);
 
    app.use('/leaves', router);
  };