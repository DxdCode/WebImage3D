
import IpBlock from "../models/ipBlockModel.js";
import Image from "../models/imageModel.js";

// Limitar subida de imagen
export const checkUploadLimit = async (req, res, next) => {
  try {
    const ip = req.clientIp || req.ip;
    const userAgent = req.headers["user-agent"] || "unknown";
    const userId = req.user?.id || null;

    if (userId) return next(); // Usuarios registrados no tienen límite

    const isBlocked = await IpBlock.findOne({ ip, userAgent, type: "upload" });
    if (isBlocked) {
      return res.status(403).json({
        msg: "Ya subiste una imagen como invitado. Crea una cuenta para continuar."
      });
    }

    const yaSubio = await Image.findOne({
      user: null,
      "meta.ip": ip,
      "meta.userAgent": userAgent
    });

    if (yaSubio) {
      await IpBlock.create({ ip, userAgent, type: "upload" });
      return res.status(403).json({
        msg: "Ya subiste una imagen como invitado. Crea una cuenta para continuar."
      });
    }

    next();
  } catch (error) {
    console.error("Error en checkUploadLimit:", error.message);
    return res.status(500).json({ msg: "Error verificando límite de subida" });
  }
};

// Limitar generación de modelo
export const checkModelLimit = async (req, res, next) => {
  try {
    const ip = req.clientIp || req.ip;
    const userAgent = req.headers["user-agent"] || "unknown";
    const userId = req.user?.id || null;

    if (userId) return next();

    const isBlocked = await IpBlock.findOne({ ip, userAgent, type: "generate" });
    if (isBlocked) {
      return res.status(403).json({
        msg: "Ya generaste un modelo 3D como invitado. Crea una cuenta para continuar."
      });
    }

    const yaGenero = await Image.findOne({
      user: null,
      "meta.ip": ip,
      "meta.userAgent": userAgent,
      url_model: { $exists: true }
    });

    if (yaGenero) {
      await IpBlock.create({ ip, userAgent, type: "generate" });
      return res.status(403).json({
        msg: "Ya generaste un modelo 3D como invitado. Crea una cuenta para continuar."
      });
    }

    next();
  } catch (error) {
    console.error("Error en checkModelLimit:", error.message);
    return res.status(500).json({ msg: "Error verificando límite de generación" });
  }
};
