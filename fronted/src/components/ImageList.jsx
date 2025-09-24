import { useEffect, useState } from 'react';
import { useAPI } from '../context/APIContext';

const ImageList = () => {
  const { API_BASE } = useAPI();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadImages = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setImages(data);
      setLoading(false);
    } catch {
      setImages([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
    window.addEventListener('loadImages', loadImages);
    return () => window.removeEventListener('loadImages', loadImages);
  }, []);

  return (
    <section className="mb-8">
      <h2 className="mb-4 pb-2 border-b-2 border-gray-200 text-lg font-semibold">Listado de Imágenes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <p>Cargando...</p>
        ) : images.length === 0 ? (
          <p>Error cargando imágenes</p>
        ) : (
          images.map((img) => (
            <div
              key={img._id}
              className="border rounded-lg p-4 bg-gray-50 text-center transition-transform hover:scale-105 hover:shadow-md"
            >
              <img src={img.url} className="w-full h-40 object-cover rounded" alt="Imagen" />
              <p className="mt-2">
                <b>ID:</b> {img._id}
              </p>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('viewDetail', { detail: img._id }))}
                className="mt-2 bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Ver Detalle
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ImageList;