const db = require("_helpers/db");
const Transaction = db.Transaction;

const prepareData = workData => {
  let description = workData.description || "";
  let type = "Credited";
  if(workData.paymentType !== "Cash") {
      type = workData.paymentType || 'Null'
  }
  if (workData.status !== "Completed") {
    description += "(AI - due amount" + (workData.amount - workData.paid) + ")";
  }
  return {
    date: workData.date || new Date(),
    name: workData.name || "Guest",
    type: type,
    amount: workData.paid,
    category: "Work",
    description: description,
    referenceModel: "Work",
    referenceId: workData._id,
    createdBy: workData.createdBy
  };
};

async function worksAi(workData) {
  let preparedWorkData = prepareData(workData);
  let transaction = await Transaction.findOne({
    referenceId: preparedWorkData.referenceId
  });

  if (!transaction) {
    transaction = new Transaction(preparedWorkData);
  } else {
    Object.assign(transaction, preparedWorkData);
  }
  return await transaction.save();
}

module.exports = {
    worksAi
  };
