const db = require("_helpers/db");
const Picklist = db.Picklist;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await Picklist.find().sort('-date');
}

async function getById(id) {
  return await Picklist.findById(id);
}

async function create(picklistParam) {
  const picklist = new Picklist(picklistParam);
  const savePicklist = await picklist.save();
  return savePicklist;
}

async function update(id, picklistParam) {
  const picklist = await Picklist.findById(id);

  // validate
  if (!picklist) throw "Picklist not found";

  // copy picklistParam properties to picklist
  Object.assign(picklist, picklistParam);

  const savePicklist = await picklist.save();
  return savePicklist;
}

async function _delete(id) {
  await Picklist.findByIdAndRemove(id);
}
