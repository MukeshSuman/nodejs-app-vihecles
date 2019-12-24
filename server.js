require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("_helpers/jwt");
const errorHandler = require("_helpers/error-handler");
const config = require("config.json");

const CronJob = require("cron").CronJob;
const mongodbBackup = require("mongodb-backup");
const fs = require("fs");
const path = require('path');
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

app.use(express.static(path.join(__dirname, 'public')));

// api routes
app.use("/users", require("./users/users.controller"));
app.use("/works", require("./works/works.controller"));
app.use("/fuels", require("./fuels/fuels.controller"));
app.use("/maintenances", require("./maintenances/maintenances.controller"));
app.use("/transactions", require("./transactions/transactions.controller"));
app.use("/picklists", require("./picklists/picklists.controller"));

// global error handler
app.use(errorHandler);


// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
const server = app.listen(port, function() {
  console.log("Server listening on port " + port);
});
