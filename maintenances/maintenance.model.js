const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    itemsName: { type: String, required: true },
    maintenanceType: { type: String, required: true, default: "Maintenance" }, // Maintenance, Repair, Part Change, Repair and Part Change
    place: { type: String, required: false, max: 50 },
    labourCharge: { type: Number, required: true, default: 0 }, 
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
