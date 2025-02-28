const mongoose = require("mongoose");

const ballotAwardSchema = new mongoose.Schema({
    awardId: { type: String, required: true },
    name: { type: String, required: true },
    guessId: { type: String, required: true },
    guessName: { type: String, required: true},
    guessUrl: { type: String, required: false },
    correct: { type: Boolean, required: false }
});

const ballotSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    awards: { type: [ballotAwardSchema], required: true },
    points: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Ballot", ballotSchema);