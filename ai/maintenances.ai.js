const db = require("_helpers/db");
const Transaction = db.Transaction;

const prepareData = maintenanceData => {
  return {
    date: maintenanceData.date || new Date(),
    name: maintenanceData.name || "Maintenance",
    type: "Debited",
    amount: maintenanceData.amount,
    category: "Maintenance",
    description: maintenanceData.description || "",
    referenceModel: "Maintenance",
    referenceId: maintenanceData._id,
    createdBy: maintenanceData.createdBy
  };
};

async function maintenancesAi(maintenanceData) {
  let preparedmaintenanceData = prepareData(maintenanceData);
  let transaction = await Transaction.findOne({
    referenceId: preparedmaintenanceData.referenceId
  });

  if (!transaction) {
    transaction = new Transaction(preparedmaintenanceData);
  } else {
    Object.assign(transaction, preparedmaintenanceData);
  }
  return await transaction.save();
}

module.exports = {
    maintenancesAi
  };
