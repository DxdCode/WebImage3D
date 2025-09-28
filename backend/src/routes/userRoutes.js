import express from "express";
import { createUser,  refreshToken, logoutUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// Registro 
router.post("/register", createUser);
router.post("/login", loginUser);

// Refrescar token
router.post("/refresh", refreshToken);

// Cerrar sesión
router.post("/logout", logoutUser);


export default router;
