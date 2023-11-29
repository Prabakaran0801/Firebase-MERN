import express from "express";

import {
  askQuestion,
  deleteQuestion,
  getAllQuestion,
} from "../controllers/Questions.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", auth, askQuestion);
router.get("/details", getAllQuestion);
router.delete("/delete/:id", auth, deleteQuestion);

export default router;
