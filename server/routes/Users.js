import express from "express";
import { register, login } from "../controllers/auth.js";
import { getAllusers, updateProfile } from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/getAllusers", getAllusers);
router.patch("/update/:id", auth, updateProfile);

export default router;
