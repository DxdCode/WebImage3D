import axios from "axios";
import cloudinary from "../config/cloudinaryConfig.js";
import Image from "../models/imageModel.js";

const headers = { Authorization: `Bearer ${process.env.MESHY_API_TOKEN}` };

export async function crearModelo3D(imagenCloudinary, imageId, ip = null) {
  if (!imagenCloudinary) throw new Error("Debes pasar la URL de la imagen de Cloudinary");

  const payload = {
    image_url: imagenCloudinary,
    enable_pbr: true,
    should_remesh: true,
    should_texture: true,
  };

  try {
    // 1. Inicia la generación del modelo 3D
    const response = await axios.post(
      `${process.env.URL_API_MESHY}image-to-3d`,
      payload,
      { headers }
    );

    const taskId = response?.data?.result;
    if (!taskId) throw new Error("No se obtuvo el ID del modelo 3D");

    console.log("✅ Modelo 3D creado con ID:", taskId);

    // 2. Espera que se genere el modelo
    const modeloFinal = await verificarStatusModelo3D(taskId);

    const glbURL = modeloFinal.model_urls.glb;
    console.log("URL del modelo GLB desde Meshy:", glbURL);

    // 3. Descarga el GLB y súbelo a Cloudinary
    const uploadResult = await new Promise(async (resolve, reject) => {
      const downloadResponse = await axios.get(glbURL, { responseType: "stream" });
      console.log("Descarga del modelo GLB exitosa, tamaño:", downloadResponse.headers['content-length']);

      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "modelos3D",
          public_id: `modelo_${taskId}.glb`,
          format: "glb",
        },
        (error, result) => {
          if (error) {
            console.error("Error en la subida a Cloudinary:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      downloadResponse.data.pipe(stream).on('error', (error) => {
        console.error("Error en el stream de subida:", error);
        reject(error);
      });
    });

    console.log("✅ Modelo 3D subido a Cloudinary:", uploadResult.secure_url);
    console.log("Public ID:", uploadResult.public_id);

    // 4. Guarda los datos en MongoDB
    if (imageId) {
      const imagen = await Image.findById(imageId);

      const updateData = {
        url_model: uploadResult.secure_url,
        public_model_id: uploadResult.public_id,
        task_id: taskId,
      };

      // Si no tiene user asociado, guarda el IP si no se ha guardado
      if (!imagen.user && ip && !imagen.meta?.ip) {
        updateData["meta.ip"] = ip;
      }

      await Image.findByIdAndUpdate(imageId, updateData);
      console.log("✅ Modelo 3D y task_id guardados en la base de datos");
    }

    return {
      status: modeloFinal.status,
      progress: modeloFinal.progress,
      url_model: uploadResult.secure_url,
      public_model_id: uploadResult.public_id,
      task_id: taskId,
    };

  } catch (error) {
    console.error("❌ Error creando o subiendo el modelo 3D:", error.message);
    throw error;
  }
}

// 🔄 Verifica el estado del modelo
export async function verificarStatusModelo3D(idImagen, { retryDelay = 10000, timeout = 900000 } = {}) {
  const startTime = Date.now();

  while (true) {
    try {
      const response = await axios.get(
        `${process.env.URL_API_MESHY}image-to-3d/${idImagen}`,
        { headers }
      );

      const data = response.data;

      if (data.status === "SUCCEEDED") return data;
      if (data.status === "FAILED") throw new Error("La generación del modelo 3D falló");

      const elapsed = Date.now() - startTime;
      if (elapsed > timeout) throw new Error("Tiempo máximo de espera alcanzado");

      console.log(`⏳ Modelo en progreso... ${data.progress}% completado. Reintentando en ${retryDelay / 1000}s`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));

    } catch (error) {
      console.error("❌ Error verificando modelo 3D:", error.message);
      throw error;
    }
  }
}
