require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const { generalLimiter } = require("./middleware/rateLimiter");

connectDB();

const usersRoutes = require("./routes/users");
const awardsRoutes = require("./routes/awards");
const ballotsRoutes = require("./routes/ballots");

const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "*", // Allow frontend domain
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(generalLimiter);

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/awards", awardsRoutes);
app.use("/api/ballots", ballotsRoutes);

// Sample Route
app.get("/", (req, res) => {
  res.send("Welcome to the City Awards API!");
});

// Start Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});