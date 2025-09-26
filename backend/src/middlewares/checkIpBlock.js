import IpBlock from "../models/ipBlockModel.js";
import Image from "../models/imageModel.js";
import User from "../models/userModel.js";

// Obtener IP confiable
const obtenerIpConfiable = (req) => {
  const forwardedFor = req.headers["x-forwarded-for"];
  const cloudflareIp = req.headers["cf-connecting-ip"];
  return forwardedFor
    ? forwardedFor.split(",")[0].trim()
    : cloudflareIp || req.ip || "desconocida";
};

// Límite de subida de imágenes
export const checkUploadLimit = async (req, res, next) => {
  try {
    const ip = obtenerIpConfiable(req);
    const userId = req.user?.id || null;

    if (userId) {
      // Contar imágenes subidas por usuario
      const count = await Image.countDocuments({ user: userId });
      if (count >= 3) {
        return res.status(403).json({
          msg: "Has alcanzado el límite de 3 imágenes subidas."
        });
      }
      return next();
    }

    // Invitados: bloqueo inmediato si ya subieron
    const bloqueada = await IpBlock.findOne({ ip, type: "upload" });
    if (bloqueada) {
      return res.status(403).json({
        msg: "Tu IP está bloqueada para subir imágenes como invitado."
      });
    }

    const yaSubio = await Image.findOne({ user: null, "meta.ip": ip });
    if (yaSubio) {
      await IpBlock.create({ ip, type: "upload" });
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

// Límite de generación de modelos 3D
export const checkModelLimit = async (req, res, next) => {
  try {
    const ip = obtenerIpConfiable(req);
    const userId = req.user?.id || null;

    if (userId) {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

      if (user.modelsCreated >= 3) {
        return res.status(403).json({
          msg: "Has alcanzado el límite de 3 modelos 3D generados."
        });
      }
      return next();
    }

    // Invitados: bloqueo inmediato si ya generaron
    const bloqueada = await IpBlock.findOne({ ip, type: "generate" });
    if (bloqueada) {
      return res.status(403).json({
        msg: "Tu IP está bloqueada para generar modelos 3D como invitado."
      });
    }

    const yaGenero = await Image.findOne({
      user: null,
      "meta.ip": ip,
      url_model: { $exists: true }
    });

    if (yaGenero) {
      await IpBlock.create({ ip, type: "generate" });
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
