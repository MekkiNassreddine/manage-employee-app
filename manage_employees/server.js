const express = require('express')
require('dotenv').config();

var bodyParser = require('body-parser');

const Employee = require("./models/employee.model.js");

const app = express()
const port = process.env.PORT || 8082;
app.use(bodyParser.json());

require("./db/db.config")

require("./roots/roots")(app);

async function initializeApp() {
    try {
      // Other initialization code...
  
      const updatedAdmin = await Employee.updateAdminPassword();
      console.log('Updated Admin:', updatedAdmin);
  
      // Other app logic...
  
    } catch (error) {
      console.error('Error initializing the app:', error.message);
      // Handle the error appropriately
    }
  }
  
  // Call the async function to initialize the app
  initializeApp();

app.listen(port, () => {
    console.log(`our app is listening at http://localhost:${port}`)
})