const db = require("_helpers/db");
const ai = require("ai");
const Fuel = db.Fuel;
const Transaction = db.Transaction;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await Fuel.find().sort('-date');
}

async function getById(id) {
  return await Fuel.findById(id);
}

async function create(fuelParam) {
  const fuel = new Fuel(fuelParam);
  const saveFuel = await fuel.save();
  ai.fuelsAi(saveFuel);
  return saveFuel;
}

async function update(id, fuelParam) {
  const fuel = await Fuel.findById(id);

  // validate
  if (!fuel) throw "Fuel not found";

  // copy fuelParam properties to fuel
  Object.assign(fuel, fuelParam);

  const saveFuel = await fuel.save();
  ai.fuelsAi(saveFuel);
  return saveFuel;
}

async function _delete(id) {
  await Transaction.remove({ referenceId: id });
  await Fuel.findByIdAndRemove(id);
}
