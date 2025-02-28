const express = require("express");
const { getBallots, getBallot, createBallot, updateBallot } = require("../controllers/ballotsController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getBallots);
router.get("/:id", protect, getBallot);
router.post("/", protect, createBallot);
router.patch("/:id", protect, updateBallot);

module.exports = router;
