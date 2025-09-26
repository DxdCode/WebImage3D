import express from "express";
import { createUser, getUsers, getUser, deleteUser, loginUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Registro público
router.post("/register", createUser);
router.post("/login", loginUser);


// Rutas protegidas
router.get("/", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
