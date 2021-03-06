const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    displayName: { type: String, required: true },
    value: { type: String, required: true },
    type: { type: String, required: true },
    parentName: { type: String, required: false },
    parentValue: { type: String, required: false },
    rate: { type: Number, required: true,  default: 0 },
    labourCharge: { type: Number, required: true,  default: 0 },
    isActive: { type: Boolean, required: true, default: true },
    isAvailSubCat: { type: Boolean, required: true, default: false },
    defaultActive: { type: Boolean, required: true, default: false },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "User" }
  },
  {
    timestamps: true,
    strict: false
  }
);

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Picklist", schema);
