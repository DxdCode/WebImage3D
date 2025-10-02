import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Pause, Play, PlayCircle } from 'lucide-react';
import RotatingModel from './RotatingModel';

const Hero = () => {
    const [isPaused, setIsPaused] = useState(false);

    return (
        <section className="flex flex-col md:flex-row items-center w-full h-auto md:h-[93vh] px-4 md:px-28 md:py-0">
            {/* Texto */}
            <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left mb-6 md:mb-0 pt-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Genera Modelos 3D al Instante</h2>
                <p className="text-base md:text-lg mb-4 md:mb-6 max-w-md md:max-w-lg">
                    Convierte tus ideas en modelos 3D usando nuestra API de MesHy. Rápido, limpio y profesional.
                </p>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                        onClick={() => alert('Generando modelo 3D...')}
                        className="flex items-center gap-2 px-6 py-3 rounded-md bg-black/80 text-white dark:bg-gray-700 hover:scale-105 transition w-full sm:w-auto justify-center"
                    >
                        <PlayCircle size={18} />
                        Generar Ahora
                    </button>

                    <button
                        onClick={() => setIsPaused(!isPaused)}
                        className="flex items-center gap-2 px-6 py-3 rounded-md bg-black/80 text-white dark:bg-gray-700 hover:scale-105 transition w-full sm:w-auto justify-center"
                    >
                        {isPaused ? <Play size={18} /> : <Pause size={18} />}
                        {isPaused ? "Reanudar animación" : "Pausar animación"}
                    </button>
                </div>
            </div>

            {/* Modelo 3D */}
            <div className="md:w-1/2 w-full h-80 md:h-full flex items-center justify-center">
                <Canvas camera={{ position: [0, 2, 5], fov: 30 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={0.6} />
                    <Suspense fallback={null}>
                        <Stage intensity={0.6} shadows="contact">
                            <RotatingModel
                                url="https://res.cloudinary.com/dqeyggnvv/raw/upload/v1758859548/modelos3D/modelo_019983e4-d775-76e1-b33a-95aa8ae30062.glb"
                                isPaused={isPaused}
                            />
                        </Stage>
                    </Suspense>
                    <OrbitControls enableZoom={true} />
                </Canvas>
            </div>
        </section>
    );
};

export default Hero;
