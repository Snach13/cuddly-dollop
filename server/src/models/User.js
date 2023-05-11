import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  username: String,
  email: { type: String, unique: true },
  password: String,
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
