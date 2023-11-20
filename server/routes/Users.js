import express from "express";
import { register, login } from "../controllers/auth";
import { getAllUsers, updateProfile } from "../controllers/users";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/getAllUsers", getAllUsers);
router.patch("/update/:id", auth, updateProfile);

export default router;
