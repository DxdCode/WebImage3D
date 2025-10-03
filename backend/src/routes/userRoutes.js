import express from "express";
import { createUser, refreshToken, logoutUser, loginUser, verifyAuth } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Registro y login (rutas públicas)
router.post("/register", createUser);
router.post("/login", loginUser);

// Refrescar token (ruta pública)
router.get("/refresh", refreshToken);

// Rutas protegidas
router.get("/verify", authMiddleware, verifyAuth);
router.post("/logout", authMiddleware, logoutUser);


export default router;
