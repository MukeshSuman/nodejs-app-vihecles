const db = require("_helpers/db");
const Maintenance = db.Maintenance;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await Maintenance.find().sort('-date');
}

async function getById(id) {
  return await Maintenance.findById(id);
}

async function create(maintenanceParam) {
  const maintenance = new Maintenance(maintenanceParam);
  await maintenance.save();
}

async function update(id, maintenanceParam) {
  const maintenance = await Maintenance.findById(id);

  // validate
  if (!maintenance) throw "Maintenance not found";

  // copy maintenanceParam properties to maintenance
  Object.assign(maintenance, maintenanceParam);

  await maintenance.save();
}

async function _delete(id) {
  await Maintenance.findByIdAndRemove(id);
}
