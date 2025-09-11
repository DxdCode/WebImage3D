import mongoose from "mongoose";
import cloudinary from "../config/cloudinaryConfig.js";
import Image from "../models/imageModel.js";
import {removeBackground} from '@imgly/background-removal-node'
import { Blob } from "buffer";


// Subir imagen
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No se ha enviado ningún archivo" });
    }

    // 🔹 Convertir a PNG para compatibilidad
    const inputBuffer = await sharp(req.file.buffer).png().toBuffer();

    // 🔹 Eliminar fondo directamente desde buffer
    const outputBuffer = await removeBackground(inputBuffer);

    // 🔹 Subir a Cloudinary desde buffer
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${outputBuffer.toString("base64")}`,
      { folder: "uploads" }
    );

    // 🔹 Guardar en MongoDB
    const newImage = await Image.create({
      url: result.secure_url,
      public_id: result.public_id,
    });

    return res.status(201).json(newImage);

  } catch (error) {
    console.error("Error al subir la imagen:", error);
    return res.status(500).json({
      msg: "Error al subir la imagen con fondo eliminado",
      error: error.message,
    });
  }
};
// Obtener imágenes
export const getImages = async (req, res) => {
  try {
    const images = await Image.find();
    if (images.length === 0) {
      return res.status(200).json({ msg: "No existen imágenes" });
    }
    return res.status(200).json(images);
  } catch (error) {
    return res.status(500).json({ msg: "Error al obtener imágenes" });
  }
};

// Obtener una imagen por ID
export const getOneImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ msg: "ID inválido" });

    const imagen = await Image.findById(id);
    if (!imagen) return res.status(404).json({ msg: "No se encontró la imagen" });

    return res.status(200).json(imagen.url);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al obtener la imagen" });
  }
};