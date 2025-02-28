const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Nodemailer Setup (Use Mailtrap or your SMTP service)
const transporter = nodemailer.createTransport({
    service: "gmail", // Use Mailtrap in production or a real SMTP service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.registerUser = async (req, res) => {
    try {
        const { email } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });


        const user = new User({ email });
        await user.save();

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(201).json({
            message: "User registered successfully!",
            token,
            user: { id: user._id, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

exports.loginUser = async (req, res) => {
    console.log("loginUser");
    try {
        const { email, } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");

            const newUser = new User({ email });
            await newUser.save();

            // Generate Access & Refresh Tokens
            const accessToken = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            const refreshToken = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_REFRESH_SECRET, {
                expiresIn: "7d",
            });

            res.json({ accessToken, refreshToken, user: { id: newUser._id, email: newUser.email } });
        }
        else {
            // Generate Access & Refresh Tokens
            const accessToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            const refreshToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_REFRESH_SECRET, {
                expiresIn: "7d",
            });


            res.json({ accessToken, refreshToken, user: { id: user._id, email: user.email } });
        }
    } catch (error) {
        console.error("Error logging in", error);
        res.status(500).json({ message: "Error logging in", error });
    }
};



exports.refreshToken = async (req, res) => {
    console.log("refreshToken");
    console.log(req.body);
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(401).json({ message: "Unauthorized: No refresh token provided" });

        // Verify refresh token
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
            if (err) return res.status(403).json({ message: "Invalid or expired refresh token" });

            // Generate a new access token
            const newAccessToken = jwt.sign({ id: decoded.id, email: decoded.email }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            // Generate a new refresh token
            const newRefreshToken = jwt.sign({ id: decoded.id, email: decoded.email }, process.env.JWT_REFRESH_SECRET, {
                expiresIn: "7d",
            });

            res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
        });

    } catch (error) {
        res.status(500).json({ message: "Error refreshing token", error });
    }
};