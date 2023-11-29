import express, { response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
// import userRoutes from "./routes/Users.js";
import connectDB from "./config/connectDb.js";
import questionModel from "./models/Questions.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);

app.get("/", (req, res) => {
  res.send("This is Question MERN API");
});
app.get("/question", (req, res) => {
  questionModel
    .find()
    .then((questions) => res.json(questions))
    .catch((err) => res.json(err));
});

// Handle POST request
app.post("/question", express.json(), async (req, res) => {
  try {
    const requestData = req.body;
    await questionModel.insertMany([requestData]);
    const responseData = { status: "success" };
    console.log("Received data from the frontend:", requestData);
    res.json(responseData);
  } catch (error) {
    console.error("Error processing data :", error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`server running on Port :${PORT}`);
});
