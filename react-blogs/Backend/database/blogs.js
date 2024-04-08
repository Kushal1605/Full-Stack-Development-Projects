import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },

  content: {
    type: String,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  featuredImage: {
    type: String,
    trim: true,
  },
});

export default mongoose.model("Blog", blogSchema);
