import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

const ACCESS_EXPIRES = "15m";
const REFRESH_EXPIRES = "7d";

// Crear tokens
export const createAccessToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_EXPIRES });

export const createRefreshToken = (payload) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });

// Middleware para proteger rutas
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) return res.status(401).json({ msg: "No autorizado, token faltante" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) return res.status(401).json({ msg: "Token inválido" });

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido o expirado" });
  }
};

// Manejo de cookies en login/registro
export const setAuthCookies = (res, userId) => {
  const accessToken = createAccessToken({ id: userId });
  const refreshToken = createRefreshToken({ id: userId });

  res.cookie("access_token", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
  res.cookie("refresh_token", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
};

// Refresh token
export const handleRefreshToken = (req, res) => {
  const token = req.cookies?.refresh_token;
  if (!token) return res.status(401).json({ msg: "Refresh token faltante" });

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Refresh token inválido" });

    const newAccessToken = createAccessToken({ id: decoded.id });
    res.cookie("access_token", newAccessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });

    return res.json({ msg: "Access token renovado" });
  });
};

// Logout
export const clearAuthCookies = (res) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
};
