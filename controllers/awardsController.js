const Award = require("../models/awardModel");

exports.getAwards = async (req, res) => {
    try {
        const awards = await Award.find();
        res.json(awards);
    } catch (error) {
        res.status(500).json({ message: "Error fetching awards", error });
    }
};

exports.createAward = async (req, res) => {
    try {
        const { awardId, name, nominees, winner } = req.body;

        const award = new Award({ awardId, name, nominees, winner });
        await award.save();

        res.status(201).json({ message: "Award created successfully!", award });
    } catch (error) {
        res.status(500).json({ message: "Error creating award", error });
    }
};
