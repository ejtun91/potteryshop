const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    fullName: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    img: { type: String },
    address: { type: Object, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
