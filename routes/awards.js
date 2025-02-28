const express = require("express");
const { getAwards, createAward } = require("../controllers/awardsController");

const router = express.Router();

router.get("/", getAwards);
router.post("/", createAward);

module.exports = router;