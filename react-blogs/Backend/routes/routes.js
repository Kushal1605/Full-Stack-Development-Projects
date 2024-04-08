import express from "express";
import databases from "../database/index.js";

const { User, Blog } = databases;

const router = express.Router();

router.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  try {
    const newUser = new User({
      username,
      password,
      email,
    });
    
    await newUser.save();
    req.session.currUser = newUser;
    res.status(200).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    res.status(409).json({
      user: null,
      message: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      req.session.currUser = user;
  
      res.status(200).json({
        message: "Login successfully",
        user,
      });
    } else {
      res.status(200).json({
        user: null, 
        message: "Invalid username or password",
      })
    }
  } catch (err) {
    res.status(500).json({
      user: null,
      message: err.message,
    });
  }
});

router.post("/logout", (req, res) => {
  try {
    req.session.currUser = null;

    res.status(200).json({
      status: true,
      message: "Logout successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

router.get("/getuser", (req, res) => {
  try {
    const user = req.session.currUser;

    if (user) {
      res.status(200).json({
        user: user,
        message: "User session exists",
      });
    } else {
      res.status(200).json({
        user: null,
        message: "No user session exists",
      });
    }
  } catch (err) {
    res.status(500).json({
      user: null,
      message: err.message,
    });
  }
});

export default router;
