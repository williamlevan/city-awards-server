const mongoose = require("mongoose");

const nomineeSchema = new mongoose.Schema({
    nomineeId: { type: String, required: true },
    name: { type: String, required: true },
    film: { type: String, required: false },
    imageUrl: { type: String, required: false },
    image2Url: { type: String, required: false}
})

const awardSchema = new mongoose.Schema({
    awardId: { type: String, required: true },
    name: { type: String, required: true },
    nominees: { type: [nomineeSchema], required: true },
    winner: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model("Award", awardSchema);