import mongoose from "mongoose";
import { crearModelo3D } from "../utils/apis.js"; 
import Image from "../models/imageModel.js";
import IpBlock from "../models/ipBlockModel.js";
import User from "../models/userModel.js";

export const generarModelo3D = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || null; 
    const ip = req.clientIp || req.ip;

    // Validar ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msg: "ID de imagen inválido" });
    }

    // Buscar imagen
    const imagen = await Image.findById(id);
    if (!imagen) {
      return res.status(404).json({ msg: "Imagen no encontrada" });
    }

    // Control de acceso para invitados
    if (!userId) {
      if (imagen.user) {
        return res.status(403).json({ msg: "Esta imagen pertenece a un usuario registrado" });
      }

      if (imagen.url_model) {
        await IpBlock.create({ ip, type: "generate" });
        return res.status(403).json({
          msg: "Ya generaste un modelo como invitado. Regístrate para continuar."
        });
      }
    } else {
      // Validar límite de modelos para usuarios
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

      if (user.modelsCreated >= 3) {
        return res.status(403).json({ msg: "Has alcanzado el límite de 3 modelos 3D generados." });
      }
    }

    // Crear modelo 3D
    let resultado;
    try {
      resultado = await crearModelo3D(imagen.url, id);
    } catch (err) {
      console.error("Error en crearModelo3D:", err.message);
      return res.status(500).json({ msg: "Error generando el modelo 3D", error: err.message });
    }

    // Actualizar contador de modelos del usuario
    if (userId) {
      const user = await User.findById(userId);
      user.modelsCreated = (user.modelsCreated || 0) + 1;
      await user.save();
    }

    return res.status(200).json({
      msg: userId ? "Modelo 3D generado correctamente" : "Modelo 3D generado como invitado",
      data: resultado,
    });

  } catch (error) {
    console.error("Error general en generarModelo3D:", error.message);
    return res.status(500).json({ msg: "Error del servidor", error: error.message });
  }
};
