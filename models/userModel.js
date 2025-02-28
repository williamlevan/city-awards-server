const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    refreshToken: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);