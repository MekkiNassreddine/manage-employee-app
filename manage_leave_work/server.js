const express = require('express')
require('dotenv').config();

var bodyParser = require('body-parser');

const app = express()
const port = process.env.PORT || 8089;


app.use(bodyParser.json());

require("./models/db.config")

require("./roots/roots")(app);

app.listen(port, () => {
    console.log(`our app is listening at http://localhost:${port}`)
})