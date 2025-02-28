const Ballot = require("../models/ballotModel");

exports.getBallots = async (req, res) => {
    try {
        const ballots = await Ballot.find();
        res.json(ballots);
    } catch (error) {
        res.status(500).json({ message: "Error fetching ballots", error });
    }
};

exports.getBallot = async (req, res) => {
    try {
        console.log(req.params.id);
        const ballot = await Ballot.findOne({ userId: req.params.id });
        if (!ballot) {
            return res.status(202).json({ message: "Ballot not found" });
        }
        res.json(ballot);
    } catch (error) {
        res.status(500).json({ message: "Error fetching ballot", error });
    }
};

exports.createBallot = async (req, res) => {
    try {
        const { userId, name, awards } = req.body;
        const points = 0;

        const existingBallot = await Ballot.findOne({ userId: userId });

        if (existingBallot) {
            return res.status(400).json({ message: "A ballot already exists for this user." });
        }

        const newBallot = new Ballot({ userId, name, awards, points });
        await newBallot.save();
        res.status(201).json({ message: "Ballot submitted successfully!", ballot: newBallot });
    } catch (error) {
        res.status(500).json({ message: "Error creating ballot", error });
    }
};

exports.updateBallot = async (req, res) => {
    try {

        const ballotId = req.params.id;
        const { userId, name, awards} = req.body;
        console.log(ballotId);
        console.log(userId);
        const points = 0;

        // this is a PATCH endpoint
        // here i want to update the Ballot with _id equal to ballotId with the provided userId, name, awards data
        const existingBallot = await Ballot.findById(ballotId);
        if (!existingBallot) {
            return res.status(404).json({ message: "Ballot not found" });
        }

        const updatedBallot = await Ballot.findByIdAndUpdate(
            ballotId,
            { userId, name, awards, points },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: "Ballot updated successfully!", ballot: updatedBallot });
    } catch (error) {
        res.status(500).json({ message: "Error updating ballot", error });
    }
}