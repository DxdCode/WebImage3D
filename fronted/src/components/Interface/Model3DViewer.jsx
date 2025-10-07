import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useGLTF } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';

export default function Model3DViewer({ isGenerating, cameraMode, lightingOn, resetFlag }) {
  const Model = () => {
    const { scene } = useGLTF(
      'https://res.cloudinary.com/dqeyggnvv/raw/upload/v1758863155/modelos3D/modelo_01998465-f57a-78ba-a6b1-11f55c08444e.glb'
    );

    return <primitive object={scene} scale={1} position={[0, 1, 0]} />;
  };

  const LoadingBox = () => (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3b82f6" wireframe />
    </mesh>
  );

  function Controls({ cameraMode, resetFlag }) {
    const controls = useThree((state) => state.controls);
    const camera = useThree((state) => state.camera);

    useEffect(() => {
      if (!controls) return;
      if (resetFlag) {
        controls.reset();
        camera.position.set(5, 5, 5);
        camera.lookAt(0, 0, 0);
      }
    }, [resetFlag, controls, camera]);

    useEffect(() => {
      if (!controls) return;
      if (cameraMode === 'top') {
        camera.position.set(0, 10, 0.01);
        camera.lookAt(0, 0, 0);
      } else {
        camera.position.set(5, 5, 5);
        camera.lookAt(0, 0, 0);
      }
      controls.update();
    }, [cameraMode, controls, camera]);

    return <OrbitControls enableZoom enablePan enableRotate minDistance={3} maxDistance={10} />;
  }

  return (
    <div className="w-full h-full relative">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        <Controls cameraMode={cameraMode} resetFlag={resetFlag} />

        <ambientLight intensity={lightingOn ? 0.3 : 0} />
        <directionalLight position={[10, 10, 5]} intensity={lightingOn ? 0.8 : 0} />
        <pointLight position={[-10, -10, -5]} intensity={lightingOn ? 0.3 : 0} />

        <Suspense fallback={<LoadingBox />}>
          {isGenerating ? <LoadingBox /> : <Model />}
          <Environment preset="studio" />
        </Suspense>

        <gridHelper args={[20, 20, '#ffffff', '#222222']} />
      </Canvas>
    </div>
  );
}
