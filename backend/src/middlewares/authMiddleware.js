import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No autorizado, token faltante" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No autorizado, token inválido" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ msg: "Token inválido" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ msg: "Usuario no encontrado" });

    req.user = user;
    next();

  } catch (error) {
    console.error("authMiddleware:", error.message);
    return res.status(401).json({ msg: "Token inválido o expirado" });
  }
};
