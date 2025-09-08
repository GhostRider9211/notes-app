import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/auth.routes.js";   // updated import
import noteRoutes from "./routes/notes.routes.js";   // updated import
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

const __dirname = path.resolve();

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}


app.listen(5000);
connectDB();

// app.listen(PORT, () => {
//   console.log(`Server started at:http://localhost:${PORT}`);
//   // connectDB();
// });
