import express from "express";
import { createUser, getUsers, getUser, deleteUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Registro público
router.post("/", createUser);

// Rutas protegidas
router.get("/", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
