import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB server
mongoose.connect()

// Create schema for blogs
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: String,
})

const Blog = mongoose.model('Blog', blogSchema)


// Route to render the main page
app.get("/", async (req, res) => {
  try {
    const allPosts = await Blog.find({});
    res.render("index.ejs", { posts: allPosts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Route to render the edit page
app.get("/new", (req, res) => {
  res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
});

app.get("/edit/:id", async (req, res) => {
  try {
    const specificPost = await Blog.findOne({ _id: req.params.id })
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: specificPost,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post"});
  }
});

// Create a new post
app.post("/api/posts", async (req, res) => {
  try {
    const newPost = new Blog({
      title : req.body.title,
      content : req.body.content,
      author : req.body.author,
      date: new Date().toLocaleString("en-US"),
    })
    newPost.save()
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" + error.message });
  }
});

// Partially update a post
app.post("/api/posts/:id", async (req, res) => {
  try {
    const postToUpdate = await Blog.findOne({ _id: req.params.id})
    // Updating the post.
    if(req.body.title) postToUpdate.title = req.body.title
    if(req.body.content) postToUpdate.content = req.body.content
    if(req.body.author) postToUpdate.author = req.body.author
    postToUpdate.save()
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

// Delete a post
app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    await Blog.deleteOne({ _id: req.params.id })
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
