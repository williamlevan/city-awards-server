const rateLimit = require("express-rate-limit");

// Limit requests for login and password reset
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: { message: "Too many requests from this IP, please try again later." },
    headers: true,
});

// Limit general API requests to avoid excessive traffic
const generalLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { message: "Too many requests, slow down!" },
    headers: true,
});

module.exports = { authLimiter, generalLimiter };
