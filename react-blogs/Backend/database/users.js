import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/react-blog");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },

  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

export default mongoose.model("User", userSchema);
