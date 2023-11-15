const express = require('express')
const Employee = require("../models/employee.model.js");
var bodyParser = require('body-parser');
//const nodemailer = require('nodemailer');
const app = express()

const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const bearerToken = require('express-bearer-token');

const secretKey = "podc,kejnjo,jo@@..ceacas"

// Create a transporter
/*const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nassreddine.mekki@esprit.tn', // your email
    pass: 'P@ssword0Admis' // your email password or an application-specific password
  }
});

// Function to send leave confirmation email
const sendLeaveConfirmationEmail = (employeeEmail) => {
  // Define the email content
  const mailOptions = {
    from: 'nassreddine.mekki@esprit.tn', // sender address
    to: employeeEmail, // recipient's email
    subject: 'Leave Confirmation',
    text: 'Your leave request has been confirmed. Enjoy your time off!'
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error.message);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};*/

app.use((req, res, next) => {
 
  if (req.originalUrl.indexOf('/users') >= 0 || req.originalUrl.indexOf('/login') >= 0 ||
    req.originalUrl.indexOf('/register') >= 0) {
      return next();
  }
  var token = req.token;
  jwt.verify(token, app.get('secret'), (err, decoded) => {
      if (err) {
          console.log(`Error ================:${err}`)
          res.send({
              success: false,
              message: 'Failed to authenticate token. Make sure to include the ' +
                  'token returned from /users call in the authorization header ' +
                  ' as a Bearer token'
          });
          return;
      } else {
        console.log("in token fuction "+ req.email)
          req.email = decoded.email;
          req.password = decoded.password;
          return next();
      }
  });
});

// Retrieve all Employees from the database (with condition).
exports.findAllEpmloyees = async (req, res) => {
  try {
    const data = await Employee.getAllEmployees();

    if (!data || data.length === 0) {
      res.status(404).json({ message: "No employees found." });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

// register a new employee  
exports.createEmployee = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    const employee = new Employee({
      full_name: req.body.full_name,
      email: req.body.email,
      password: req.body.password,
      id_card: req.body.id_card,
      role: "CLIENT",
      nb_leaves: 0,
      state: "On Work"
    });

    const result = await Employee.create(employee);

    if(result){
      res.send(result);
    }
    else 
     res.status(500).send({
        message: "Email already exists !!"
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Employee."
    });
  }
};

// Employee Login
exports.loginUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  try {
    const data = await Employee.login(email, password);

    if (data.kind === "not_found") {
      res.status(404).send({
        message: `Not found Employee with email ${req.body.email}.`,
      });
    } else if (data.kind === "invalid_credentials") {
      res.status(401).json({ message: 'Invalid credentials' });
    } else {
      const user = { id_employee: data.id_employee, email: email, password: password };
      const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
      console.log("1- Your token is: " + token);
      res.status(200).json({ response: data, token: token });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Employee with email and password " + req.body.email + " " + req.body.password,
    });
  }
};


exports.findByIdentifyCard = (req, res) => {

  Employee.findByIDCard(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Employee with id " + req.params.id
        });
      }
    } res.status(200).json({ response: data});
  });
};

exports.updateEmployee = async (req, res) => {
  try {
    if(!req.params ){
      res.status(404).json({ message: `Error .` }); 
    }
    const result = await Employee.updateById(req.params.id);
    if (!result ) {
      res.status(404).json({ message: `No employee found with Id Card : ${req.params.id}.` });
    } else {
      //console.log("result.email : "+ result.email)
      //const employeeEmail = result.email; 
      //sendLeaveConfirmationEmail("nasreddine.meki@gmail.com");
      res.status(200).json({ message: `Employee with Id Card ${req.params.id} has been updated.` });
    }
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.removeEmployee = async (req, res) => {
  try {
    const result = await Employee.removeById(req.params.id);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: `No employee found with Id Card ${req.params.id}.` });
    } else {
      res.status(200).json({ message: `Employee with Id Card ${req.params.id} has been deleted.` });
    }
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
};



