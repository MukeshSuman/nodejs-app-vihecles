const db = require("_helpers/db");
const ai = require("ai");
const Work = db.Work;
const Transaction = db.Transaction;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await Work.find().sort("-date");
}

async function getById(id) {
  return await Work.findById(id);
}

async function create(workParam) {
  const work = new Work(workParam);
  const saveWork = await work.save();
  ai.worksAi(saveWork);
  return saveWork;
}

async function update(id, workParam) {
  const work = await Work.findById(id);

  // validate
  if (!work) throw "Work not found";

  // copy workParam properties to work
  Object.assign(work, workParam);

  const saveWork = await work.save();
  ai.worksAi(saveWork);
  return saveWork;
}

async function _delete(id) {
  await Transaction.remove({ referenceId: id });
  await Work.findByIdAndRemove(id);
}
