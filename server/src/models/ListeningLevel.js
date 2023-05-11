import mongoose from "mongoose";

const listeningLevelSchema = new mongoose.Schema({
  level: {
    type: String,
    // enum: ["internal", "focused", "global"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  response1: {
    type: String,
    required: true,
  },
  response2: {
    type: String,
    required: true,
  },
});

const ListeningLevel = mongoose.model("ListeningLevel", listeningLevelSchema);

export { ListeningLevel as Record };
