const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    name: { type: String, required: true, max: 50 },
    description: { type: String, required: false, max: 50 },
    category: { type: String, required: true, default: "Daily" }, // Daily, Worker, Fuel,  Maintenance, Deposited, Withdrawn, Salary, Advance
    type: { type: String, required: true, default: "Credited" }, // Debited, Credited
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "User" }
  },
  {
    timestamps: true,
    strict: false
  }
);

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Transaction", schema);
