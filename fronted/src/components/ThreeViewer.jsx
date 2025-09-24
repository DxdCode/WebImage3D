import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeViewer = ({ canvasRef, modelUrl }) => {
  const viewerRef = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const controls = new OrbitControls(camera, renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7.5);
    scene.add(dirLight);

    let model = null;
    const loader = new GLTFLoader();

    viewerRef.current.loadModel = async (url) => {
      if (!url) return;
      if (model) {
        scene.remove(model);
        model.traverse((obj) => {
          if (obj.isMesh) {
            obj.geometry.dispose();
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
        });
      }
      return new Promise((resolve, reject) => {
        loader.load(
          url,
          (gltf) => {
            model = gltf.scene;
            model.scale.set(3.5, 3.5, 3.5);
            scene.add(model);
            resolve();
          },
          undefined,
          reject
        );
      });
    };

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      if (model) scene.remove(model);
    };
  }, [canvasRef]);

  useEffect(() => {
    if (viewerRef.current.loadModel && modelUrl) {
      viewerRef.current.loadModel(modelUrl);
    }
  }, [modelUrl]);

  return null;
};

export default ThreeViewer;
