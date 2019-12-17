const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    itemsName: { type: String, required: true },
    type: { type: String, required: true, default: "Maintenance" }, // Maintenance, Repair, Part Change, Repair and Part Change
    description: { type: String, required: false, max: 50 },
    deleted: { type: Boolean, required: true, default: false },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "User" }
  },
  {
    timestamps: true
  }
);

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Maintenance", schema);
