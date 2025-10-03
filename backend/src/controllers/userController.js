import User from "../models/userModel.js";
import Image from "../models/imageModel.js";
import { setAuthCookies, clearAuthCookies, handleRefreshToken } from "../middlewares/authMiddleware.js";

// Crear usuario
export const createUser = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;
    if (!nombre || !correo || !password)
      return res.status(400).json({ msg: "Faltan campos obligatorios" });

    const userExists = await User.findOne({ correo });
    if (userExists) return res.status(400).json({ msg: "El usuario ya existe" });

    const newUser = await User.create({ nombre, correo, password });

    // Asignar imágenes si existen
    const ip = req.clientIp || req.ip;
    const userAgent = req.headers["user-agent"] || "unknown";
    await Image.updateMany(
      { user: null, "meta.ip": ip, "meta.userAgent": userAgent },
      { user: newUser._id }
    );

    setAuthCookies(res, newUser._id);
    return res.status(201).json({ msg: "Cuenta creada con éxito", user: { ...newUser._doc, password: undefined } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al crear usuario" });
  }
};

// Login usuario
export const loginUser = async (req, res) => {
  try {
    const { correo, password } = req.body;
    if (!correo || !password) return res.status(400).json({ msg: "Faltan campos" });

    const user = await User.findOne({ correo });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ msg: "Contraseña incorrecta" });

    setAuthCookies(res, user._id);
    console.log('Cookies establecidos para usuario:', user._id); 
    return res.status(200).json({ msg: "Login exitoso", user: { ...user._doc, password: undefined } });
  } catch (error) {
    console.error('Error en loginUser:', error); 
    return res.status(500).json({ msg: "Error al iniciar sesión" });
  }
};

// Refresh token
export const refreshToken = (req, res) => handleRefreshToken(req, res);

// Logout
export const logoutUser = (req, res) => {
  clearAuthCookies(res);
  return res.json({ msg: "Sesión cerrada" });
};

// Verificar autenticación
export const verifyAuth = async (req, res) => {
  return res.status(200).json({ msg: "Token válido", user: req.user });
};
