const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true },
    email: { type: String, required: true, max: 50 },
    adminType: { type: String, required: true, max: 50 },
    createdDate: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
    strict: false
  }
);

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", schema);
