import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useGLTF, Center } from '@react-three/drei';
import { Suspense } from 'react';

export default function Model3DViewer({ isGenerating }) {
  // Carga el modelo GLB
  const Model = () => {
    const { scene } = useGLTF(
      'https://res.cloudinary.com/dqeyggnvv/raw/upload/v1758863155/modelos3D/modelo_01998465-f57a-78ba-a6b1-11f55c08444e.glb'
    );
    return <primitive object={scene} scale={2} />;
  };

  const LoadingBox = () => (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3b82f6" wireframe />
    </mesh>
  );

  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        <OrbitControls enableZoom enablePan enableRotate minDistance={3} maxDistance={10} />

        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.3} />

        <Suspense fallback={<LoadingBox />}>
          {isGenerating ? <LoadingBox /> : <Model />}
          <Environment preset="studio" />
        </Suspense>

        <gridHelper args={[20, 20, '#444444', '#222222']} />
      </Canvas>
    </div>
  );
}
