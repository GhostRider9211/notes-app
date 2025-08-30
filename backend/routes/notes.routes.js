import express from "express";  
import { protect } from "../middleware/auth.middleware.js";
import { createNote, getNotes, getNoteById, updateNote, deleteNote } from "../controller/note.controller.js";
const router = express.Router();

router.get("/", protect, getNotes);
router.get("/:id", protect, getNoteById);
router.post("/", protect, createNote);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

export default router;
