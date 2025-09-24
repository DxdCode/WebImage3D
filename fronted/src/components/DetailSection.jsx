import { useEffect, useState, useRef } from 'react';
import { useAPI } from '../context/APIContext';
import ThreeViewer from './ThreeViewer';

const DetailSection = () => {
  const { API_BASE } = useAPI();
  const [detail, setDetail] = useState(null);
  const [show3D, setShow3D] = useState(false);
  const [generating, setGenerating] = useState(false);
  const canvasRef = useRef(null);

  const viewDetail = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`);
      const data = await res.json();
      setDetail(data);
      setShow3D(data.url_model ? true : false);
    } catch (err) {
      console.error('Error al cargar detalle:', err);
    }
  };

  const handleGenerate = async () => {
    if (!detail?._id) return alert('Selecciona primero una imagen');
    setGenerating(true);
    try {
      const res = await fetch(`${API_BASE}/generate/${detail._id}`, { method: 'POST' });
      const data = await res.json();
      if (data.url_model) {
        setDetail((prev) => ({ ...prev, url_model: data.url_model }));
        setShow3D(true);
      }
    } catch (err) {
      alert('Error generando modelo 3D');
    }
    setGenerating(false);
  };

  useEffect(() => {
    const handleViewDetail = (e) => viewDetail(e.detail);
    window.addEventListener('viewDetail', handleViewDetail);
    return () => window.removeEventListener('viewDetail', handleViewDetail);
  }, []);

  if (!detail) return null;

  return (
    <section className="mb-8">
      <h2 className="mb-4 pb-2 border-b-2 border-gray-200 text-lg font-semibold">Detalle</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full h-96 bg-gray-200 rounded-lg relative">
          <canvas
            ref={canvasRef}
            className={`w-full h-full rounded-lg ${show3D ? 'block' : 'hidden'}`}
          />
          <img
            src={detail.url}
            className={`w-full h-full object-contain rounded-lg ${show3D ? 'hidden' : 'block'}`}
            alt="Detalle"
          />
          {show3D && <ThreeViewer canvasRef={canvasRef} modelUrl={detail.url_model} />}
        </div>
        <div>
          <h3 className="text-xl font-semibold">Auriculares inalámbricos SoundPro 300</h3>
          <p className="text-lg text-blue-800">
            $42.87
            <span className="line-through text-gray-500 ml-2">$51.44</span>
            <span className="text-green-600 font-bold ml-2">20% OFF</span>
          </p>
          <p className="my-2">Auriculares Bluetooth con cancelación activa de ruido y batería de larga duración.</p>
          <p className="my-2">
            <b>Disponibilidad:</b> Agotado
          </p>
          <p className="my-2 text-gray-600">
            <b>Vendedor:</b> Vendedor Poliventas — <b>Vendidos:</b> 28
          </p>
          <div className="mt-4 flex items-center gap-2">
            <label>Cantidad:</label>
            <input
              type="number"
              defaultValue="1"
              min="1"
              className="w-16 border rounded p-1"
            />
            <button className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600">
              Agregar al carrito
            </button>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setShow3D(false)}
              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Ver Imagen
            </button>
            <button
              onClick={() => setShow3D(true)}
              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Ver Modelo 3D
            </button>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {generating ? 'Generando...' : 'Generar Modelo'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailSection;