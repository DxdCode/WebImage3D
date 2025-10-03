import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Home, Pause, Play } from "lucide-react";

// Modelo 3D
function Modelo({ isPaused }) {
  const { scene } = useGLTF(
    "https://res.cloudinary.com/dqeyggnvv/raw/upload/v1758344848/modelos3D/modelo_01996582-0ea8-7b9c-b0b6-8e56642844fb.glb"
  );
  return (
    <Center>
      <primitive object={scene} scale={1} />
    </Center>
  );
}

export default function LoadingPage() {
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row dark:bg-neutral-900 ">
      
      <div className="lg:w-1/2 w-full h-1/2 lg:h-full flex items-center justify-center  bg-green-900 dark:bg-neutral-900">
        <Canvas className="w-full h-full" camera={{ position: [0, 2, 5], fov: 30 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
          <Suspense fallback={null}>
            <Modelo isPaused={isPaused} />
          </Suspense>
          <OrbitControls enableZoom={true} autoRotate={!isPaused} />
        </Canvas>
      </div>

      <div className="lg:w-1/2 w-full h-1/2 lg:h-full flex items-center justify-center bg-green-900 dark:bg-neutral-900 p-6">
        <div className="flex flex-col items-center text-white text-center">
          
          {/* Título */}
          <h1 className="text-3xl sm:text-4xl font-bold dark:animate-pulse">
            Cargando experiencia 3D...
          </h1>

          {/* Descripción */}
          <p className="mt-3 text-white text-sm sm:text-base">
            Si tienes problemas, usa las opciones abajo
          </p>

          {/* Botones */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-600 hover:bg-neutral-700 rounded text-white font-medium cursor-pointer"
            >
              <RefreshCw size={18} /> Recargar
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium cursor-pointer"
            >
              <Home size={18} /> Inicio
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 rounded text-white font-medium cursor-pointer"
            >
              {isPaused ? <Play size={18} /> : <Pause size={18} />} {isPaused ? "Reanudar" : "Pausar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
