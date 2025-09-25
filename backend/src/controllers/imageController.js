import mongoose from "mongoose";
import cloudinary from "../config/cloudinaryConfig.js";
import Image from "../models/imageModel.js";

// Subir imagen
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No se ha enviado ningún archivo" });

    const userId = req.user?.id || null; // dueño si está autenticado

    const streamUpload = (buffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "uploads", format: "webp", quality: "auto" },
          (error, result) => (result ? resolve(result) : reject(error))
        );
        stream.end(buffer);
      });

    const result = await streamUpload(req.file.buffer);

    const newImage = await Image.create({
      title: req.body.title || "Imagen subida",
      url: result.secure_url,
      public_id: result.public_id,
      user: userId ? mongoose.Types.ObjectId(userId) : null,
      meta: {
        ip: req.clientIp || req.ip,
        userAgent: req.headers["user-agent"] || "unknown",
      },    });

    return res.status(201).json(newImage);
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    return res.status(500).json({ msg: "Error al subir la imagen" });
  }
};

// Obtener imágenes
export const getImages = async (req, res) => {
  try {
    const userId = req.user?.id || null;
    let images;

    if (userId) {
      images = await Image.find({ user: mongoose.Types.ObjectId(userId) });
    } else {
      images = await Image.find({ user: null });
    }

    if (!images || images.length === 0)
      return res.status(200).json({ msg: "No existen imágenes" });

    return res.status(200).json(images);
  } catch (error) {
    console.error("Error al obtener imágenes:", error);
    return res.status(500).json({ msg: "Error al obtener imágenes" });
  }
};

// Obtener una imagen por ID
export const getOneImage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || null;

    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ msg: "ID inválido" });

    const imagen = await Image.findById(id);
    if (!imagen) return res.status(404).json({ msg: "No se encontró la imagen" });

    // Validar acceso
    if (!userId && imagen.user)
      return res.status(403).json({ msg: "No tienes permiso para ver esta imagen" });

    if (userId && imagen.user && imagen.user.toString() !== userId)
      return res.status(403).json({ msg: "No tienes permiso para ver esta imagen" });

    return res.status(200).json(imagen);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al obtener la imagen" });
  }
};
