module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
  
    var router = require("express").Router();
  
    // Create a new employees
    router.post("/register", employees.createEmployee);

    router.post("/login", employees.loginUser);
  
    // Retrieve all employees
    router.get("/all", employees.findAllEpmloyees);

    // Retrieve a single employee with id_card
    router.get("/identify/:id", employees.findByIdentifyCard);
  
    // Update a employee with id
    router.put("/:id", employees.updateEmployee);
  
    // Delete a employee with id
    router.delete("/:id", employees.removeEmployee);
 
    app.use('/employees', router);
  };