import { useState } from 'react';
import { useAPI } from '../context/APIContext';

const UploadSection = () => {
  const { API_BASE } = useAPI();
  const [uploadMsg, setUploadMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setUploadMsg('Subiendo...');
    try {
      const res = await fetch(API_BASE, { method: 'POST', body: formData });
      await res.json();
      setUploadMsg('Subida OK');
      window.dispatchEvent(new Event('loadImages'));
    } catch (err) {
      setUploadMsg(`Error: ${err}`);
    }
  };

  return (
    <section className="mb-8">
      <h2 className="mb-4 pb-2 border-b-2 border-gray-200 text-lg font-semibold">Subir Imagen</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input type="file" name="image" required className="border rounded p-2" />
        <button
          type="submit"
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Subir
        </button>
      </form>
      <p>{uploadMsg}</p>
    </section>
  );
};

export default UploadSection;