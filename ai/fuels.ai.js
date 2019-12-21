const db = require("_helpers/db");
const Transaction = db.Transaction;

const prepareData = fuelData => {
  return {
    date: fuelData.date || new Date(),
    name: fuelData.name || "Filled",
    type: "Debited",
    amount: fuelData.amount,
    category: "Fuel",
    description: fuelData.description || "",
    referenceModel: "Fuel",
    referenceId: fuelData._id,
    createdBy: fuelData.createdBy
  };
};

async function fuelsAi(fuelData) {
  let preparedfuelData = prepareData(fuelData);
  let transaction = await Transaction.findOne({
    referenceId: preparedfuelData.referenceId
  });

  if (!transaction) {
    transaction = new Transaction(preparedfuelData);
  } else {
    Object.assign(transaction, preparedfuelData);
  }
  return await transaction.save();
}

module.exports = {
    fuelsAi
  };
