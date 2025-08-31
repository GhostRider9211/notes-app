import express from "express";

import { protect } from "../middleware/auth.middleware.js";

import { registerUser, loginUser, getMe } from "../controller/user.controller.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me",protect, getMe);

export default router;
