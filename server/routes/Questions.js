import express from "express";

import {
  askQuestion,
  deleteQuestion,
  getAllQuestion,
} from "../controllers/Questions.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/Ask", auth, askQuestion);
router.get("All", getAllQuestion);
router.delete("/delete/:id", auth, deleteQuestion);

export default router;
