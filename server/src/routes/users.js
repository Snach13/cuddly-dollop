import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  const user = await UserModel.findOne({
    email,
  });

  if (user) {
    return res.json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ username, email, password: hashedPassword });
  newUser.save();
  res.json(newUser);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "User Doesnt Exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: "Username or Password Is incorrect" });
  }

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

export { router as userRouter };

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, "secret");
    const userId = decodedToken.id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return next(new Error("User not found"));
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default verifyToken;
