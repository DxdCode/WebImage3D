import api from "../utils/api";

// Subir una imagen
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await api.post("/images", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Obtener todas las imágenes
export const getImages = async () => {
  const res = await api.get("/images");
  return res.data;
};

// Obtener una imagen por ID
export const getOneImage = async (id) => {
  const res = await api.get(`/images/${id}`);
  return res.data;
};

// Generar modelo 3D a partir de una imagen
export const generateModel = async (id) => {
  const res = await api.post(`/images/generate/${id}`);
  return res.data;
};
