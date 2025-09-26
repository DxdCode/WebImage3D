import mongoose from "mongoose";
import cloudinary from "../config/cloudinaryConfig.js";
import Image from "../models/imageModel.js";
import User from "../models/userModel.js";

// Subir imagen
export const uploadImage = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ msg: "No se ha enviado ningún archivo" });

    const userId = req.user?.id || null;

    // Validar que userId sea un ObjectId válido si existe
    if (userId && !mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ msg: "ID de usuario inválido" });
    }

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
      user: userId ? new mongoose.Types.ObjectId(userId) : null,
      meta: {
        ip: req.clientIp || req.ip,
      },
    });

    // Si es usuario registrado, actualizar el contador de imágenes
    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        const count = await Image.countDocuments({ user: user._id });
        user.imagesUploaded = count;
        await user.save();
      }
    }

    return res.status(201).json(newImage);
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    return res.status(500).json({ msg: "Error al subir la imagen" });
  }
};

// Obtener todas las imágenes
export const getImages = async (req, res) => {
  try {
    const userId = req.user?.id || null;
    let images;

    if (userId && mongoose.isValidObjectId(userId)) {
      images = await Image.find({ user: new mongoose.Types.ObjectId(userId) }).lean();
    } else {
      images = await Image.find({ user: null }).lean();
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

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ msg: "ID de imagen inválido" });

    const imagen = await Image.findById(id);
    if (!imagen)
      return res.status(404).json({ msg: "No se encontró la imagen" });

    if (!userId && imagen.user)
      return res.status(403).json({ msg: "No tienes permiso para ver esta imagen" });

    if (userId && imagen.user && imagen.user.toString() !== userId)
      return res.status(403).json({ msg: "No tienes permiso para ver esta imagen" });

    return res.status(200).json(imagen);
  } catch (error) {
    console.error("Error al obtener la imagen:", error);
    return res.status(500).json({ msg: "Error al obtener la imagen" });
  }
};
