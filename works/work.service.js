const db = require("_helpers/db");
const Work = db.Work;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await Work.find().sort('-date');;
}

async function getById(id) {
  return await Work.findById(id);
}

async function create(workParam) {
  const work = new Work(workParam);
  await work.save();
}

async function update(id, workParam) {
  const work = await Work.findById(id);

  // validate
  if (!work) throw "Work not found";

  // copy workParam properties to work
  Object.assign(work, workParam);

  await work.save();
}

async function _delete(id) {
  await Work.findByIdAndRemove(id);
}
