const config = require("config.json");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || config.connectionString, {
  useCreateIndex: true,
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;

module.exports = {
  User: require("../users/user.model"),
  Work: require("../works/work.model"),
  Fuel: require("../fuels/fuel.model"),
  Maintenance: require("../maintenances/maintenance.model"),
  Transaction: require("../transactions/transaction.model"),
  Picklist: require("../picklists/picklist.model"),

};
