import mongoose from "mongoose";
import { crearModelo3D } from "../utils/apis.js";
import Image from "../models/imageModel.js";

export async function generarmodelo3D(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ msg: "ID inválido" });

    const imagen = await Image.findById(id);
    if (!imagen) return res.status(404).json({ msg: "No se encontró la imagen" });

    const resultado = await crearModelo3D(imagen.url, id);

    return res.status(200).json({
      msg: "Modelo 3D generado correctamente",
      data: resultado,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al generar el modelo 3D" });
  }
}
