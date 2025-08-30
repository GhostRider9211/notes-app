import User from "../models/user.model.js";

import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username);

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);
    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,

      token,
    });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id);
        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            token
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getMe = async (req, res) => {
    res.status(200).json(req.user);
};
