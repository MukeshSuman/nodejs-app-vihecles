const db = require("_helpers/db");
const Fuel = db.Fuel;

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
  await fuel.save();
}

async function update(id, fuelParam) {
  const fuel = await Fuel.findById(id);

  // validate
  if (!fuel) throw "Fuel not found";

  // copy fuelParam properties to fuel
  Object.assign(fuel, fuelParam);

  await fuel.save();
}

async function _delete(id) {
  await Fuel.findByIdAndRemove(id);
}
