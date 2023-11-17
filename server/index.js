import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
// import cors from "cors";
import dotenv from "dotenv";
// import multer from "multer";
// import helmet from "helmet";

const app = express();
dotenv.config();
const PORT = 10000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => app.listen(`${PORT}`))
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

// app.listen(PORT, () => console.log(`server Port :${PORT}`));
