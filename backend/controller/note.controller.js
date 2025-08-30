import Note from "../models/user.model.js";

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ createdBy: req.user._id });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Get notes error:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

export const createNote = async (req, res) => {
    const { title, description } = req.body;

    try {
        const note = await Note.create({
            title,
             description,
            createdBy: req.user._id
        });
        res.status(201).json(note);
    } catch (error) {
        console.error("Create note error:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

export const deleteNote = async (req, res) => {
    const { id } = req.params;

    try {
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        if (note.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await note.deleteOne();
        res.status(204).json({ message: "Note deleted" });
    } catch (error) {
        console.error("Delete note error:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

export const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        if (note.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        note.title = title;
        note.description = description;
        await note.save();

        res.status(200).json(note);
    } catch (error) {
        console.error("Update note error:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};
export const getNoteById = async (req, res) => {
    const { id } = req.params;

    try {
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        if (note.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        res.status(200).json(note);
    } catch (error) {
        console.error("Get note by ID error:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};
