import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
};

const ACCESS_EXPIRES = "15m";
const REFRESH_EXPIRES = "7d";

export const createAccessToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_EXPIRES });

export const createRefreshToken = (payload) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });

export const setAuthCookies = (res, userId) => {
  const accessToken = createAccessToken({ id: userId });
  const refreshToken = createRefreshToken({ id: userId });

  res.cookie("access_token", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
  res.cookie("refresh_token", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
};

export const clearAuthCookies = (res) => {
  res.clearCookie("access_token", { ...cookieOptions });
  res.clearCookie("refresh_token", { ...cookieOptions });
};

export const authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.access_token;

    if (!accessToken) return res.status(401).json({ msg: "No autorizado, token faltante" });

    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
      req.user = user;
      return next();
    } catch {
      const refreshToken = req.cookies?.refresh_token;
      if (!refreshToken) return res.status(401).json({ msg: "Access token expirado y no hay refresh token" });

      try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

        const newAccessToken = createAccessToken({ id: user._id });
        res.cookie("access_token", newAccessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });

        req.user = user;
        return next();
      } catch {
        return res.status(401).json({ msg: "Ambos tokens son inválidos" });
      }
    }
  } catch (error) {
    console.error("Error en authMiddleware:", error);
    return res.status(401).json({ msg: "Error de autenticación" });
  }
};

export const handleRefreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refresh_token;
    if (!token) {
      clearAuthCookies(res);
      return res.status(401).json({ msg: "Refresh token faltante" });
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      clearAuthCookies(res);
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    setAuthCookies(res, user._id);
    return res.json({ msg: "Tokens renovados", user });
  } catch (error) {
    clearAuthCookies(res);
    return res.status(401).json({ msg: "Refresh token inválido" });
  }
};