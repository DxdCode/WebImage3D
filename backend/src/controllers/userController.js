import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import IpBlock from "../models/ipBlockModel.js";
import Image from "../models/imageModel.js";

// Crear usuario
export const createUser = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    if (!nombre || !correo || !password) {
      return res.status(400).json({ msg: "Faltan campos obligatorios" });
    }

    const userExists = await User.findOne({ correo });
    if (userExists) return res.status(400).json({ msg: "El usuario ya existe con ese correo" });

    const newUser = await User.create({ nombre, correo, password });

    const ip = req.clientIp || req.ip;
    const userAgent = req.headers["user-agent"] || "unknown";


    await Image.updateMany(
      { user: null, "meta.ip": ip, "meta.userAgent": userAgent },
      { user: newUser._id }
    );

    // 🔐 Crear JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.status(201).json({
      msg: "Cuenta creada con éxito",
      user: newUser,
      token,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al crear usuario" });
  }
};
// Login usuario
export const loginUser = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) return res.status(400).json({ msg: "Faltan campos obligatorios" });

    const user = await User.findOne({ correo });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ msg: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.status(200).json({ user, token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al iniciar sesión" });
  }
};

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al obtener usuarios" });
  }
};

// Obtener un usuario por ID
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ msg: "ID inválido" });

    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al obtener usuario" });
  }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ msg: "ID inválido" });

    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    return res.status(200).json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al eliminar usuario" });
  }
};
