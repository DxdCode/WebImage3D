import mongoose from "mongoose";
import cloudinary from "../config/cloudinaryConfig.js";
import Image from "../models/imageModel.js";
import { removeBackground } from '@imgly/background-removal-node'
import { Blob } from "buffer";


// Subir imagen
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No se ha enviado ningún archivo" });
    }

    const imageBlob = new Blob([req.file.buffer], { type: req.file.mimetype });

    const resultBlob = await removeBackground(imageBlob);

    const processedBuffer = Buffer.from(await resultBlob.arrayBuffer());

    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "uploads",
            format: "webp",      
            quality: "auto"     
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(buffer);
      });
    };

    const result = await streamUpload(processedBuffer);

    const newImage = await Image.create({
      url: result.secure_url,
      public_id: result.public_id,
    });

    return res.status(201).json(newImage);

  } catch (error) {
    return res.status(500).json({ msg: "Error al subir la imagen " })
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

    console.log(imagen)
    return res.status(200).json(imagen);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al obtener la imagen" });
  }
};