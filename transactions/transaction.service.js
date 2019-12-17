const db = require("_helpers/db");
const Transaction = db.Transaction;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await Transaction.find().sort('-date');
}

async function getById(id) {
  return await Transaction.findById(id);
}

async function create(transactionParam) {
  const transaction = new Transaction(transactionParam);
  await transaction.save();
}

async function update(id, transactionParam) {
  const transaction = await Transaction.findById(id);

  // validate
  if (!transaction) throw "Transaction not found";

  // copy transactionParam properties to transaction
  Object.assign(transaction, transactionParam);

  await transaction.save();
}

async function _delete(id) {
  await Transaction.findByIdAndRemove(id);
}
