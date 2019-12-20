const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    date: { type: Date, required: true },
    amount: { type: Number, required: true,  default: 0 },
    litre: { type: Number, required: false },
    beforePoint: { type: Number, required: false },
    availablePoint: { type: Number, required: true },
    type: { type: String, required: true, default: "Daily" },
    place: { type: String, required: false, max: 50 },
    description: { type: String, required: false, max: 50 },
    deleted: { type: Boolean, required: true, default: false },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "User" }
  },
  {
    timestamps: true,
    strict: false
  }
);

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Fuel", schema);
