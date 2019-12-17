const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    date: { type: Date, required: true },
    name: { type: String, required: false, max: 50 },
    mobile: { type: Number, required: false },
    place: { type: String, required: false, max: 50 },
    workType: { type: String, required: true, max: 50 },
    unit: { type: String, required: false, max: 50 },
    unitType: { type: String, required: false, max: 50 },
    labourCharge: { type: Number, required: true, default: 0 },
    amount: { type: Number, required: true },
    paid: { type: Number, required: true, default: 0 },
    unpaid: { type: Number, required: true, default: 0 },
    paymentType: { type: String, required: true, max: 50 },
    completed: { type: Boolean, required: true, default: false },
    deleted: { type: Boolean, required: true, default: false },
    status: { type: String, required: true, max: 50 },
    description: { type: String, required: false, max: 50 },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "User" }
  },
  {
    timestamps: true
  }
);

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Work", schema);
