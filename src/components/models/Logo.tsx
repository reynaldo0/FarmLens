import { Canvas, useFrame } from '@react-three/fiber';
import {
    Environment,
    Float,
    useGLTF
} from '@react-three/drei';
import { useRef } from 'react';
import type { Group } from 'three';
import type { JSX } from 'react';

function Model(props: JSX.IntrinsicElements['group']) {
    const { scene } = useGLTF('/logo.glb');
    const ref = useRef<Group>(null);

    // ✅ SATU animasi ringan saja
    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.getElapsedTime();

        ref.current.rotation.y = t * 0.4;
        ref.current.position.y = Math.sin(t) * 0.12;
    });

    return (
        <primitive
            ref={ref}
            object={scene}
            scale={2}
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
            {/* Lighting minimal & aman */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            {/* Environment ringan */}
            <Environment preset="forest" />

            {/* Floating HALUS */}
            <Float
                speed={1}
                rotationIntensity={0.3}
                floatIntensity={0.4}
            >
                <Model />
            </Float>
        </Canvas>
    );
}
