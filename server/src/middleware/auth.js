import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, "secret");
    const userId = decodedToken.id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default auth;
