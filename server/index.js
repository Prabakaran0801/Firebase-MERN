import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import userRoutes from "./routes/Users.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// app.use("/user", userRoutes);
app.use(".questions", questionRoutes);
app.use("/answer", answerRoutes);

app.get("/", (req, res) => {
  res.send("This is Question MERN API");
});

mongoose.connect(process.env.MONGO_URL).catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`server running on Port :${PORT}`);
});
