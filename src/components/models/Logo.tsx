import { Canvas, useFrame } from '@react-three/fiber';
import {
    OrbitControls,
    useGLTF,
    Environment,
    Float
} from '@react-three/drei';
import { useRef, type JSX } from 'react';
import type { Group } from 'three';

function Model(props: JSX.IntrinsicElements['group']) {
    const { scene } = useGLTF('/logo.glb');
    const ref = useRef<Group>(null);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.getElapsedTime();

        ref.current.rotation.y = t * 0.8;
        ref.current.rotation.x = Math.sin(t * 0.6) * 0.15;
        ref.current.position.y = Math.sin(t * 1.2) * 0.2;
    });

    return (
        <primitive
            ref={ref}
            object={scene}
            scale={2.3}
            {...props}
        />
    );
}
export default function HeroModel() {
    return (
        <Canvas
            camera={{ position: [0, 0, 4], fov: 40 }}
            className="rounded-3xl"
        >
            {/* Base light */}
            <ambientLight intensity={0.7} />

            {/* Key light */}
            <directionalLight position={[5, 5, 5]} intensity={1.2} />

            {/* Rim light */}
            <directionalLight
                position={[-5, 3, -5]}
                intensity={0.6}
                color="#d1fae5"
            />

            <Environment preset="forest" />

            {/* Floating animation */}
            <Float
                speed={1.2}
                rotationIntensity={0.4}
                floatIntensity={0.6}
            >
                <Model />
            </Float>

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.6}
                target={[0, 0, 0]}
            />
        </Canvas>
    );
}
