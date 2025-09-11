import cloudinary from "../config/cloudinaryConfig.js";
import Image from "../models/imageModel.js";
import fs from "fs";

// Subir imagen
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No se ha enviado ningún archivo" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads",
    });

    const newImage = await Image.create({
      url: result.secure_url,
      public_id: result.public_id,
    });

    fs.unlinkSync(req.file.path); 

    return res.status(201).json(newImage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al subir la imagen" });
  }
};

// Obtener imágenes
export const getImages = async (req, res) => {
  try {
    const images = await Image.find();
    if(images.length === 0){
      return res.status(200).json({ msg: "No existen imágenes" }); 
    }
    return res.status(200).json(images);
  } catch (error) {
    return res.status(500).json({ msg: "Error al obtener imágenes" });
  }
};
