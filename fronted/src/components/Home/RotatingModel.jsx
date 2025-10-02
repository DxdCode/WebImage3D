import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const Model = ({ url }) => {
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={0.35} position={[0, -0.4, 0]} />;
};

const RotatingModel = ({ url, isPaused }) => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (groupRef.current && !isPaused) {
            groupRef.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.5, 0]} scale={[0.5, 0.5, 0.5]}>
            <Model url={url} />
        </group>
    );
};

export default RotatingModel;
