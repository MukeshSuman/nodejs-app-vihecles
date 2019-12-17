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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use("/users", require("./users/users.controller"));
app.use("/works", require("./works/works.controller"));
app.use("/fuels", require("./fuels/fuels.controller"));
app.use("/maintenances", require("./maintenances/maintenances.controller"));
app.use("/transactions", require("./transactions/transactions.controller"));

// global error handler
app.use(errorHandler);

new CronJob(
  "0 0 * * *",
  function() {
    console.log("CronJob", new Date());
    const dateTime = new Date().getTime();
    const dir = "mongodb-backup/" + dateTime;
    fs.mkdirSync(dir);
    mongodbBackup({
      uri: process.env.MONGODB_URI || config.connectionString,
      root: dir,
      parser: "json"
    });
  },
  null,
  true,
  "Asia/Kolkata"
);

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
const server = app.listen(port, function() {
  console.log("Server listening on port " + port);
});
