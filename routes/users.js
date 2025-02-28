const express = require("express");
const { loginUser, refreshToken } = require("../controllers/usersController");
const { authLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/login", loginUser);
router.post("/refresh", refreshToken);

module.exports = router;
