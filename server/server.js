import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import verifyToken from "./src/routes/users.js";
import auth from "./src/middleware/auth.js";
import UserModel from "./src/models/User.js";
import { Record } from "./src/models/ListeningLevel.js";

import { userRouter } from "./src/routes/users.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

//define routes
app.use("/auth", userRouter);

// Record a listening level for the user
app.post("/record", verifyToken, async (req, res) => {
  try {
    const { level, response1, response2 } = req.body;
    if (!level || !response1 || !response2) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    const record = new Record({
      user: req.user._id,
      level,
      response1,
      response2,
    });
    await record.save();

    res.json(record);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get daily records for the user
app.get("/records", verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const records = await Record.find({
      user: user._id,
      date: {
        $gte: today,
      },
    });

    res.json(records);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Set up MongoDB connection
mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
