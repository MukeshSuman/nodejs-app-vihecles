const db = require("_helpers/db");
const ai = require("ai");
const Maintenance = db.Maintenance;
const Transaction = db.Transaction;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await Maintenance.find().sort("-date");
}

async function getById(id) {
  return await Maintenance.findById(id);
}

async function create(maintenanceParam) {
  const maintenance = new Maintenance(maintenanceParam);
  const saveMaintenance = await maintenance.save();
  ai.maintenancesAi(saveMaintenance);
  return saveMaintenance;
}

async function update(id, maintenanceParam) {
  const maintenance = await Maintenance.findById(id);

  // validate
  if (!maintenance) throw "Maintenance not found";

  // copy maintenanceParam properties to maintenance
  Object.assign(maintenance, maintenanceParam);

  const saveMaintenance = await maintenance.save();
  ai.maintenancesAi(saveMaintenance);
  return saveMaintenance;
}

async function _delete(id) {
  await Transaction.remove({ referenceId: id });
  await Maintenance.findByIdAndRemove(id);
}
